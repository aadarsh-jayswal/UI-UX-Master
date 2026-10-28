# Existing-interface review

## Critique: rendered and heuristic

Establish user task, audience, stage, creative direction, and supplied evidence. Evaluate first impression, visual impact, brand identity, visual narrative, motion/interaction quality, task flow, hierarchy, consistency, readability, affordances, and relevant accessibility concerns. Weight these dimensions by the brief; when visual narrative is central, it is a primary success criterion. A simpler or more static surface is not inherently better. Make specific recommendations with why/impact and acknowledge successful patterns. Label heuristic judgments, untested usability predictions, and descriptions supplied by the user. A source-only review cannot prove a perceived visual hierarchy.

For redesign comparisons, inventory recognizable imagery and actual behavior in both versions: hero/section storytelling, hover/focus navigation, buttons/cards/images, scroll scenes, transitions, and replay/reversal. Compare how the experience feels and communicates, not just static screenshots or structural clarity. Treat lost identity, flattened choreography, and unnecessary interaction steps as potential regressions relative to the goals. Use [motion decisions](motion.md) for deeper motion review. Exercise relevant interactions in the rendered sites; explicitly mark untested behavior and limit the verdict accordingly. Do not infer poor performance from visual richness or claim improvement without evidence.

## Audit: local-system proof

1. Select one deployable application and coherent task/surface family. Begin with routes/layouts, then trace imports, composition, variants, resolved tokens, and styles to actual consumers.
2. Find current governing design guidance. Draft proposals, absence of documentation, similar package names, and repeated literals are not binding contracts.
3. Collect candidate contradictions in visible copy, selected/active presentation, responsive branches, variants, and documented rules.
4. Require a governing contract or direct user-facing contradiction, runtime connection, and one correction established by evidence. If multiple alternatives remain equally plausible, mark a product decision rather than a proven defect.
5. Re-open cited evidence and attempt to falsify the finding. Remove wrong ownership, intentional differences, stale citations, and duplicate root causes.

Source can establish supported token/variant/copy-contract problems. Hierarchy, density, discoverability, or perceived coherence need rendered or user evidence. Do not quietly expand a design audit into general debugging, performance, architecture, metadata, or comprehensive WCAG review. Requested additional dimensions get their own owner/mode and evidence.

Use [findings](../templates/findings.md). Prioritize confidence, impact, reach, and correction cost. Default to a few high-confidence findings rather than padding output. No supported findings is a valid result.

## Plan and reconcile

Use one [plan](../templates/implementation-plan.md) per root correction. Include current locations/content, governing decision, actual reusable primitives/exemplar, scope/affected consumers, exact expected result, steps, checks, and stop conditions for evidence drift. Record a commit if available without requiring a Git repository for every task. No dependency installs, formatting, commits, or product edits in review mode.

For reconcile, re-read the source before marking a plan done, refresh stale references, and retain unresolved manual checks. The fact that a plan exists or a command passed does not prove a visual or interaction outcome. Handoff implementation only when selected/authorized; do not introduce redundant approval if the original request already included fixes.
