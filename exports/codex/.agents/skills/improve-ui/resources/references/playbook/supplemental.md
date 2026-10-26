# Supplemental guidance (NOT from the PDF)

Everything in this file comes from outside *The UI/UX Playbook*. Use it to apply or verify the PDF's principles, and label it **"supplemental"** whenever you cite it. Never attribute these points to the PDF.

## S-01 WCAG contrast thresholds and formula
- WCAG 2.x level AA: 4.5:1 for normal text, 3:1 for large text (at least 24px regular, or about 18.66px bold) and for UI component boundaries. Level AAA: 7:1 normal text, 4.5:1 large text.
- Contrast ratio = (L1 + 0.05) / (L2 + 0.05) using relative luminance. `scripts/contrast.mjs` computes it.
- Supports: TYP-09, CON-01, CON-03, DEP-09. Note: the PDF labels #626262 on white "AAA pass"; by this formula it is about 6.1:1 (AA pass, AAA fail for normal text).

## S-02 Code-level equivalents of PDF measurements
- Line length (TYP-04): constrain paragraph containers with `max-width` in `ch` (about 60-75ch on desktop; the `ch` unit approximates characters, so verify visually).
- Line height (TYP-13, TYP-14): use unitless `line-height` (e.g. `1.5`-`1.6` for body, `1.1`-`1.3` for headings) so it scales with font size.
- Spacing scale (WS-03): define spacing tokens (e.g. CSS custom properties or a Tailwind spacing scale) on a 4px base and use only those tokens.
- Equal-height cards with aligned CTAs (CNS-04): make cards `display:flex; flex-direction:column` in a grid/stretch row and push the CTA down with `margin-top:auto`.
- Overlap outlines (BT-02): a `border` or `box-shadow: 0 0 0 Npx <surface colour>` ring on overlapping avatars/images.

## S-03 Accessible implementation notes
- Segmented code inputs (FRM-01): support paste of the full code, `autocomplete="one-time-code"`, numeric input mode and a single accessible label/group; moving focus between boxes must not trap keyboard users.
- Password visibility toggle (FRM-03): make it a real button with an accessible name that reflects the state ("Show password"/"Hide password").
- Icon-only controls (CLR-01): a visible text label is the PDF's fix; an `aria-label` alone helps screen readers but does not solve the visual ambiguity.
- Colour-independent states (COL-04): associate error text with the field (e.g. `aria-describedby`) and set `aria-invalid` on invalid inputs.

## S-04 Direction and platform conventions
- DLG-02 is stated for left-to-right reading. For right-to-left interfaces the mirrored order is commonly used, and some platforms have their own dialog button-order conventions; follow the platform when it differs.

## S-05 Heuristic thresholds used by the audit script
- `scripts/audit-rendered-ui.js` uses thresholds that are partly ours: e.g. flagging dropdowns with few options (IC-09), "primary-looking" buttons by fill saturation (VH-01), wide form fields at large viewports (WS-04). Treat its output as leads to verify visually, not verdicts.
