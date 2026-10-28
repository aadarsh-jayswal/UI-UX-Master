---
name: animate
description: Create expressive animation, visual storytelling, hover and gesture interactions, scroll choreography, and polished transitions for web or Expo. Discover motion opportunities, name effects, implement or review motion, diagnose performance, and write plans. Use proactively when motion strengthens a design or brand experience.
---

# Animate

Own temporal and gesture behavior, visual narrative, and motion craft. Actively look for opportunities to make the experience engaging, distinctive, and responsive. Read [coordination](resources/references/coordination.md), [policy](resources/references/policy.md) and the motion section of the [quality bar](resources/references/quality-bar.md). Select a mode and platform before loading detail.

| Mode | Resources | Output and mutation boundary |
|---|---|---|
| vocabulary | [glossary](resources/references/motion-vocabulary.md) | Term plus distinctions; no code |
| discover | Discovery section of [motion decisions](resources/references/motion.md) | Justified opportunities and rejected candidates; read-only |
| implement | [motion decisions](resources/references/motion.md) + [web](resources/references/motion-web.md) OR [Expo](resources/references/motion-expo.md); [polish](resources/references/polish.md) for routine interactive feedback | Scoped implementation and checks |
| performance | Performance section of motion decisions + relevant platform | Diagnosis; edits only if fixing was requested |
| audit / review | Review section of motion decisions | Findings; audit surveys a surface, review examines a diff; read-only |
| plan / reconcile | Relevant motion decisions + [plan template](resources/templates/implementation-plan.md) | Exact implementation plans or refreshed plan status; no product edits |

Use [Apple profile](resources/references/apple.md) only for an explicitly relevant Apple-like interaction/material request. Do not load web and native recipes together without a real cross-platform task. Vocabulary lookup needs no implementation playbook.

Shape motion around brand expression, atmosphere, visual storytelling, delight, feedback, state explanation, or spatial continuity. Preserve successful existing animation and interaction patterns during redesign. Explore hover responses, orchestrated entrances, scroll-linked scenes, parallax, image transitions, gestures, springs, and ambient motion as appropriate to the surface. Do not default every effect to a fade or static panel. Keep controls responsive; do not invent frequency counts or override product decisions with a universal taste rule. Reuse or coherently extend governing motion tokens. Design trigger, choreography, timing, spring/curve, interruption, exit, reduced-motion behavior, and pointer/gesture handling together.

Inputs are a component/interaction, target platform, desired outcome, and relevant source or runtime evidence. Use existing libraries and compatible native packages; installing new dependencies requires task authorization. No prescribed curve guarantees rendering performance. Measure actual behavior when claiming a performance fix.

Keep discovery, audit, review, and planning read-only. Implementation of a selected plan is an explicit mode, not a compulsory subagent/worktree flow. Return structural component dependencies to the interface owner without circular routing. Routine open and close: ease-out both ways, never an accelerating ease-in close, close slightly faster than open; reduced motion keeps no height, transform or blur animation and says exactly what still runs. Verify in real time with [page-eval.mjs](resources/scripts/page-eval.mjs) `--script` (with and without `--reduced-motion`), not a virtual-time budget. Done when interruption, accessibility, timing, and platform checks are performed or marked unverified. This specialist unifies complementary motion stages without adding separate stage skills.
