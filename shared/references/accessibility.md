# Accessibility assessment, remediation, verification

Source-derived checks cover common web accessibility concerns; this is not an exhaustive conformance standard. Record the intended standard/version/level and actual platform. Verify normative claims against current authoritative sources when needed. WCAG 2.1 target size criterion 2.5.5 is AAA, not AA; its 44 CSS-pixel recommendation has exceptions. See [W3C](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html). Do not confuse native platform units or recommendations with a WCAG level.

## Prioritized checks

| Area | Inspect/fix | Verify |
|---|---|---|
| Names and semantics | Native buttons/links/inputs, meaningful labels, icon-only names, decorative icon handling | Accessible name/role/state in runtime accessibility tree |
| Keyboard | Reachable actions, logical order, visible focus, equivalents for pointer actions | Complete affected task without a pointer; no positive tabindex shortcuts |
| Dialog/overlay | Appropriate initial focus, containment when modal, Escape where applicable, return to trigger | Open, navigate, dismiss, reopen, nested/edge cases |
| Forms | Labels/instructions, associated help/errors, invalid/required state, recovery | Error is understandable, located and announced; no unexplained disabled submit |
| Announcements | Status/loading, expansion/control relationships, useful live regions | Actual announcements with appropriate assistive technology; avoid repeated noise |
| Structure/content | Headings, lists/tables, landmarks, meaningful image alternatives | Reading order and structure match the task |
| Contrast/states | Text/component contrast at applicable thresholds, focus/disabled states, non-color cues | Measured rendered colors, relevant states and themes |
| Stateful widgets | Full pattern contract (for tabs: roles, `aria-selected`, `aria-controls`/`aria-labelledby`, roving tabindex, Arrow/Home/End, hidden inactive panels); selected or current state shown by more than colour, at 3:1 or more | Real keys through every state; selected cue still visible after focus leaves; inactive content absent from the tab order and accessibility tree |
| Timing and suspended modes | Auto-dismissing or moving content can be paused (hover, focus within, or a control); paused or read-only modes make affected controls inert | Hold hover or focus past the timeout and confirm it waits; a click and Space on a suspended control change nothing |
| Media/motion | Captions/controls where required, no surprising sound, reduced-motion alternative | Real playback/settings behavior |
| Reflow/targets | Zoom/text scaling, content access, target size/spacing under applicable standard/platform | Relevant viewport/input mode and criterion exceptions |

For the source WCAG 2.1 AA context, normal-text contrast generally uses 4.5:1, qualifying large text 3:1, and relevant non-text UI contrast 3:1; identify exceptions and rendered states rather than assuming all pixels are governed identically.

## Audit

Read-only on product source. State evidence type (design, source, rendered, keyboard, screen reader, scanner), severity/affected users, verified criterion if applicable, and a specific recommendation. Separate unverified concerns from confirmed barriers. Do not claim a scanner found every issue or cite a precise automated-coverage percentage as a guarantee.

## Remediate

Start at the reported defect. Prefer native HTML and the project's established accessible primitive. Fix the whole pattern the defect belongs to, not only the listed symptoms; write its required states first and check each one. Fix names/keyboard/focus before cosmetic additions. When the brief asks you not to change the look but a required state has no non-colour cue, add the smallest visible cue (for example a 2px underline in the existing accent colour) and name the trade-off. Avoid redundant ARIA or changing unrelated component libraries. Associate errors with fields and ensure important information is not toast-only. A fix may need source changes and targeted runtime verification without a whole-product audit.

## Verify

Check the affected task with keyboard, relevant screen reader when available, contrast/state inspection, zoom/reflow, and reduced settings when touched. An image cannot prove keyboard behavior; source cannot prove exact announcement or focus behavior. Report unavailable tools as verification limits. Platform accessibility APIs differ on native apps; use actual platform tooling instead of assuming DOM checks apply.
