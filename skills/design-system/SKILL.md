---
name: design-system
description: Audit, document, or extend shared design tokens, components, patterns, or create/update DESIGN.md from repository or rendered website evidence. Use for persistent cross-surface rules; ordinary page-local UI work belongs to ui-design-toolkit.
---

# Design System

Own persistent shared interface contracts. Read [coordination](../../shared/references/coordination.md), [policy](../../shared/references/policy.md), the relevant [system procedures](../../shared/references/design-system.md), and the [quality bar](../../shared/references/quality-bar.md). For new or audited scales (spacing on a 4px base, type ratios, radius, elevation, colour roles with measured contrast) check the token row of the [playbook task router](../../shared/references/playbook/task-router.md) and the [polish](../../shared/references/polish.md) surface rules.

## Modes and outputs

- **Audit:** Read-only inventory of naming, token usage, variants, states, and consumers. Report evidence-backed gaps using [findings](../../shared/templates/findings.md); do not invent a numerical score.
- **Document:** Describe an existing component/pattern with the [component specification](../../shared/templates/component-spec.md), supported behavior, token references, and actual accessibility requirements.
- **Extend:** Establish the missing shared contract. Compare existing primitives first; specify ownership, consumers, states, migration effects, and verification. Changes to product implementation require that scope to be authorized.
- **Record:** Read [DESIGN.md procedure](../../shared/references/design-md.md). Create/update only DESIGN.md; preserve repository versus reconstructed-URL evidence boundaries and validate its schema/export.

Input is a shared-system question plus actual repository/design evidence, or an explicit request to establish a new system. Treat repeated values as candidates rather than established intent. Existing accepted decisions prevail over an accidental implementation pattern. New component APIs must distinguish specified behavior from unresolved choices.

Dependencies are the product/design sources and relevant tools; URL reconstruction requires rendered inspection. Missing inspection blocks exact-value reconstruction, not other authorized documentation. Never migrate a framework, install a library, or publish to a wiki implicitly.

Handoff the canonical token/component contract and affected consumers to the implementation owner. Done when definitions have named owners, scoped consumers, evidence, states, and validation appropriate to the selected output. This is independent because a shared system governs multiple interfaces rather than one page's local presentation.
