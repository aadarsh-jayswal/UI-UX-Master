# Quality bar

Deliverable rules for every specialist. They come from blind evaluations in which graders compared outputs side by side; each rule names a failure graders penalised. Apply the section for the deliverable's category, plus **All outputs**. [Context policy](policy.md) still wins on conflicts; this file governs form, completeness and verification, not taste.

## All outputs

- Lead with the answer or verdict in one or two sentences, then the evidence. Write with the [clear-writing rules](clear-writing.md).
- Be concise. Cut sections the brief did not ask for (entry-point tables, completion criteria, motion essays in a flow spec). When a brief says "concise", stay under about 1,200 words.
- Give concrete values, not slogans: exact CSS, sizes, colours with measured contrast, durations, copy. "Improve hierarchy" is not a correction.
- List the required states before you build or judge. From the brief and the standard pattern for each component, write down every state the result must support, then write the checks from that list, not from your implementation. A passing suite that leaves a listed state untested is not verification. Common pattern defaults graders checked:
  - Tabs, segmented controls, toggles: the selected state has a persistent cue that is not colour alone (weight, underline or border at 3:1 or more) and survives focus leaving.
  - Pause, mute, snooze, disabled modes: affected controls are inert and visibly paused, and the saved values return on resume.
  - Auto-dismissing or timed content (toasts, banners, carousels): the timer pauses on hover and on focus within, and resumes with the remaining time (WCAG 2.2.1 Timing Adjustable, Level A).
  - Locked or required options: the reason is visible next to the control, not only in a tooltip.
- When a brief says "keep the look" but a defect it asks you to fix needs a visible cue, make the smallest visible change that fixes it and name the trade-off in the note. Never leave a known defect unmentioned to protect pixel identity.
- Write citations a reader can look up. In reader-facing deliverables, cite public sources: WCAG success criteria by number, name and level (for example "WCAG 1.4.11 Non-text Contrast, AA"), platform guidelines, or named public articles. Use [playbook](playbook/index.md) principle IDs only in working notes, never as the stated reason in a report, spec or explanation. Justify by user impact; a citation is support, not the justification.
- Say when a value comes from general practice or memory rather than a checked source. Never invent a citation, and never cite a page for a claim it does not make.
- Report verification only where something ran. For code and rendered work, give a short table: what was checked, how, the result, and what was not verified. For documents (explanations, specs, syntheses), give one line on what you checked against the sources; do not add a process table or rows such as "re-read the report". Never claim a check you did not run.
- Describe a defect in the original only after measuring it; do not claim the original failed a check you did not run (for example "overflowed at 320px" without a 320px render).
- Keep the deliverable self-contained: put verification results in the note itself. Helper scripts and screenshots may not reach the reader, so never ask them to check a file that is not part of the deliverable.
- Re-read every rule, threshold and test you give: each must be a single, unambiguous condition a reader can apply.
- Keep one issue per finding. Do not merge distinct problems into one low-severity row, and do not repeat a finding under two numbers.

## Review and audit

1. State assumptions that change severity, such as desktop-first versus responsive. Do not rate mobile reflow as high for a desktop-only internal tool unless the page declares a responsive viewport and the brief needs phones.
2. Route through the playbook [task router](playbook/task-router.md), including its "CSS property → principles" table, and check every declared value of those properties.
3. Measure: compute contrast with [contrast.mjs](../scripts/contrast.mjs); when the page can render, run [audit-rendered-ui.js](../scripts/audit-rendered-ui.js) through [page-eval.mjs](../scripts/page-eval.mjs) at desktop and phone widths and confirm each lead.
4. Order by user impact: blockers (keyboard, names, status by colour alone, text below contrast) first, then hierarchy and clarity, then polish. Brand-colour overuse, invisible card surfaces and heavy table borders are medium, not low.
5. Each finding gets: severity, location, **Before**, **After** (exact values), why (user impact) and, where one applies, the public standard (WCAG criterion number and level). When fixing button hierarchy, name the single primary action explicitly.
6. Do not pad: skip effects for absent assets, motion polish for a static page, or speculative product features unless labelled optional.
7. Respect the artefact's premise. On a static page or prototype, rate what a user sees and operates; list missing wiring (totals that do not recalculate, unconnected buttons) as a separate prototype note, not a High defect.
8. Forms: give every field a visible label, `autocomplete` and the right `inputmode` (`numeric` for card number, CVC and numeric postcodes); size short fields to their content; show each shipping or plan option's price and delivery estimate in the choice itself. When you change spacing, cover every group, including blocks outside the repeated section class.
9. Keep the table readable: one row per finding, short cells, at most about 12 findings unless the brief asks for an exhaustive audit.
10. Use the [findings template](../templates/findings.md). End with a verdict (Block/Approve) and the not-verified list.

## Accessibility remediation

- Fix the whole pattern, not only the listed symptoms. Before editing, write the pattern's required roles, states, keyboard model and visual cues (for tabs: `tablist`/`tab`/`tabpanel`, `aria-selected`, `aria-controls`/`aria-labelledby`, roving `tabindex`, Arrow/Home/End, inactive panels `hidden`, and a selected cue that is not colour alone), then check each one in the result.
- Make a panel focusable (`tabindex="0"`) when its first content is not focusable, so Tab moves from the tab into the panel.
- Prefer native `<dialog>` with `showModal()`, or `role="dialog"`, `aria-modal="true"` and `aria-labelledby`, with the background made `inert`. Do not also set `aria-hidden` on the same subtree.
- Required behaviour for modals: initial focus inside (`tabindex="-1"` on the dialog as a fallback when it has no focusable child), Tab and Shift+Tab contained, Escape closes, focus returns to the opener on every close path, a guard against opening twice, a `focusin` fallback where `inert` is unsupported, background scroll locked when the page can scroll, and the dialog fitting a 320px viewport.
- Close controls are real buttons with an accessible name and a visible focus ring. Keep inline handlers out; bind listeners once.
- Stay in scope: fix the reported defects and directly related ones; no visual redesign.
- Verify with real key events, not synthetic JavaScript events: run [page-eval.mjs](../scripts/page-eval.mjs) with `--click "#opener" --keys "Tab,Tab,Shift+Tab,Escape"`; it records focus after each key. Run `--audit --width 320` for reflow.

## UI implementation

- Non-text contrast at least 3:1 for anything that conveys state or identity: unselected radio and checkbox rings, selection borders, input boundaries, focus rings, toggles. Graders found near-invisible unselected indicators (1.3:1 and 2.7:1) in otherwise strong builds; measure them.
- Short accessible names: a plan radio is named by its title and price via `aria-labelledby`, not the whole card's text.
- Put the core content in the HTML; JavaScript enhances it. If selection styling depends on `:has()`, keep a visible fallback (the native control or an `[aria-checked]`/class state) and say so in the note.
- Targets at least 44px on touch layouts, including segmented controls and toggles; hover-only styling behind `@media (hover: hover)`; no `transition: all`; no inline `style` attributes for layout.
- Modes that suspend other settings (pause, do-not-disturb, read-only) make the affected controls `disabled` or `inert` and visibly paused, and keep their values. Test that a real click and Space on a suspended control change nothing.
- Keep a change counter and a save result in separate elements; announce the save result once in a polite live region instead of re-announcing the count on every toggle.
- Visual quality matters as much as correctness: apply [polish](polish.md) values (concentric radius, layered shadows with a transparent border, press scale 0.96, exact easing) and a clear recommended or selected state that does not compete with the selection colour.
- Verify behaviour with a script (math, defaults, state changes, no horizontal overflow at 390px, primary action visible): [page-eval.mjs](../scripts/page-eval.mjs) `--width 390 --audit --script checks.js --screenshot phone.png` gives a true 390px viewport (a desktop window resized smaller often stays wider). Inspect screenshots at desktop and phone widths. Re-run checks after the last change.

## Design specification

- Cover every state that can change the flow: loading, empty or no availability, validation error, network or offline, session expiry, a conflict such as a slot taken (recover in place), an unknown outcome after a timeout (check status before retrying, never double-submit), success, and back or exit.
- For collections of items (files, recipients, line items), also specify per-item states and that one failure does not block the others; what happens to queued items when the network drops; duplicates (the matching rule and the notice); reaching the limit, including a batch that would exceed it (add the first N or refuse the batch, with the reason); cancel or remove mid-operation, including a late response arriving after removal; and leaving the page mid-operation.
- Give each blocked action its reason next to the control, and say how the user recovers from every blocked or unknown state.
- Specify the touch path separately when the desktop path relies on drag, hover or a pointer (for example the file picker, photos or camera on phones).
- Before finishing, check the rules against each other: no state may require an action another rule disables (for example an error summary reached only by a Submit button that is disabled).
- An accessibility section is mandatory: screen-reader labels with full context (for example "10:30 AM, Tuesday 4 March, with Sam, available"), live-region announcements for changes, focus order and focus movement after each step, dynamic type or text scaling, target sizes with the correct WCAG level (2.5.5 is AAA; 2.5.8 is AA in WCAG 2.2), and contrast values.
- Give concrete layout and tokens: type scale, spacing scale, key colours with contrast, component sizes. Do not defer all of them to undefined brand tokens.
- Tie each decision to a user goal or a labelled assumption. Do not state behavioural claims ("the most common frustration") without evidence; label them as assumptions. Flag invented policies or legal copy as placeholders for a product decision.

## Scoped edit

- Change only what was asked. Diff the result against the original and remove every unrelated change.
- Do not tokenise or reformat outside the element in scope, and do not add unused tokens.
- Report the exact before and after values and any measured size change accurately.
- Typography: set the measure on the text column only and confirm it by counting real characters per rendered line (aim for about 60–75), not by the `ch` value alone, because `ch` is the width of "0". Use unitless line-heights and a clear size and weight step between heading levels. Make large headings fluid (`clamp()`) and allow long words to wrap (`overflow-wrap: anywhere`) so a narrow column does not overflow; both stay within a typography brief.

## Explanation and teaching

- Answer the question directly, then give the correct ranges and the limits that make them actionable (for line-height: body about 1.5–1.6, below about 1.2 cramped, above about 2 disconnected; headings about 1.1–1.3, lower as size grows, and the ratios should fall monotonically across the scale).
- Name every WCAG criterion that applies, each with its number, name, level and exact threshold, and link the W3C Understanding page. For example, a placeholder-as-label answer needs 3.3.2 Labels or Instructions (A), 1.3.1 Info and Relationships (A) and 2.5.3 Label in Name (A), plus 1.4.3 Contrast (Minimum) at 4.5:1 for the placeholder text. Do not state a criterion's level or scope from memory without checking it.
- Cover each distinct mechanism of harm separately (for placeholders: it disappears while typing, it can be mistaken for a filled value, its default contrast is low, and its accessible-name fallback is inconsistent), and say which ones a quick fix such as darker text does not solve.
- When you recommend an alternative, give its caveats (for floating labels: overlap and truncation, behaviour at 200% zoom, and the contrast of the shrunken label) and any narrow exception with its conditions.
- Code examples must match the advice (unitless line-height if you recommend unitless).
- Write for the named reader: no internal principle IDs and no verification table in the answer.
- Give the reader a quick test they can run. Distinguish sourced rules from your own arithmetic.

## Motion implementation

- Start from the component's behaviour contract, then add motion to it; keep every existing behaviour and add the ones the pattern requires. List them before coding and test each one.
- Disclosure and accordions: `grid-template-rows: 0fr → 1fr` or a measured height with a `transitionend` settle; keep collapsed content unfocusable (native `hidden` or `visibility: hidden` after close).
- Toasts and notification stacks: enter with transform and opacity from the anchored edge; exit faster than enter; reflow the remaining toasts smoothly (FLIP, or a height and margin collapse that starts with the exit, not after it); pause the dismiss timer on hover and on focus within and resume with the remaining time; never move focus when a timer expires, and on manual dismiss return focus only if it was inside the toast; dismissing mid-enter works; each message is announced once (append it to the existing live region and do not re-insert moved nodes).
- Easing: ease-out in both directions; never an accelerating ease-in close. Close slightly faster than open (for example 240ms open, 200ms close). Follow [motion decisions](motion.md) for curves.
- Reduced motion: no height, transform or blur animation; an opacity cross-fade of about 150ms is fine, and the note must describe exactly what runs.
- Accessibility for disclosures: `button type="button"`, `aria-expanded`, `aria-controls`; collapsed content leaves the tab order at the start of the close, not after it. Interruption: reversing mid-flight continues from the current value; rapid clicks end in a consistent state.
- Verify in real time (sample every animation frame from a `--script` run of [page-eval.mjs](../scripts/page-eval.mjs), with and without `--reduced-motion`), not with a virtual-time budget, which freezes transitions. Include the interaction states in the run, for example hover and focus held past the dismiss time, and report the observed durations.

## Research synthesis

- Quote only verbatim participant words. The note-taker's paraphrase is not a quote.
- Never add attributes the records do not contain: gender, usage frequency, platform, intent. Keep conditional statements conditional ("would come back if pausing was obvious").
- Count people with the denominator and the participant IDs (for example 5 of 6: P1, P2, P4, P5, P6), and keep counter-evidence visible.
- Show per-task outcomes in a table with every participant, marking "Not attempted" (with the reason) instead of leaving a cell out, and give each task's own denominator.
- Rank findings by the severity of the consequence, not only by frequency: one near-miss of sending money to the wrong person outranks a common cosmetic complaint.
- Make each recommendation implementable: name the concrete pattern (for example an error summary linked to fields, `aria-describedby` and `aria-invalid` on the field, a polite live region for status, a visible text label for an icon-only control) and the acceptance check, not "make the error discoverable".
- Separate findings, implications and opportunities. Give each theme a confidence level. Label success measures as things to track, not results.
