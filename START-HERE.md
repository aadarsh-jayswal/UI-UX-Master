# Start here

This folder is the ui-ux-master collection (2.0.0). It contains one router and six independently usable specialists. Each one applies the [quality bar](shared/references/quality-bar.md) and can run the measurement scripts in `shared/scripts/` (Node 22+; `page-eval.mjs` also needs Chrome or Edge).

As a plugin: run `npm run export:plugin`, then add `../ui-ux-master-marketplace` as a local marketplace in Codex or Claude Code and install `ui-ux-master`. Existing source folders outside it have not been moved or overwritten.

## Fastest path

Use a ready-to-copy export under `exports/`:

- `exports/codex/.agents/skills/` → your project's `.agents/skills/`
- `exports/claude/.claude/skills/` → your project's `.claude/skills/`
- `exports/cursor/.cursor/skills/` → your project's `.cursor/skills/`

Copy each of the seven complete skill folders, including its `resources/`, notices, and licenses. Do not copy only SKILL.md. Inspect any existing same-named skills before merging; the setup utility refuses changed collisions.

For repeatable setup use the commands in [README](README.md) and [platform guide](docs/PLATFORMS.md). No Python or npm dependencies are needed for export/validation; Node 20+ is needed only to run these utilities. Core instruction use needs a file-reading agent, not Node.

## First prompt

After the host discovers the skills, select `ui-ux-meta-architect` and ask:

> Review this project's UI conventions, then help me improve this specific screen. Use the smallest sufficient workflow and tell me what evidence or access is missing.

For a direct fix, select `ui-design-toolkit`, `fixing-accessibility`, or `animate` as appropriate. Use your host's own selector/invocation syntax.

For a host without native skill discovery:

> Read `skills/ui-ux-meta-architect/SKILL.md` in this collection. Follow its routing instructions, manually reading only the necessary peer SKILL.md and linked references. Treat this as manual instruction loading, not a claim that skills or tools have been installed. My task is: [describe the task].

Point the host at the actual folder location or attach the required files. A host without filesystem/attachment access cannot use local files merely from a path string. Other platforms need their documented import/discovery mechanism; universal automatic discovery is not claimed.

Optional provider/platform skills are packaged under `integrations/skills/` and are not activated by default. They still need their documented tools, credentials, OS/shell, services, and authorization.
