#!/usr/bin/env node
// Real-time page checks in headless Chrome over the DevTools protocol. Node 22+ (global WebSocket); no packages.
//   node page-eval.mjs <file-or-url> [--width 390] [--height 844] [--reduced-motion] [--dark]
//        [--audit] [--script check.js] [--keys "Tab,Shift+Tab,Enter,Escape"] [--click "#open"]
//        [--screenshot out.png] [--wait 300]
// Prints JSON: { viewport, audit?, script?, keys?, screenshot? }.
//   --audit   evaluates audit-rendered-ui.js (next to this file) after load.
//   --script  evaluates a file whose last expression is the result (may be an async IIFE; awaited).
//   --click   clicks the centre of the first element matching a CSS selector before --keys.
//   --keys    sends real key events and records the focused element after each key.
// Env CHROME_PATH overrides browser discovery. Set CHROME_PATH or pass a URL served from localhost if file access is blocked.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const flag = n => argv.includes(n);
const value = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };

export function findChrome() {
  const candidates = [process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  return candidates.find(c => c && fs.existsSync(c)) || null;
}

const KEYS = { Tab: [9, 'Tab'], Enter: [13, 'Enter'], Escape: [27, 'Escape'], Space: [32, ' '], ArrowUp: [38, 'ArrowUp'], ArrowDown: [40, 'ArrowDown'], ArrowLeft: [37, 'ArrowLeft'], ArrowRight: [39, 'ArrowRight'] };

export async function evaluatePage(target, opts = {}) {
  const chrome = findChrome();
  if (!chrome) throw new Error('No Chrome/Edge found; set CHROME_PATH');
  if (typeof WebSocket === 'undefined') throw new Error('Node 22+ is required (global WebSocket)');
  const url = /^[a-z]+:\/\//i.test(target) ? target : pathToFileURL(path.resolve(target)).href;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'page-eval-'));
  const proc = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--allow-file-access-from-files', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
  try {
    const portFile = path.join(profile, 'DevToolsActivePort');
    for (let i = 0; i < 200 && !fs.existsSync(portFile); i++) await new Promise(r => setTimeout(r, 50));
    const port = fs.readFileSync(portFile, 'utf8').split('\n')[0].trim();
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const page = targets.find(t => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let seq = 0; const pending = new Map(); const events = [];
    ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else if (d.method) events.push(d.method); };
    const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pending.set(id, d => d.error ? rej(new Error(`${method}: ${d.error.message}`)) : res(d.result)); ws.send(JSON.stringify({ id, method, params })); });
    const evalJs = async expression => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text); return r.result.value; };

    const width = Number(opts.width || 1280), height = Number(opts.height || 900);
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await send('Emulation.setEmulatedMedia', { features: [
      { name: 'prefers-reduced-motion', value: opts.reducedMotion ? 'reduce' : 'no-preference' },
      { name: 'prefers-color-scheme', value: opts.dark ? 'dark' : 'light' }] });
    await send('Page.navigate', { url });
    for (let i = 0; i < 200 && !(await evalJs('document.readyState === "complete"')); i++) await new Promise(r => setTimeout(r, 50));
    await new Promise(r => setTimeout(r, Number(opts.wait || 300)));

    const out = { url, viewport: await evalJs('({width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth})') };
    if (opts.audit) out.audit = await evalJs(fs.readFileSync(path.join(here, 'audit-rendered-ui.js'), 'utf8'));
    if (opts.script) out.script = await evalJs(fs.readFileSync(path.resolve(opts.script), 'utf8'));
    const focused = `(() => { const e = document.activeElement; if (!e || e === document.body) return 'body'; const n = e.getAttribute('aria-label') || (e.innerText || e.value || '').trim().slice(0, 40); return e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (n ? ' "' + n + '"' : ''); })()`;
    if (opts.click) {
      const box = await evalJs(`(() => { const e = document.querySelector(${JSON.stringify(opts.click)}); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
      if (!box) throw new Error(`No element matches ${opts.click}`);
      for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 });
      await new Promise(r => setTimeout(r, 150));
      out.afterClick = await evalJs(focused);
    }
    if (opts.keys) {
      out.keys = [];
      for (const raw of opts.keys.split(',').map(k => k.trim()).filter(Boolean)) {
        const shift = raw.startsWith('Shift+'), name = shift ? raw.slice(6) : raw, key = KEYS[name];
        if (!key) throw new Error(`Unsupported key: ${raw}`);
        const base = { key: key[1], code: name === 'Space' ? 'Space' : name, windowsVirtualKeyCode: key[0], modifiers: shift ? 8 : 0 };
        await send('Input.dispatchKeyEvent', { type: 'keyDown', ...base, ...(name === 'Enter' ? { text: '\r' } : name === 'Space' ? { text: ' ' } : {}) });
        await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
        await new Promise(r => setTimeout(r, 120));
        out.keys.push({ key: raw, focus: await evalJs(focused) });
      }
    }
    if (opts.screenshot) { const shot = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(opts.screenshot, Buffer.from(shot.data, 'base64')); out.screenshot = path.resolve(opts.screenshot); }
    ws.close();
    return out;
  } finally {
    proc.kill();
    await new Promise(r => setTimeout(r, 200));
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  if (!argv[0] || argv[0].startsWith('--')) { console.log('Usage: node page-eval.mjs <file-or-url> [options]; see header comment'); process.exitCode = 2; }
  else evaluatePage(argv[0], { width: value('--width'), height: value('--height'), reducedMotion: flag('--reduced-motion'), dark: flag('--dark'),
    audit: flag('--audit'), script: value('--script'), keys: value('--keys'), click: value('--click'), screenshot: value('--screenshot'), wait: value('--wait') })
    .then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(e.message); process.exitCode = 1; });
}
