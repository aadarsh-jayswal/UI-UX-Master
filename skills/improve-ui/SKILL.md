---
name: improve-ui
description: Critique an existing interface or audit a product surface against its own design evidence, then prioritize findings or prepare implementation plans. Read-only on product source; use when evaluation is requested rather than a clear direct correction.
---

# Improve UI

Own independent review. Read [coordination](../../shared/references/coordination.md), [policy](../../shared/references/policy.md), and the selected mode in [review procedure](../../shared/references/review.md).

## Modes

- **Critique:** Evaluate supplied rendered UI, screenshots, or a description with task/audience context. Identify heuristic recommendations as recommendations, not proven user behavior or measured defects.
- **Audit:** Select one coherent surface, trace its runtime owners, and test candidates against its binding design evidence. Prefer no finding to an unsupported one.
- **Plan:** Produce one self-contained [implementation plan](../../shared/templates/implementation-plan.md) per selected root correction, including exact scope, reuse, current evidence, expected outcome, and checks.
- **Reconcile:** Re-open plan evidence and update status, stale locations, assumptions, and affected consumers. Do not implement the plan.

Input is a bounded product surface and evidence. Source can prove token/variant/copy-contract contradictions; visual hierarchy or perceived clarity needs rendered/user evidence. Use the shared [findings format](../../shared/templates/findings.md). Deduplicate root causes, prioritize by confidence and user impact, and default to at most three high-confidence audit findings unless broader coverage is requested.

Assess visual impact, brand identity, narrative, and interaction richness alongside clarity. Weight them by the brief rather than assuming restraint is superior. For redesigns, compare original imagery and actual hover/focus, scroll, and transition behavior; lost storytelling or animation can be a major regression. Use the animate review contract when motion is central. Static screenshots do not verify interaction quality, and visual richness alone does not prove a performance problem.

Never change product source, install dependencies, run mutating formatters, or publish findings. Write only requested review/plan artifacts. Do not expand into functional debugging, architecture, performance, metadata, or a full accessibility audit merely because related code exists. A clearly requested small fix should go directly to its implementation owner instead.

If implementation was already authorized, return the accepted scope to that owner without asking for the same authorization again. Otherwise finish with findings/plans and the choices that need product judgment. Done when every finding states its evidence type, affected surface, confidence, supported correction, and verification. This skill remains separate to preserve the read-only assessment contract.
