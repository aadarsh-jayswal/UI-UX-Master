/*
 * Rendered-UI audit for the UI-UX Principles plugin.
 *
 * Evaluate this whole file in the page context of a rendered interface
 * (browser devtools console, Playwright `page.evaluate(src)`, or any
 * browser tool's "run JavaScript"). The expression returns
 *   { url, viewport, findings: [{ id, severity, message, sample }], checked }
 * where `id` is a knowledge-base principle ID.
 *
 * These are heuristics (see references/supplemental.md S-05): treat every
 * finding as a lead to confirm visually, and note that many principles
 * (hierarchy, relevance, layout intent) cannot be checked by script at all.
 */
(() => {
  const findings = [];
  const add = (id, severity, message, el, extra) => {
    findings.push({ id, severity, message, sample: el ? describe(el) : undefined, ...(extra || {}) });
  };
  const describe = (el) => {
    const t = (el.innerText || el.value || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ");
    const cls = el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
    return `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${cls} "${t.slice(0, 50)}"`;
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && parseFloat(s.opacity) > 0.05;
  };
  const parseColor = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
  const blend = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1,
  });
  const effectiveBg = (el) => {
    const layers = [];
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage && s.backgroundImage !== "none") return { image: true };
      const c = parseColor(s.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (const layer of layers.reverse()) bg = blend(layer, bg);
    return bg;
  };
  const saturation = ({ r, g, b }) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx; };
  const hue = ({ r, g, b }) => {
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (d === 0) return null;
    let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return (h * 60 + 360) % 360;
  };
  const ownText = (el) => Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();
  const lineCount = (el) => {
    const range = document.createRange(); range.selectNodeContents(el);
    const tops = new Set(Array.from(range.getClientRects()).filter((r) => r.width > 2).map((r) => Math.round(r.top)));
    return tops.size;
  };

  const all = Array.from(document.body.querySelectorAll("*")).filter(visible);
  const textEls = all.filter((el) => ownText(el).length > 1);
  const headings = textEls.filter((el) => /^H[1-6]$/.test(el.tagName) || el.getAttribute("role") === "heading");
  const paragraphs = textEls.filter((el) => ["P", "LI", "BLOCKQUOTE", "DD"].includes(el.tagName) || (el.tagName === "DIV" && ownText(el).length > 120));

  // TYP-03: number of font families
  const families = new Map();
  textEls.forEach((el) => { const f = getComputedStyle(el).fontFamily.split(",")[0].replace(/["']/g, "").trim().toLowerCase(); families.set(f, (families.get(f) || 0) + 1); });
  if (families.size > 2) add("TYP-03", "high", `${families.size} font families in use (max two): ${Array.from(families.keys()).join(", ")}`);

  textEls.forEach((el) => {
    const s = getComputedStyle(el);
    const size = parseFloat(s.fontSize);
    const weight = parseInt(s.fontWeight, 10) || 400;
    const color = parseColor(s.color);
    const isHeading = headings.includes(el);
    const isBody = paragraphs.includes(el);
    // TYP-12: readable sizes
    if (size < 10) add("TYP-12", "high", `text at ${size}px (below 10px)`, el);
    else if (size < 12 && isBody) add("TYP-12", "medium", `body text at ${size}px (main text should not be below 12px; 16px is the usual baseline)`, el);
    // TYP-10: thin body weights
    if (isBody && weight < 400) add("TYP-10", "medium", `body text weight ${weight} (use regular/medium)`, el);
    // TYP-07: pure black / white text
    if (color && ((color.r === 0 && color.g === 0 && color.b === 0) || (color.r === 255 && color.g === 255 && color.b === 255)) && (isHeading || isBody)) {
      add("TYP-07", "low", `${isHeading ? "heading" : "body"} uses pure ${color.r ? "white" : "black"} text`, el);
    }
    // TYP-09 / CON-01: contrast
    const bg = effectiveBg(el);
    if (color && !bg.image) {
      const fg = color.a < 1 ? blend(color, bg) : color;
      const r = ratio(fg, bg);
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const min = large ? 3 : 4.5;
      if (r < min) add(el.closest("[class*=badge],[class*=pill],[class*=tag],[class*=chip],[class*=status]") ? "CON-01" : "TYP-09", r < 3 ? "high" : "medium",
        `contrast ${r.toFixed(2)}:1 (needs ${min}:1)`, el);
    } else if (bg.image) {
      add("CON-03", "info", "text over a background image: verify legibility against the lightest/busiest region", el);
    }
    // ALN-03: centred long text
    if (isBody && (s.textAlign === "center" || s.textAlign === "justify") && lineCount(el) >= 3) {
      add("ALN-03", "medium", `${lineCount(el)}-line paragraph with text-align:${s.textAlign}`, el);
    }
  });

  // TYP-13 / TYP-04 on paragraphs
  let bodyLH = [];
  paragraphs.forEach((el) => {
    const s = getComputedStyle(el);
    const size = parseFloat(s.fontSize);
    const lh = s.lineHeight === "normal" ? 1.2 : parseFloat(s.lineHeight) / size;
    const lines = lineCount(el);
    if (lines >= 2) {
      bodyLH.push(lh);
      if (lh < 1.2) add("TYP-13", "high", `paragraph line-height ${lh.toFixed(2)} (cramped; target 1.5-1.6)`, el);
      else if (lh < 1.4) add("TYP-13", "medium", `paragraph line-height ${lh.toFixed(2)} (target 1.5-1.6 for ~16px text)`, el);
      else if (lh > 2.0) add("TYP-13", "low", `paragraph line-height ${lh.toFixed(2)} (above 2 looks like floating text)`, el);
      const chars = ownText(el).length / lines;
      const mobile = window.innerWidth < 600;
      const max = mobile ? 45 : 85; // allow some slack over 75 / 40 for measurement noise
      if (lines >= 3 && chars > max) add("TYP-04", "medium", `~${Math.round(chars)} characters per line (target ${mobile ? "30-40" : "45-75"})`, el);
    }
  });
  // TYP-14: headings tighter than body
  const medianBody = bodyLH.length ? bodyLH.sort((a, b) => a - b)[Math.floor(bodyLH.length / 2)] : null;
  headings.forEach((el) => {
    const s = getComputedStyle(el);
    const lh = s.lineHeight === "normal" ? 1.2 : parseFloat(s.lineHeight) / parseFloat(s.fontSize);
    if (medianBody && lh >= medianBody && lineCount(el) >= 2) add("TYP-14", "medium", `heading line-height ${lh.toFixed(2)} is not tighter than body (${medianBody.toFixed(2)})`, el);
    // TYP-08 / TYP-11: heading vs body differentiation
    const p = el.parentElement && el.parentElement.querySelector("p");
    if (p && visible(p)) {
      const ps = getComputedStyle(p);
      const sameWeight = (parseInt(s.fontWeight, 10) || 400) <= (parseInt(ps.fontWeight, 10) || 400);
      const sizeRatio = parseFloat(s.fontSize) / parseFloat(ps.fontSize);
      if (sameWeight && sizeRatio < 1.25) add("TYP-08", "medium", `heading not differentiated from body (weight ${s.fontWeight} vs ${ps.fontWeight}, size ratio ${sizeRatio.toFixed(2)})`, el);
      if (sizeRatio < 1.05) add("TYP-11", "medium", `heading is about the same size as body text (${s.fontSize} vs ${ps.fontSize})`, el);
      const hc = parseColor(s.color), pc = parseColor(ps.color), bg = effectiveBg(el);
      if (hc && pc && !bg.image && ratio(hc, bg) + 0.05 < ratio(pc, bg)) add("VH-04", "medium", "heading is lighter (lower contrast) than its body text", el);
    }
  });

  // WS-03: spacing values off a 4px scale
  const odd = new Map();
  all.forEach((el) => {
    const s = getComputedStyle(el);
    ["marginTop", "marginBottom", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", "rowGap", "columnGap"].forEach((k) => {
      const v = parseFloat(s[k]);
      if (v > 2 && Math.abs(v - Math.round(v / 4) * 4) > 0.5) odd.set(Math.round(v * 10) / 10, (odd.get(Math.round(v * 10) / 10) || 0) + 1);
    });
  });
  if (odd.size) add("WS-03", odd.size > 3 ? "medium" : "low", `spacing values not on a 4px scale: ${Array.from(odd.entries()).map(([v, n]) => `${v}px x${n}`).join(", ")}`);

  // Buttons: VH-01, CNS-01, CNS-02, CLR-01, DLG-01/02, MOB-01
  const buttons = all.filter((el) => el.matches("button, [role=button], a.btn, a.button, input[type=submit], input[type=button]"));
  const filled = (el) => { const c = parseColor(getComputedStyle(el).backgroundColor); return c && c.a > 0.5 && (saturation(c) > 0.35 || lum(c) < 0.1) ? c : null; };
  const groups = new Map();
  buttons.forEach((b) => { const g = b.parentElement; groups.set(g, (groups.get(g) || []).concat(b)); });
  groups.forEach((bs, g) => {
    const heavy = bs.filter(filled);
    if (bs.length >= 2 && heavy.length === bs.length) add("VH-01", "medium", `${bs.length} adjacent buttons all filled/high-emphasis (no primary/secondary distinction)`, g);
  });
  const radii = new Set(buttons.map((b) => getComputedStyle(b).borderTopLeftRadius));
  if (radii.size > 2) add("CNS-01", "low", `buttons use ${radii.size} different corner radii: ${Array.from(radii).join(", ")}`);
  const primaryColours = new Set(buttons.map(filled).filter(Boolean).map((c) => `rgb(${c.r},${c.g},${c.b})`));
  if (primaryColours.size > 2) add("CNS-02", "medium", `${primaryColours.size} different filled-button colours: ${Array.from(primaryColours).join(", ")}`);
  buttons.forEach((b) => {
    const label = (b.innerText || b.value || "").trim();
    if (!label) add("CLR-01", "low", "icon-only control without a visible text label (verify it is self-explanatory)", b);
  });
  const destructive = /\b(delete|remove|discard|erase|destroy)\b/i;
  all.filter((el) => el.matches("dialog, [role=dialog], [role=alertdialog], .modal")).forEach((dlg) => {
    const bs = Array.from(dlg.querySelectorAll("button, [role=button]")).filter(visible).filter((b) => (b.innerText || "").trim());
    const del = bs.find((b) => destructive.test(b.innerText));
    if (!del) return;
    const c = filled(del);
    const h = c && hue(c);
    if (h !== null && h !== undefined && h > 80 && h < 170) add("DLG-01", "high", "destructive action uses a green button", del);
    const cancel = bs.find((b) => /\b(cancel|back|keep|no)\b/i.test(b.innerText));
    if (!cancel) add("DLG-01", "medium", "destructive confirmation without a Cancel option", dlg);
    else if (getComputedStyle(document.documentElement).direction !== "rtl" && del.getBoundingClientRect().left < cancel.getBoundingClientRect().left) {
      add("DLG-02", "medium", "destructive button is left of Cancel (LTR: Cancel left, Delete right)", dlg);
    }
  });
  if (window.innerWidth < 600) {
    buttons.filter((b) => filled(b) || /sign|log|continue|next|buy|book|start/i.test(b.innerText || "")).forEach((b) => {
      if (b.getBoundingClientRect().bottom < window.innerHeight * 0.3) add("MOB-01", "medium", "key action in the top area of a mobile screen (outside the thumb zone)", b);
    });
  }

  // Forms: FRM-02, FRM-03, WS-04, IC-09, COL-04
  document.querySelectorAll("form, [role=form]").forEach((form) => {
    const pw = Array.from(form.querySelectorAll("input[type=password]")).filter(visible);
    if (pw.length >= 2 && !form.querySelector("[autocomplete=current-password]")) add("FRM-03", "medium", "two password fields (confirm-password pattern); prefer one field with a show/hide toggle", form);
    const formW = form.getBoundingClientRect().width;
    form.querySelectorAll("input, select").forEach((inp) => {
      if (!visible(inp)) return;
      const key = `${inp.name} ${inp.id} ${inp.getAttribute("autocomplete") || ""} ${inp.placeholder || ""}`.toLowerCase();
      if (/cvc|cvv|csc|zip|postal|expiry|exp-|mm\/yy|cc-exp/.test(key) && inp.getBoundingClientRect().width > formW * 0.6) add("FRM-02", "medium", "short fixed-length field rendered full width", inp);
      if (window.innerWidth >= 1280 && inp.getBoundingClientRect().width > 700) add("WS-04", "medium", `form field ${Math.round(inp.getBoundingClientRect().width)}px wide on a ${window.innerWidth}px viewport`, inp);
      if (inp.tagName === "SELECT" && inp.options.length > 1 && inp.options.length <= 6) add("IC-09", "low", `dropdown with only ${inp.options.length} options; consider showing them inline (swatches, segmented control, stepper)`, inp);
      if (inp.matches("[aria-invalid=true], .error, .invalid")) {
        const sib = inp.nextElementSibling;
        const hasMessage = inp.getAttribute("aria-describedby") || inp.getAttribute("aria-errormessage") ||
          (sib && visible(sib) && !sib.matches("label, input, select, textarea, button") && (sib.innerText || "").trim().length > 3);
        if (!hasMessage) add("COL-04", "medium", "invalid field marked without an explanatory message next to it (colour alone?)", inp);
      }
    });
  });

  return {
    url: location.href,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    checked: ["TYP-03", "TYP-04", "TYP-07", "TYP-08", "TYP-09", "TYP-10", "TYP-11", "TYP-12", "TYP-13", "TYP-14", "CON-01", "CON-03", "ALN-03", "VH-01", "VH-04", "WS-03", "WS-04", "CNS-01", "CNS-02", "CLR-01", "DLG-01", "DLG-02", "MOB-01", "FRM-02", "FRM-03", "IC-09", "COL-04"],
    note: "Heuristic leads only; confirm visually and review the principles that cannot be scripted (hierarchy intent, relevance, layout, consistency of meaning).",
    findings,
  };
})();
