# Implemented architecture

## Core and discovery

One router coordinates six independently invocable specialists. Source-authoring folders are peers under `skills/`; exporting places those peers under each host's documented skill root. Each canonical SKILL.md has a discriminating name/description and modes with inputs, outputs, dependencies, boundaries, handoff and completion criteria. Detailed guidance lives in shared references, templates, and two conditional playbooks.

This differs from the original proposal's ancestor-shared `.agents/ui-ux` layout: for cross-host portability, generated skills contain reachable shared resources inside their own `resources/`. Canonical guidance is still maintained once. Runtime exports contain deterministic resource copies; they are not independently maintained forks or extra skills. No nested specialist discovery is assumed. Manual loading remains possible in file-reading hosts.

## Owners and separation justification

| Owner | Distinct purpose | Modes and output | Inputs / dependencies | Boundary and handoff |
|---|---|---|---|---|
| ui-ux-meta-architect | Workflow selection, evidence, ownership, completion | Scoped workflow/handoff | User request, actual file/tool/skill access | No duplicate specialist manuals or compulsory subagents; one writer per artifact |
| user-research | Actual user evidence | Plan/synthesize → study/report | Research decision or actual records; optional feedback/analytics | No invented observations; pass evidence to design only when needed |
| design-system | Cross-surface persistent contracts | Audit/document/extend/record → shared spec or DESIGN.md | Governing system sources/rendered evidence, conditional export tooling | No unrequested consumer rewrite; pass shared contract to implementation |
| ui-design-toolkit | Concrete interface delivery | Design/implement/explore/copy/handoff/metadata/library selection | Surface/task, product conventions, relevant stack | No fabricated research or default full audit; motion/accessibility dependencies are bounded |
| improve-ui | Independent read-only assessment | Critique/audit/plan/reconcile → evidence/findings/plans | Bounded surface and source/rendered/user evidence | No product edits; selected/authorized correction goes to writer |
| fixing-accessibility | Specialized standards/assistive behavior | Audit/remediate/verify → findings/fix/checks | Relevant surface/standard/platform and actual tooling | Audit distinct from edits; no screenshot-only behavioral proof |
| animate | Temporal and gesture behavior | Vocabulary/discover/implement/performance/audit/plan/review/reconcile | Interaction, platform, tokens, browser/device tools as needed | Stage permissions retained; platform guidance selected, not globally merged |

Research synthesis, UX flows, copy, metadata, prototypes, library selection, Apple profile, and handoff do not become new skills because these owners adequately cover them. Existing optional integrations survive where a backend contract, persistent state, library migration, or toolchain requires separate expertise. See collection.json and shared/references/integrations.md for exact identities and activation contracts.

## Coordination

The selected owner records task/outcome, mode/scope, evidence, decisions, output, verification, and next necessary owner. Small tasks keep that record in conversation. Audit/critique/review/discover modes are read-only on product code; implementation/remediation are separate. The user's original implementation authorization remains valid across internal handoffs. No automatic external publication, messaging, credentials, installs, credits, or provider changes follow from a skill selection.

Peer selection uses the host's actual catalog/path. Reading a reference does not invoke a specialist, grant a tool, or spawn a subagent. Specialists return results or a bounded missing dependency; they do not recursively restart the router. Independent direct invocation is supported.

## Progressive loading and routing

Start with the relevant SKILL.md plus small coordination/policy files. Load mode-specific references only when needed. A spacing fix uses baseline guidance; vocabulary uses a glossary; Expo motion does not load web recipes. A new interface starts from the user's task and only adds research/system/motion/provider stages when they materially contribute.

Use the routing/mode tables in the router and each specialist as the canonical operational routes. scenarios.json records representative expected routes and completion criteria; it is an evaluation fixture, not a second runtime router.

## Source accounting

`provenance/sources.json` accounts for 36 unpacked and 14 packaged definitions. Thirteen packaged copies are byte-identical duplicates; 37 source identities remain. Seven identities are ancestors of canonical entrypoints, nineteen are consolidated into modes/references/templates, and eleven remain optional existing specialists. Every record retains original location, archive member if applicable, hash, destination, disposition, rationale, duplicate relationship, and license status.

Original source collections and Zip remain untouched. Capturing optional resources does not execute them. The eight actual Higgsfield definitions are preserved; the missing ninth game-generation identity is not invented. Two taxonomy documents are supporting source material, not skills, and both are retained/compared.

## Conflicts and fidelity

shared/references/policy.md is the single conflict owner: explicit user/product requirements, applicable accessibility/platform constraints, established conventions, then conditional generic preferences. It scopes baseline versus motion, Apple materials, duration/property exceptions, library-specific toast contracts, audit mutation boundaries, provider restrictions, and honest verification.

The original taxonomy's rendering/navigation conflation and absolute static/SPA/landing-page claims are corrected while retaining its page examples. Accessibility criterion labels are versioned correctly. Product decisions are not inferred from repeated source values or screenshot estimates. Source performance claims become hypotheses to verify against the installed stack.

## Supporting assets and utilities

Templates are optional working formats, not mandatory process. Web/Expo recipes, a full glossary, and Sonner API are attributed source snapshots behind progressive links. A self-contained HTML picker supplies a usable comparison harness. No additional UI build framework is required by the collection.

Node 20+ utilities use built-ins only: capture-sources.mjs records original inventory/snapshots, setup.mjs materializes self-contained skills with dry-run/collision protections, validate.mjs checks metadata/resources/provenance/exports. lib.mjs shares deterministic file/path logic. Tests verify actual relocatability, dry-run behavior, collisions, idempotence, optional selection, and path safeguards. No dependency install is required. Utility execution and native host/LLM verification are distinct.

## Adoption and unresolved dependencies

Use a ready-to-copy export or dry-run setup for the target project; review then apply. Confirm seven unique skills in that host and test direct/router invocation. Preserve originals, disable only confirmed superseded installed copies when desired, and add optional integrations selectively. Update canonical sources and export into a fresh destination rather than force-overwriting changed skills.

Known constituent MIT notices are retained. Anthropic Design licensing is undocumented in the accessible source, so definitions are mapped but not copied verbatim into optional snapshots; core procedures are newly worded. This private collection does not assert a blanket license for all upstream material. Review source rights before public redistribution.

Current host discovery/behavior, browser/screen-reader/device verification, and provider authentication/model access remain actual-environment checks. See docs/VALIDATION.md for exactly what was run. The separate AI Systems Meta Architect source was not supplied; only the separation described by the user informed this implementation.
