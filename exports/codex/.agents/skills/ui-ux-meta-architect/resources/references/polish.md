# UI polish

Re-authored from Jakub Krehel's `better-ui` skill (MIT; see licenses); its detailed recipes are kept verbatim under `polish/`. Use for surfaces, icons and interactive-state motion once the underlying interaction is sound. A polish finding never outranks a broken interaction. In the upstream text, references to `better-typography`, `better-accessibility`, `better-layout` and `better-colors` map to this collection's [playbook typography](playbook/principles/15-typography.md), [accessibility](accessibility.md), [playbook layout](playbook/principles/09-layout.md) and [playbook colour](playbook/principles/14-color.md).

The values are exact, not ranges: `cubic-bezier(0.2, 0, 0, 1)` is not `cubic-bezier(0.4, 0, 0.2, 1)`, and `0.96` is not `0.95`. Optical nudges and the concentric-padding cutoff are starting points judged by eye. Keep the project's component library, tokens and density; a deliberate, consistent project convention (such as no shadows) is a preference, not a finding. The same detail done two ways in one project is a finding. Expressive narrative motion follows [motion decisions](motion.md) and the [context policy](policy.md); these values govern routine interactive feedback.

| Rule | Exact value or behaviour | Recipe |
|---|---|---|
| Concentric radius | Outer radius = inner radius + padding + border, where nested surfaces share an even inset up to 24px | [surfaces](polish/surfaces.md) |
| Optical alignment | Icon side of a button gets 2px less padding; nudge play triangles toward the point | [surfaces](polish/surfaces.md#optical-alignment) |
| Depth | Layered transparent `box-shadow` for elevation; keep borders for dividers, cells, selected states and inputs (3:1 boundary); add `border: 1px solid transparent` under shadow rings for forced-colors | [surfaces](polish/surfaces.md#shadow-recipes) |
| Image outline | 1px outline inset 1px: `oklch(0 0 0 / 0.1)` light, `oklch(1 0 0 / 0.1)` dark; never a tinted or accent colour; skip transparent artwork | [surfaces](polish/surfaces.md#image-outlines) |
| Interactive state | CSS transitions or springs that retarget on reversal; keyframes only for one-way sequences | [animations](polish/animations.md) |
| Press | Scale to 0.96 over 150ms ease-out; never when disabled; provide an opt-out | [animations](polish/animations.md#scale-on-press) |
| High-frequency interactions | Instant, or ≤150ms on opacity or background-color; every animated change also has a static cue | [animations](polish/animations.md) |
| Reduced motion | Movement, scale and blur only under `prefers-reduced-motion: no-preference`; otherwise an opacity cross-fade | [animations](polish/animations.md#reduced-motion-fallback) |
| Staged entrance | Semantic chunks 100ms apart: opacity, 4px blur, 12px translateY over 300ms ease-out; never for routine interactions | [enter-exit](polish/enter-exit.md) |
| Exit | Shorter and smaller than the entrance: opacity, 4px blur, −12px translateY over 150ms ease-out | [enter-exit](polish/enter-exit.md#exit-animations) |
| First render | `initial={false}` on state-swap `AnimatePresence`, not around intentional entrances | [animations](polish/animations.md#skip-animation-on-page-load) |
| Icon swap | Scale 0.25→1, opacity 0→1, blur 4px→0; spring `{ duration: 0.3, bounce: 0 }` or 300ms `cubic-bezier(0.2, 0, 0, 1)` | [icon transitions](polish/icon-transitions.md) |
| Theme switch | Disable transitions, flush styles, restore after the next frame | [animations](polish/animations.md#suppress-transitions-on-theme-switch) |
| Transitions | Name properties; never `all`. `will-change` only after observed stutter, naming the property | [performance](polish/performance.md) |
| Hover | Behind `@media (hover: hover)`; `-webkit-tap-highlight-color: transparent` where a control draws its own pressed state | — |
| Overlay scroll | `overscroll-behavior: contain` on scrollable dialogs, drawers and menus | — |
| Icons | Stroke tracks text weight (1.5px at 400 to 2.5px at 700); one library per surface; `currentColor`; outline default, fill for active; mirror only direction-bound icons in RTL | [icons](polish/icons.md) |

Severity for polish findings: HIGH breaks an interaction (a keyframe toggle that cannot reverse, a hover stuck on touch, motion that ignores reduced motion, state carried by motion alone); MEDIUM is a visible inconsistency; LOW is isolated polish. Without a browser, read every defined state with its durations and easings from code; with one, walk each state and replay motion slowly. Report every unrun check as not verified. Report in the [findings](../templates/findings.md) format with Before and After columns.
