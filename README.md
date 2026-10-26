# UI-UX Master

Version 2.0.1 of the UI/UX Meta Architect collection, rebuilt on its seven-skill architecture with the strengths of two other collections folded in as shared references, not new skills:

- **From ui-ux-principles:** The UI/UX Playbook catalogue of 90 principles with stable IDs and a task router (`shared/references/playbook/`), the rendered-UI audit script, and an optional image pack (`ui-ux-playbook-visuals`, 125 source crops and 8 recreated illustrations).
- **From jmo-skills:** better-ui polish recipes with exact values (`shared/references/polish.md`, MIT, Jakub Krehel), and clear-writing and discovery-interview procedures re-authored from `ste` and `interview` (MIT, Johnathan Mo).
- **New:** a [quality bar](shared/references/quality-bar.md) per deliverable category, written from the failures graders penalised in blind comparisons, plus Node scripts: `contrast.mjs` (text and 3:1 non-text contrast) and `page-eval.mjs` (headless Chrome at a true viewport width, reduced motion, real key events, audit, screenshots).

Every source file merged in is recorded with its hash in [provenance/merged-sources.json](provenance/merged-sources.json); the validator fails on drift. Package it as a Codex and Claude Code plugin with `npm run export:plugin` (writes `../ui-ux-master-marketplace`).

The base collection: **one router, six core specialists, twelve optional integrations**. It consolidates 50 source definitions into 37 identities, excluding 13 exact duplicate copies from activation. See [start here](START-HERE.md), [architecture](docs/ARCHITECTURE.md), [source map](provenance/sources.json), and [validation status](docs/VALIDATION.md).

The creative direction actively supports distinctive styling, visual narrative, and expressive animation. Design and redesign work should develop brand identity, imagery, hover response, and motion alongside usability. The [context policy](shared/references/policy.md) takes precedence over restrictive aesthetic opinions in preserved upstream recipes; accessibility, responsive input, and measured performance remain part of delivery.

## Use in a project

From this folder, preview a platform export:

```text
node scripts/setup.mjs --platform codex --project "D:/YourProject"
node scripts/setup.mjs --platform claude --project "D:/YourProject"
node scripts/setup.mjs --platform cursor --project "D:/YourProject"
```

Choose one platform command. Add `--apply` to create files. Default is a dry run. Existing changed/extra same-named skill files are refused before any write; identical exports are skipped. Source collection files, host settings, credentials, installed plugins, and MCP configurations are not changed. The utility exports project skills only; it does not install software.

Example actual export:

```text
node scripts/setup.mjs --platform claude --project "D:/YourProject" --apply
```

On macOS/Linux substitute your project path; the same Node scripts and relative resource links work. No Bash/Python/PowerShell-specific command is required by core instructions. Node 20+ is the only utility prerequisite, with no npm install step.

Generated platform exports already exist in `exports/` for manual copying. Each exported skill contains only its reachable shared resources and applicable license notices, so it does not depend on the authoring bundle's original path. Edit canonical `skills/` and `shared/`, not generated copies. For an update, export into a fresh directory and compare/adopt deliberately; there is no force-overwrite flag.

## Optional integrations

List: shadcn, migrate-radix-to-base, write-swift, and eight actual Higgsfield skills. Select only those needed:

```text
node scripts/setup.mjs --platform codex --project "D:/YourProject" --optional shadcn,migrate-radix-to-base --apply
```

Snapshots retain upstream resources and identities. They may require vendor tools, Bash/Python, a compatible platform, credentials, paid model access, or installed libraries. Exporting a snapshot does not satisfy those requirements. No missing higgsfield-game-generation definition is invented. See [integration contracts](shared/references/integrations.md).

## Maintenance

```text
node scripts/validate.mjs
node --test tests/portability.test.mjs tests/picker-logic.test.mjs
```

Optional source-hash verification, on the original machine:

```text
node scripts/validate.mjs --source-root "D:/Study/GenAI/Skills/UI-UX"
```

To deliberately refresh source provenance/snapshots after reviewing upstream changes:

```text
node scripts/capture-sources.mjs --source-root "D:/Study/GenAI/Skills/UI-UX"
```

Capture reads only the five named original source roots and two .plugin packages, skips Zip/dependencies/build/cache/VCS, and writes inside this bundle. Source count/hash drift must be reviewed; byte-diverged formerly duplicate skills are rejected. Re-export into fresh directories after canonical changes.

## Discovery and verification

Core frontmatter contains portable name/description only. Seven peer directories are exported to each host's documented root. The router is optional for focused tasks; references do not activate skills or spawn agents. Actual discovery and model behavior still require a smoke test in each installed host. See [platform guide](docs/PLATFORMS.md) and [scenario evaluations](evals/scenarios.json).

If you use Claude and Codex in the same project, each needs its own documented root; Cursor may also discover compatible roots. Avoid maintaining divergent same-name copies and check the actual selector for duplicates. Use one intended active copy per host/scope.

## Attribution

See [third-party notices](THIRD-PARTY-NOTICES.md) and `licenses/`. This private working collection preserves known constituent notices and does not invent a blanket license for undocumented source material. Both taxonomy documents were read, retained in provenance, and reconciled.
