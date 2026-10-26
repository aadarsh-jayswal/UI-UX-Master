---
name: ui-ux-meta-architect
description: Coordinate UI/UX work spanning research, interface design, design systems, implementation, accessibility, or motion, or help select the right workflow. Use for multi-stage or ambiguous UI/UX work. Clear focused requests may go directly to a specialist.
---

# UI/UX Meta Architect

Own workflow selection, evidence, handoffs, and completion. Specialists own their deliverables. Use the smallest sufficient workflow; do not create another skill for a mode an existing specialist can cover.

Read [coordination](../../shared/references/coordination.md) and [context policy](../../shared/references/policy.md) when coordinating. Resolve paths relative to this file, never the terminal's current directory.

## Establish the task

Identify the outcome, surface, platform, available evidence, existing conventions, authorized mutation scope, and an observable completion condition. Inspect supplied material before asking questions. Ask only for missing facts that change the work. Use stated assumptions for reversible nonblocking choices. Do not force research, a fixed interview, or a prototype set for a small correction.

For design and redesign, establish visual ambition, recognizable brand identity, narrative, and interaction quality as well as task completion. Actively promote expressive design and motion where they strengthen the outcome. Preserve successful existing imagery and behavior; do not treat a plainer or more static result as the default improvement.

## Select a specialist

| Need | Peer skill | Mode |
|---|---|---|
| Study planning or evidence synthesis | user-research | plan, synthesize |
| Shared tokens/components/patterns or DESIGN.md | design-system | audit, document, extend, record |
| Concrete UI, flow/state design, copy, prototypes, handoff, ordinary code, metadata | ui-design-toolkit | design, implement, explore, copy, handoff, metadata, select-library |
| Existing-product critique or design drift audit | improve-ui | critique, audit, plan, reconcile |
| Accessibility assessment, fix, verification | fixing-accessibility | audit, remediate, verify |
| Motion terminology, suggestions, implementation, performance, review | animate | vocabulary, discover, implement, performance, audit, plan, review, reconcile |

Use the host's discovered skill catalog and actual paths. The peer folders normally share this skill's parent directory. Before use, read the selected peer's SKILL.md. If the host lacks skill invocation but allows file reading, explicitly read the named peer instructions and follow them as task guidance; describe this as manual loading, not native discovery. A reference is not a skill invocation or a subagent.

Default to one specialist. Load animate alongside interface work when substantial motion or visual storytelling is integral to the same deliverable; no separate animation request is necessary. Add other specialists only for necessary distinct capabilities. For multi-stage work, selectively use the [new-product playbook](../../shared/domain_playbooks/new-product.md) or [existing-product playbook](../../shared/domain_playbooks/existing-product.md). Skip unnecessary stages.

## Coordinate

Assign one writer to an artifact at a time. Pass task, evidence, decisions, mutation scope, outputs, and remaining checks using the coordination contract. Specialists return their result or a bounded dependency; they do not recursively restart this router. Multiple skills do not require multiple agents. Delegate only if the host and task authorize it.

Audit, critique, discovery, and review are read-only on product source. Implementation/remediation may change authorized scope. An audit finding does not authorize a fix; an existing instruction to implement remains valid and needs no repeated confirmation.

Preserve user requirements and product conventions using the context policy. Load Apple, Expo, library, and provider guidance only when applicable. Handle accessibility of changed interactions without turning every edit into a whole-product audit.

## Optional integrations

Read [integration contracts](../../shared/references/integrations.md) only for a relevant service/platform task. Confirm actual tools, skill availability, credentials, inputs, and side effects. Source files do not establish installation or authentication. Do not install dependencies, spend credits, publish, or send messages merely because integration instructions describe those actions. Complete independent work when access is missing and report the specific blocked step. Do not silently substitute providers.

## Finish

Check the selected completion criteria. Report delivered artifacts/changes, checks performed, and material limits. Distinguish plans from implementation, source inspection from runtime testing, and generated output from inspected output. For multi-stage work, every required output has an owner and status. Outside this collection, use another suitable existing workflow instead of inventing a new specialist.
