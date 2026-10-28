# Canonical motion decisions

Adapted from animate, improve-animations, review-animations, find-animation-opportunities, fixing-motion-performance, and Emil design-engineering guidance. This file owns shared decisions; platform files own APIs. Exact source examples remain in the recipe references, subordinate to this collection's policy and the actual installed API.

## Creative direction, purpose, and frequency

Actively use motion for visual storytelling, brand expression, atmosphere, beauty, delight, feedback, spatial continuity, and state comprehension. Expressive motion does not need to masquerade as a functional necessity. Establish the intended feeling and narrative, then compose a coherent motion language across the page rather than scattering identical fades. Preserve the visibility and usability of task-critical content and keep navigation/keyboard workflows responsive. Treat source frequency buckets as heuristics; do not invent usage counts. A static treatment is an intentional contextual choice, not the default definition of quality.

For brand experiences, consider layered imagery, parallax, scroll-linked scenes, masks, image reveals, SVG morphs, spring interactions, and canvas/3D where the direction benefits. Plan how the hero introduces the story, how sections develop it, and how hover/press details make the whole surface feel alive. Preserve recognizable imagery and successful original choreography in a redesign. Match ambition to the brief and available runtime; no particular effect or library is compulsory.

## Ingredients

Reuse or coherently extend current product motion tokens. If no governing value exists, source defaults can inform a choice:

| Situation | Candidate timing/tool |
|---|---|
| Simple hover/press/state change | CSS transition; native compatible transition |
| Entry with no gesture | CSS starting-style/animation when supported; native entry API |
| Programmatic web motion without library | WAAPI |
| Continuous/interruptible gesture or layout/exit | Suitable spring/motion API |
| Enter/exit | Responsive ease-out or established product curve |
| Moving/morphing in place | Ease-in-out or spring |
| Constant progress/ambient motion | Linear when the purpose calls for it |

Source curves when there is no governing project alternative:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

Candidate feedback starting points: press 100–160ms; small tooltip/popover 125–200ms; dropdown/select 150–250ms. These are not universal limits. Give cinematic scenes, ambient effects, and scroll choreography the duration or progress mapping they need. Separate immediate input feedback from longer visual settling. Stagger can start around 30–80ms per item, with controls available throughout. Judge timing in the actual composition and interaction.

For a physical gesture, preserve current presentation and release velocity on interruption. Anchor popover origins at the trigger; centered modals need not originate from a trigger. Choose scale, overshoot, and spring character to match the art direction. Match entry/exit paths when spatial continuity matters. Deliberate hold actions can have slower progress and a snappy release response. Reduced-motion alternatives retain content, narrative, and necessary feedback through gentler or static treatments.

## Behaviour contract before motion

Motion is added to a component's behaviour, never in place of it. Before animating, list what the component must still do, including what the pattern requires but the original may lack, and verify each item after the motion lands. For notifications and other timed content:

- Enter with transform and opacity from the anchored edge; exit faster than enter with an ease-out curve.
- Reflow the remaining items smoothly when one leaves (FLIP, or a height and margin collapse that starts with the exit rather than after it), with no jump.
- Pause the dismiss timer on hover and on focus within, and resume with the remaining time, not a fresh full duration (WCAG 2.2.1 Timing Adjustable, Level A).
- Never move focus when a timer expires. On a manual dismiss, return focus to a sensible target only if focus was inside the item.
- Dismissing mid-enter and rapid repeats end in a consistent state.
- Announce each message once: add it to the existing live region and do not re-insert moved nodes, which some screen readers announce again.
- Reduced motion keeps the same timing and pause behaviour with an opacity-only change; the note says exactly what still runs.

## Discovery

Read-only. Look for opportunities in the hero, section-to-section narrative, imagery, cards, links, navigation, pointer response, scroll progression, gestures, and completion moments, as well as feedback gaps and disconnected state changes. Compare existing choreography before proposing replacements. For each candidate record the intended experience, trigger, replay/reversal behavior, timing or progress mapping, exact location, and accessible alternative. Prioritize a coherent set that creates impact while keeping content usable. Report concrete ingredients and explain omitted candidates where useful. Do not implement suggestions in discover mode.

## Performance diagnosis

Choose efficient techniques that preserve the intended effect; transform/opacity are useful when they express it. Inspect actual layout, paint, compositing, main/UI thread behavior, and measurement cost. Batch DOM reads before writes; avoid unnecessary per-frame remeasurement or React state updates. Pause offscreen work, scope layer promotion, and profile complex filters, masks, layout effects, canvas, or 3D scenes when relevant.

Layout/paint animation is available when the composition calls for it; select an implementation suited to its scale and measured cost. Localize frequently changing CSS variables to avoid unnecessary descendant work. Scroll timelines/visibility observers can avoid unnecessary scroll work when supported. Design navigation-level view transitions for actual interruption and size behavior. Optimize bottlenecks before sacrificing the visual narrative; do not remove effects solely on hypothetical performance grounds.

No shorthand, full transform string, CSS property, or library name guarantees GPU acceleration. Verify the actual installed library/runtime and profile when making a performance claim. Diagnose before changing libraries; existing stack first.

## Audit/review and plans

Audit maps a surface's motion conventions and priorities; review focuses on the requested code/diff. Both are read-only. Evaluate visual impact, narrative progression, brand character, hover/gesture richness, choreography, perceived responsiveness, origin, interruption, rendering cost, reduced motion, and token cohesion. In comparisons, inventory original and redesigned behavior and flag lost motion or interaction when it weakens the intended experience. Re-open cited evidence and respect intentional tradeoffs. Classify concern versus runtime-confirmed failure; a screenshot cannot establish animation quality.

Use [findings](../templates/findings.md), with concrete before/after recommendations when helpful, and a scoped verdict. Do not block a measured intentional exception solely because a source taste rule is absolute. Plans use [implementation plan](../templates/implementation-plan.md) with current snippets, exact values from the governing product/source, scope, and mechanical plus feel checks. Reconcile against current source before marking done.

## Verification

Try rapid repeats, mid-flight reversal, dismissal, reduced motion, pointer/touch behavior, content extremes, and the actual busy/load state when relevant. Test every item of the behaviour contract, including interaction states such as hover and focus held past a dismiss time; a frame-perfect animation that breaks a required behaviour is a failure. Use slow playback or frame inspection for timing. Native gestures/haptics need release builds on representative physical devices. Report simulator-only/source-only limits; a passing build does not prove feel.
