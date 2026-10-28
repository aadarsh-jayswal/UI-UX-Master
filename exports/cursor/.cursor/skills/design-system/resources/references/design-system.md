# Shared design-system procedures

## Audit

Select system scope and actual consumers. Map token names/aliases/themes, component owners, variants/states/sizes, composition patterns, accessibility behavior, and documentation. Check hardcoded values only after resolving whether an existing token governs that use. Similar names or repeated literals do not establish a violation. Record intentional exceptions and migration states.

Report naming inconsistencies, gaps in real state/variant coverage, unsupported documentation, or contradictory consumer behavior with evidence. Do not assign a fabricated score out of 100. Prioritize user impact and shared reach. Audit is read-only on product source.

## Document

Use the [component specification](../templates/component-spec.md). Record purpose/use conditions, supported variants, props, states, layout/content constraints, keyboard/focus/announcement behavior, tokens, responsive behavior, and examples appropriate to the actual framework. An undocumented behavior is an evidence gap, not proof it does not exist.

## Extend

Name the user/task gap and compare existing patterns. Prefer composing an existing owner before adding a primitive. A proposed shared primitive needs a named owner, intended consumers, state/behavior contract, token use, accessibility, and a migration/compatibility decision. Keep page-local choices local when no shared contract is needed.

For new systems, define only the minimum roles/components required by the current task. Do not invent a complete scale or governance process to fill a template. Explicit user choices are requirements; assumptions stay labeled until accepted or verified.

Persistent design-language capture uses [DESIGN.md procedure](design-md.md). Wiki publication or component-code changes require their own task authorization; documenting a system is not permission to update every consumer.
