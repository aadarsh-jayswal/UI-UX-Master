# Quality bar

Deliverable rules for every specialist. They come from blind evaluations in which graders compared outputs side by side; each rule names a failure graders penalised. Apply the section for the deliverable's category, plus **All outputs**. [Context policy](policy.md) still wins on conflicts; this file governs form, completeness and verification, not taste.

## All outputs

- Lead with the answer or verdict in one or two sentences, then the evidence. Write with the [clear-writing rules](clear-writing.md).
- Be concise. Cut sections the brief did not ask for (entry-point tables, completion criteria, motion essays in a flow spec). When a brief says "concise", stay under about 1,200 words.
- Give concrete values, not slogans: exact CSS, sizes, colours with measured contrast, durations, copy. "Improve hierarchy" is not a correction.
- Cite principle IDs from the [playbook](playbook/index.md) compactly: an ID in a `Basis` column or one short "Sources" line. Do not paste page numbers inline, cite them for trivial choices, or use a citation as the justification; justify by the user impact and cite as support.
- Real public sources (WCAG, platform guidelines) may be named. Say when a value comes from general practice or memory rather than a checked source. Never invent a citation.
- Report verification as a short table: what was checked, how, and what was not verified. Never claim a check you did not run.
- Keep one issue per finding. Do not merge distinct problems into one low-severity row, and do not repeat a finding under two numbers.

## Review and audit

1. State assumptions that change severity, such as desktop-first versus responsive. Do not rate mobile reflow as high for a desktop-only internal tool unless the page declares a responsive viewport and the brief needs phones.
2. Route through the playbook [task router](playbook/task-router.md), including its "CSS property → principles" table, and check every declared value of those properties.
3. Measure: compute contrast with [contrast.mjs](../scripts/contrast.mjs); when the page can render, run [audit-rendered-ui.js](../scripts/audit-rendered-ui.js) through [page-eval.mjs](../scripts/page-eval.mjs) at desktop and phone widths and confirm each lead.
4. Order by user impact: blockers (keyboard, names, status by colour alone, text below contrast) first, then hierarchy and clarity, then polish. Brand-colour overuse, invisible card surfaces and heavy table borders are medium, not low.
5. Each finding gets: severity, location, **Before**, **After** (exact values), why (user impact), basis (ID), confidence. When fixing button hierarchy, name the single primary action explicitly.
6. Do not pad: skip effects for absent assets, motion polish for a static page, or speculative product features unless labelled optional.
7. Use the [findings template](../templates/findings.md). End with a verdict (Block/Approve) and the not-verified list.

## Accessibility remediation

- Prefer native `<dialog>` with `showModal()`, or `role="dialog"`, `aria-modal="true"` and `aria-labelledby`, with the background made `inert`. Do not also set `aria-hidden` on the same subtree.
- Required behaviour for modals: initial focus inside (`tabindex="-1"` on the dialog as a fallback when it has no focusable child), Tab and Shift+Tab contained, Escape closes, focus returns to the opener on every close path, a guard against opening twice, a `focusin` fallback where `inert` is unsupported, background scroll locked when the page can scroll, and the dialog fitting a 320px viewport.
- Close controls are real buttons with an accessible name and a visible focus ring. Keep inline handlers out; bind listeners once.
- Stay in scope: fix the reported defects and directly related ones; no visual redesign.
- Verify with real key events, not synthetic JavaScript events: run [page-eval.mjs](../scripts/page-eval.mjs) with `--click "#opener" --keys "Tab,Tab,Shift+Tab,Escape"`; it records focus after each key. Run `--audit --width 320` for reflow.

## UI implementation

- Non-text contrast at least 3:1 for anything that conveys state or identity: unselected radio and checkbox rings, selection borders, input boundaries, focus rings, toggles. Graders found near-invisible unselected indicators (1.3:1 and 2.7:1) in otherwise strong builds; measure them.
- Short accessible names: a plan radio is named by its title and price via `aria-labelledby`, not the whole card's text.
- Targets at least 44px on touch layouts; hover-only styling behind `@media (hover: hover)`; no `transition: all`; no inline `style` attributes for layout.
- Visual quality matters as much as correctness: apply [polish](polish.md) values (concentric radius, layered shadows with a transparent border, press scale 0.96, exact easing) and a clear recommended or selected state that does not compete with the selection colour.
- Verify behaviour with a script (math, defaults, state changes, no horizontal overflow at 390px, primary action visible): [page-eval.mjs](../scripts/page-eval.mjs) `--width 390 --audit --script checks.js --screenshot phone.png` gives a true 390px viewport (a desktop window resized smaller often stays wider). Inspect screenshots at desktop and phone widths. Re-run checks after the last change.

## Design specification

- Cover every state that can change the flow: loading, empty or no availability, validation error, network or offline, session expiry, a conflict such as a slot taken (recover in place), an unknown outcome after a timeout (check status before retrying, never double-submit), success, and back or exit.
- An accessibility section is mandatory: screen-reader labels with full context (for example "10:30 AM, Tuesday 4 March, with Sam, available"), live-region announcements for changes, focus order and focus movement after each step, dynamic type or text scaling, target sizes with the correct WCAG level (2.5.5 is AAA; 2.5.8 is AA in WCAG 2.2), and contrast values.
- Give concrete layout and tokens: type scale, spacing scale, key colours with contrast, component sizes. Do not defer all of them to undefined brand tokens.
- Tie each decision to a user goal or a labelled assumption. Do not state behavioural claims ("the most common frustration") without evidence; label them as assumptions. Flag invented policies or legal copy as placeholders for a product decision.

## Scoped edit

- Change only what was asked. Diff the result against the original and remove every unrelated change.
- Do not tokenise or reformat outside the element in scope, and do not add unused tokens.
- Report the exact before and after values and any measured size change accurately.

## Explanation and teaching

- Answer the question directly, then give the correct ranges and the limits that make them actionable (for line-height: body about 1.5–1.6, below about 1.2 cramped, above about 2 disconnected; headings about 1.1–1.3, lower as size grows, and the ratios should fall monotonically across the scale).
- Code examples must match the advice (unitless line-height if you recommend unitless).
- Add the accessibility angle where it exists, stated precisely (WCAG 1.4.12 is about surviving user overrides; 1.4.8 is AAA).
- Give the reader a quick test they can run. Distinguish sourced rules from your own arithmetic.

## Motion implementation

- Technique: `grid-template-rows: 0fr → 1fr` or a measured height with a `transitionend` settle; keep collapsed content unfocusable (native `hidden` or `visibility: hidden` after close).
- Easing: ease-out in both directions; never an accelerating ease-in close. Close slightly faster than open (for example 240ms open, 200ms close). Follow [motion decisions](motion.md) for curves.
- Reduced motion: no height, transform or blur animation; an opacity cross-fade of about 150ms is fine, and the note must describe exactly what runs.
- Accessibility: `button type="button"`, `aria-expanded`, `aria-controls`. Interruption: reversing mid-flight continues from the current value; rapid clicks end in a consistent state.
- Verify in real time (sample every animation frame from a `--script` run of [page-eval.mjs](../scripts/page-eval.mjs), with and without `--reduced-motion`), not with a virtual-time budget, which freezes transitions.

## Research synthesis

- Quote only verbatim participant words. The note-taker's paraphrase is not a quote.
- Never add attributes the records do not contain: gender, usage frequency, platform, intent. Keep conditional statements conditional ("would come back if pausing was obvious").
- Count people with the denominator and the participant IDs (for example 5 of 6: P1, P2, P4, P5, P6), and keep counter-evidence visible.
- Separate findings, implications and opportunities. Give each theme a confidence level. Label success measures as things to track, not results.
