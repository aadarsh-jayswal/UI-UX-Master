# Interface delivery

## Design and flow/state work

Establish the primary actor, task, success condition, constraints, and surrounding surface. Inspect current components/tokens when a product exists. For new work, ask only for a missing choice that changes the deliverable; a small interface does not require a full brand interview.

Establish the visual ambition as well as the task flow: brand identity, imagery, typography, composition, emotional impact, and the story the surface should tell. For website creation and redesign, actively develop a distinctive visual narrative and interaction language. Inspect the original hero, navigation, hover states, scroll sequences, and transitions before replacing them. Preserve recognizable identity and successful behavior. Include expressive styling and motion in the design rather than treating them as optional decoration added after a static layout.

Map the primary path and the states that can change it: entry, selection/input, submission, processing, success, error/recovery, empty/missing data, permission/session effects, and exit/back behavior. Include relevant content extremes and responsive changes. These are candidate checks, not mandatory screens for every component. Use [page taxonomy](page-taxonomy.md) only if page purpose, navigation, rendering, access, or state classification helps the task. Rendering style does not determine business purpose or authorization.

Separate an assumption from a user-research finding. Define what is specified, what was inherited from the product, and what still needs a product decision. Reuse a component before creating a new shared primitive; local composition is often sufficient.

## Implementation

Read the affected runtime path, existing conventions, component dependencies, package manager, and relevant checks. Prefer the smallest correction that satisfies the task. Keep project tokens and aliases. Implement real interactions and realistic content rather than inert controls. Check affected states, input methods, viewports, and content extremes proportional to the change. Report rendering/runtime limitations instead of guessing a pass.

Ordinary implementation includes visual polish, hover/press feedback, correct semantics, labels, keyboard behavior, and useful errors. Proactively use [motion decisions](motion.md) and the animate specialist for substantial choreography, visual storytelling, or motion diagnosis; the user need not separately request animation when it serves the authorized design outcome. Deep accessibility investigation belongs to fixing-accessibility. Do not migrate the stack merely to match a preferred library list.

## Copy

Use exact user/brand terminology. Ask for tone or character limits only if missing and consequential. Prefer action-specific labels, useful errors (what happened and recovery), empty states with a next action, and confirmations that describe the consequence and action. Keep success/error/warning tone proportional. Offer alternatives when the choice actually matters, explain rationale briefly, and note translation expansion or terminology constraints. Do not invent prices, outcomes, product claims, or legal facts.

## Explore

Use only when alternatives are requested or exploration is explicitly selected. Name each direction and the meaningful axis that differs: layout, density, interaction, personality, or motion. Three variants are a useful default for a request without a count, not a reason to force a comparison into direct implementation. Cap large sets to a reviewable size.

Build in an isolated route or self-contained HTML. Each variant works with realistic surrounding context. The [picker template](../templates/prototype-picker.html) provides instant switching, replay, URL persistence, keyboard shortcuts that ignore text entry, and reduced-motion behavior. Adapt framework wiring while preserving those behaviors. Do not use untrusted strings as executable template markup. Verify all variants, then let the user choose. Promotion follows that choice; preserve the harness only when asked or useful for the next round.

The picker is comparison chrome, not a candidate product design. Its width-highlight transition illustrates a localized layout animation; judge the product's own effects in context. Position the picker away from the surface being judged.

## Handoff

Document the creative direction, relevant layout/tokens, components/props, variants/states, interaction, responsive behavior, content constraints, accessibility, and edge cases. When motion carries the experience, specify triggers, choreography, timing/progress, hover/focus/touch behavior, replay/reversal, interruption, and reduced-motion alternatives as completion criteria. Use [component spec](../templates/component-spec.md) for a component or [implementation plan](../templates/implementation-plan.md) for changes. Exact measurements need source/inspectable design evidence; do not derive them from a screenshot by pretending pixel estimates are canonical tokens. Include open decisions and verifiable completion conditions.
