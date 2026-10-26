---
name: ui-design-toolkit
description: Design or implement distinctive interfaces with strong visual narrative, expressive styling, and engaging interaction; improve bounded UI details, write UX copy, compare prototypes, prepare developer handoff, or fix page metadata. Use for delivering a surface; broad read-only product audits use improve-ui.
---

# UI Design Toolkit

Own the concrete interface artifact. Read [coordination](../../shared/references/coordination.md), [policy](../../shared/references/policy.md), and the section of the [quality bar](../../shared/references/quality-bar.md) for the selected mode (design specification, UI implementation or scoped edit). Resolve the requested output before loading a mode.

| Mode | Load | Output |
|---|---|---|
| design | [interface procedure](../../shared/references/interface.md); [playbook task router](../../shared/references/playbook/task-router.md); [discovery interview](../../shared/references/discovery-interview.md) only when a user can answer; [taxonomy](../../shared/references/page-taxonomy.md) only when classifying pages | Task flow, screen/state decisions, or specification with every flow-changing state and an accessibility section |
| implement | [baseline](../../shared/references/baseline-ui.md), [polish](../../shared/references/polish.md), relevant [playbook](../../shared/references/playbook/task-router.md) principles and interface sections | Working scoped source changes verified with [page-eval.mjs](../../shared/scripts/page-eval.mjs) and [audit-rendered-ui.js](../../shared/scripts/audit-rendered-ui.js) at desktop and 390px |
| edit | The scoped-edit section of the quality bar | Only the requested change, diffed against the original |
| copy | Copy section of [interface procedure](../../shared/references/interface.md) | Exact wording, alternatives when helpful, localization notes |
| explore | Exploration section of [interface procedure](../../shared/references/interface.md); [picker](../../shared/templates/prototype-picker.html) | Distinct working variants in an isolated harness |
| handoff | [interface procedure](../../shared/references/interface.md), [component spec](../../shared/templates/component-spec.md) or [plan](../../shared/templates/implementation-plan.md) | Engineering-ready specification |
| metadata | [metadata procedure](../../shared/references/metadata.md) | Metadata patch or review |
| select-library | [library lookup](../../shared/references/libraries.md) | One justified fit, respecting installed dependencies |

Input is a surface/task and desired outcome. Inspect existing tokens, components, routes, and conventions before proposing a replacement. For a new product, use enough context to establish its primary task; no fixed interview is required. A request for one correction does not activate exploration, full research, system governance, or a product audit.

Develop visual craft and interaction together: imagery, typography, composition, depth, hover response, and motion should express the product's identity. Preserve successful brand storytelling and interaction behavior in redesigns. Do not default to plain backgrounds, static panels, or generic fades when the brief calls for impact.

Apply progressive disclosure. Load [Sonner](../../shared/references/sonner.md) only for an actual Sonner task. Library selection and prototype exploration are deliberate modes, not defaults. Proactively use the animate specialist contract for substantial choreography or visual storytelling when it strengthens the authorized design outcome. Use fixing-accessibility for a deeper accessibility investigation; ordinary accessible construction and interaction polish remain part of this skill.

Keep exploration outside production until the user selects a variant. Do not infer selection from silence. For already authorized direct implementation, do not introduce an unnecessary approval step. Preserve real content and product identity; do not invent research, pricing, claims, or brand facts.

Dependencies are the existing project stack and verification environment. Optional provider/library skills need actual availability. Audit-only requests do not authorize source changes, packages, messages, or publication.

Done when the requested interface task works, affected states/viewports have appropriate checks, and any untested behavior is named. Handoff exact artifacts, changed files, reused contracts, and remaining checks. This skill groups modes that share one interface artifact and avoids separate skills for copy, metadata, flow design, and handoff.
