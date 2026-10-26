#!/usr/bin/env node
// WCAG 2.x contrast ratio. Supports #rgb, #rrggbb, #rrggbbaa (alpha blended over the background).
//   node contrast.mjs "#A9A9A9" "#FFFFFF"            normal text (4.5:1 AA, 7:1 AAA)
//   node contrast.mjs 999 fff --large                 large text (3:1 AA, 4.5:1 AAA)
//   node contrast.mjs "#e2dacd" "#fffdf9" --non-text  UI components and graphics (3:1, WCAG 1.4.11)
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export function parse(value) {
  let c = String(value).trim().replace(/^#/, '');
  if (c.length === 3 || c.length === 4) c = [...c].map(ch => ch + ch).join('');
  if (!/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(c)) throw new Error(`Expected #rgb, #rrggbb or #rrggbbaa, got ${value}`);
  const n = i => parseInt(c.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: c.length === 8 ? n(6) / 255 : 1 };
}
const channel = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
export const luminance = ({ r, g, b }) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
export const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
export function ratio(foreground, background) {
  const bg = parse(background), fg = blend(parse(foreground), bg);
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
export function verdict(r, mode = 'normal') {
  const [aa, aaa] = mode === 'large' ? [3, 4.5] : mode === 'non-text' ? [3, null] : [4.5, 7];
  return { ratio: Math.round(r * 100) / 100, mode, aa: r >= aa, aaa: aaa === null ? null : r >= aaa, aaThreshold: aa, aaaThreshold: aaa };
}

function main() {
  const flags = process.argv.slice(2).filter(a => a.startsWith('--'));
  const colors = process.argv.slice(2).filter(a => !a.startsWith('--'));
  if (colors.length !== 2) { console.log('Usage: node contrast.mjs <foreground> <background> [--large|--non-text]'); process.exitCode = 2; return; }
  const mode = flags.includes('--large') ? 'large' : flags.includes('--non-text') ? 'non-text' : 'normal';
  const v = verdict(ratio(colors[0], colors[1]), mode);
  const aaa = v.aaa === null ? 'AAA n/a' : `AAA ${v.aaa ? 'pass' : 'FAIL'} (>= ${v.aaaThreshold})`;
  console.log(`${v.ratio.toFixed(2)}:1  ${mode}: AA ${v.aa ? 'pass' : 'FAIL'} (>= ${v.aaThreshold}), ${aaa}`);
}
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main();
