# Conditional UI baseline

Use for unspecified choices and cleanup. Actively pursue visual craft, distinctive art direction, and engaging interaction within the requested scope. Preserve the user's requested style, platform, product tokens, and existing stack. These defaults adapt Julien Thibeaut's baseline and relevant Emil Kowalski craft guidance; they do not require Tailwind or React in unrelated projects.

## Composition and interaction

- Reuse established accessible primitives for keyboard/focus behavior. Prefer native semantics; do not rebuild complex focus handling without a concrete reason.
- Give icon-only controls accessible names and decorative icons appropriate exclusion from announcements.
- Put validation near the affected action/field with a clear recovery. Do not block paste. A disabled action needs understandable context.
- Use stable loading structure where it reduces shifts, clear empty-state next actions, and error/success states that match real behavior.
- Respect mobile safe areas and dynamic viewport height where applicable. Keep overlays within the product's stacking conventions.

## Visual defaults

Use a coherent spacing/type scale, clear hierarchy, readable measure, expressive accents, and adequate separation/contrast. Develop a memorable composition through brand imagery, typography, color, depth, and contrast. Gradients, glow, shadows, unusual type treatments, and immersive backgrounds are available creative tools; select them for the art direction rather than defaulting to plain surfaces. Preserve recognizable brand imagery and visual narrative during redesign. Prefer tokens to arbitrary values. Balance headlines and wrap body copy when supported and useful; use tabular numbers where alignment matters. Truncation must preserve access to important content.

In Tailwind projects use existing utilities/theme rather than creating a parallel system; `cn`/clsx/tailwind-merge are useful if already appropriate to the stack. In other stacks use their native composition mechanism. Square sizing and gap layouts are preferences subject to component APIs, not universal syntax.

## Motion and performance

Treat animation as a normal design material. Proactively develop hover/press feedback, transitions, spatial continuity, atmosphere, and visual storytelling where they strengthen the experience. Beauty, delight, and brand expression are valid purposes. Preserve and improve existing motion rather than flattening it during cleanup or redesign. A small correction stays local; it can include a polished transition without activating a whole-site motion project. For substantial choreography use [motion decisions](motion.md) and the animate skill.

Choose rendering techniques that achieve the intended effect efficiently. Transform/opacity are useful options, not a property whitelist. Profile complex layout, masks, filters, canvas, or 3D effects when relevant; optimize the implementation while retaining the intended experience. Scope `will-change` to actual need and remove it after use. Rendering claims need measurement, not an assumption that a CSS property or library runs on a GPU. Provide reduced-motion treatments and accessible input alternatives.

Check the relevant screen/state, viewport, content extremes, keyboard operation, and existing repository checks. Avoid unrelated rewrites or installing a preferred primitive library in a working product.
