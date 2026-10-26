# Validation status

## Expressive design revision — 2026-10-24

Removed conservative aesthetic defaults from the active baseline, context policy, motion profiles, interface/review procedures, skill entrypoints, and playbooks. Creative direction now promotes visual narrative, brand identity, expressive styling, hover interaction, and richer choreography. Accessibility, input responsiveness, authorization boundaries, and evidence-based performance checks remain. Attributed upstream snapshots are preserved; canonical context policy explicitly resolves their blanket aesthetic restrictions.

Regenerated exports into fresh temporary directories, compared them against unchanged prior exports, and deliberately adopted the updates for Codex, Claude, and Cursor. Each profile now contains seven skills and 104 generated files; all files match the canonical export plan. Prior canonical files and export bytes were backed up before editing.

Verification: `node scripts/validate.mjs` returned no errors; the combined portability/picker suite passed all 22 tests; the skill-creator Python quick-validator passed all four edited skill entrypoints. Two new scenario fixtures cover expressive brand websites and preservation of narrative/interaction in redesign comparisons, bringing the fixture count to twelve. These new fixtures have not been executed as live model evaluations. No product-site changes or browser performance/feel checks were part of this skill revision.

## Earlier validation record

Validated locally on Windows with Node v22.18.0, 2026-10-23. Core export utilities require Node 20+ and no external packages. Python was unavailable; the bundled Python quick-validator was not run. The Node validator checks the intentionally simple portable frontmatter, resource closure, identities, source accounting, and generated exports.

## Observed results

- `node scripts/capture-sources.mjs --source-root ...`: captured 36 unpacked + 14 packaged definitions, 37 unique identities, 13 proven duplicate copies, and 11 optional snapshots. No repository scripts from the source collections were executed.
- `node --test tests/portability.test.mjs`: **15 passed, 0 failed**. Actual checks cover three platform exports and relocation, dry-run no-writes, idempotence, changed/extra-file collisions, blocking file ancestors, symlink/junction redirection, invalid optional/traversal arguments, selected optional resource preservation, paths with spaces, CLI option rejection, and both taxonomy sources.
- Three ready-to-copy profiles generated: Codex `.agents/skills`, Claude Code `.claude/skills`, Cursor `.cursor/skills`. Each contains seven complete skill folders and 101 generated files including reachable resources and notices.
- `node scripts/validate.mjs --source-root ...`: checks canonical files, generated resource links, all definition dispositions, duplicate hashes, both original taxonomy hashes, known supporting snapshots, and original package-container hashes. See the final command output if a later edit introduces drift.

The architecture also received a static ten-scenario routing/boundary review; the six required scenario categories and revisions are documented in `evals/REVIEW.md`. Scenario fixtures are not represented as an executed model-routing benchmark.

## Remaining verification

Follow-up checks are recorded in [the native/offline report](../evals/native-check/REPORT.md). The installed Codex CLI's native skills/list scanner recognizes all seven export skills as enabled with no errors. The current workspace root has none installed. Claude Code/Cursor native discovery and actual model-routing/output behavior remain untested. Follow docs/PLATFORMS.md smoke tests in the intended host/project. Tests ran on Windows; macOS/Linux host runs are not claimed.

The combined suite now has **22 passing tests**: the original 15 portability checks plus seven offline picker-script behavior tests. The editable-text shortcut regression was reproduced and repaired in the canonical template and all three exports. Browser access to the local page was declined by the permission gate, so no rendered-browser pass is claimed. Real product accessibility, assistive technology, motion feel/device checks, provider login/model access, and paid generation were not tested. Optional upstream scripts were copied, not executed or certified cross-platform.

Original source collections and Zip were preserved. Presence of optional snapshots is not installation, enablement, authentication, or service usability.

A browser retry after explicit user authorization on 2026-10-23 was also rejected by the in-app browser's origin approval gate. No rendered-browser checks ran; the preview server was stopped. See the native/offline report for the exact attempted origin and outcome.
