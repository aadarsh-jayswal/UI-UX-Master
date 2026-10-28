---
name: fixing-accessibility
description: Audit, fix, or verify interface accessibility including semantics, labels, keyboard access, focus, dialogs, forms, announcements, contrast, and reduced motion. Use for accessibility questions or concrete defects; a targeted repair does not require a whole-product audit.
---

# Fixing Accessibility

Own accessibility evidence and repair. Read [coordination](resources/references/coordination.md), [policy](resources/references/policy.md), relevant checks in [accessibility procedure](resources/references/accessibility.md), and the accessibility remediation section of the [quality bar](resources/references/quality-bar.md).

## Select the contract

- **Audit:** Read-only on product source. Record applicable standard/version/level, surface, evidence, affected users, severity, criterion when verified, and remediation. Use [findings](resources/templates/findings.md).
- **Remediate:** Make a narrow authorized fix using native semantics or the project's established accessible primitives. Do not start with a whole-product audit. Check affected behavior and preserve unrelated design.
- **Verify:** Test the named change/claim and report what passed, failed, or could not be checked. Do not silently expand into remediation.

Input is the accessibility question/defect, relevant source/design/runtime evidence, and applicable platform/standard target when it matters. Use sensible scoped checks while asking only for blocking missing information. Browser, keyboard, contrast tools, scanners, and real assistive technology are conditional dependencies, not grounds to fabricate verification.

Measure contrast with [contrast.mjs](resources/scripts/contrast.mjs), including non-text contrast (3:1, WCAG 1.4.11) for unselected radio and checkbox indicators, input borders and focus rings. Verify keyboard behaviour with real key events from [page-eval.mjs](resources/scripts/page-eval.mjs) `--click` and `--keys`, and run its `--audit` at `--width 320` for reflow, names and target size. A screenshot does not prove focus trapping, reading order, keyboard navigation, or screen-reader announcements. Automated checks do not establish complete conformance. Verify criterion labels against authoritative guidance when claiming conformance; distinguish platform target-size recommendations from WCAG level requirements.

Do not rewrite the application, replace primitive libraries, or create tickets without authorization. If a structural redesign is genuinely necessary, pass a bounded requirement to the interface owner and retain accessibility verification ownership. Done when the requested mode's evidence and checks are reported honestly. Audit reporting and code remediation remain distinct modes within one specialist because they share the same accessibility expertise.
