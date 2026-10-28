# Validation status

## ui-ux-master 2.1.0 — 2026-10-27

Guidance changes from the held-out blind test (`../plugin-comparison/heldout-isolated-5a2a125781e5` and `../plugin-comparison/heldout-regrade`), where 2.0.1 ranked first but repeatedly missed required states and used citations readers could not look up:

- **Quality bar, all outputs:** list the required states from the brief and the pattern before building or judging, and write checks from that list. The pattern defaults are a non-colour selected cue, inert controls while paused, and timers that pause on hover and focus (WCAG 2.2.1). Make the smallest visible change when "keep the look" conflicts with a required fix. Cite public sources (WCAG number and level) in reader-facing work, not playbook IDs. Use verification tables only for work that ran.
- **Quality bar, per category:**
  - Review: prototype wiring becomes a note; `inputmode`, `autocomplete` and delivery estimates; spacing changes cover every group.
  - Accessibility: whole-pattern contract and focusable panels.
  - UI build: suspended controls inert; change count separate from save status.
  - Design spec: collection, duplicate, limit, offline, cancel, touch-path and consistency checks.
  - Scoped edit: real characters per line, `clamp()` headings, wrapping.
  - Explanation: every applicable criterion with level and threshold; caveats of alternatives.
  - Motion: behaviour contract first, plus full toast rules.
  - Research: per-task outcome table with "Not attempted", severity-first ranking, concrete patterns.
- **Templates:** `findings.md` replaces `Basis`/`Confidence` with a `Standard` column. `research-report.md` adds a task-outcomes table and concrete-pattern guidance.
- **References:** `motion.md` adds a behaviour-contract section. `accessibility.md` adds stateful-widget and timing rows plus whole-pattern remediation. `improve-ui/SKILL.md` drops basis IDs and confidence from reports.
- **Playbook index:** the playbook index sentence on citing IDs is rewritten through `scripts/import-sources.mjs`, and its ledger hash is updated.

Checked: `node scripts/validate.mjs` has no errors, and `npm test` passed 33 of 33. One Chrome audit test failed once and then passed on three re-runs. **Not re-evaluated:** these rules target the held-out failures, so h1–h8 can no longer give a fair score. A new held-out task set is needed.

## ui-ux-master 2.0.0 and 2.0.1 — 2026-10-26

Checked on Windows with Node 22 and Chrome:

- `node scripts/validate.mjs`: no errors. The validator now also checks the merged-source ledger (`provenance/merged-sources.json`), fails on any hash drift, and confirms that every core skill links the quality bar.
- `npm test`: **33 passed, 0 failed**. The 11 new tests in `tests/master.test.mjs` cover:
  - WCAG reference values for contrast;
  - that the audit script parses;
  - that the plugin export is portable, with the quality bar and scripts in each skill and 133 images in the visuals pack;
  - that every script-detectable planted flaw is found in the 4 copied fixtures at their stated viewport;
  - non-text contrast, target size and accessible names;
  - real key events in a dialog;
  - reduced motion and a true 320px width;
  - text on a positioned highlight not being misreported.
- `npm run export:plugin` builds `../ui-ux-master-marketplace`. `claude plugin validate` passed for the marketplace and the plugin. The plugin is installed at user scope in Claude Code (2.0.1, enabled) and in Codex (`ui-ux-master@ui-ux-master-local`, 2.0.1).
- **Blind four-way comparison** against ui-ux-principles, ui-ux-meta-architect and jmo-skills on the 8-task set: 2.0.0 ranked first in all 16 judgements, with an overall mean of 9.03 against 8.23–8.38 for the others. No category reached 10. See `../plugin-comparison/COMPARISON.md`, round 3. The quality bar was written from earlier rounds' grader penalties on the same tasks, so these scores are not a held-out result.
- 2.0.1 adds quality-bar rules for the flaws graders still found and fixes an audit false positive. It has not been re-evaluated.

Not verified: model routing in a live Claude Code or Codex session after install (a restart is needed), macOS and Linux, real screen readers, and performance on tasks outside the 8-task set.

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
