# Platform setup and limits

Documentation checked 2026-10-23. Project export is supported; actual UI discovery must be smoke-tested in your installed host/version and policy environment.

| Host | Export directory | Invocation |
|---|---|---|
| Codex | `.agents/skills/<name>/SKILL.md` | `$ui-ux-meta-architect` or the skill selector |
| Claude Code | `.claude/skills/<name>/SKILL.md` | `/ui-ux-meta-architect` or natural-language selection |
| Cursor | `.cursor/skills/<name>/SKILL.md` | Type `/` and select the skill |
| Other Agent Skills host | Its documented skill root | Use that host's selector/import; generic export is only a file layout |
| File-reading agent without skill discovery | Keep the authoring bundle accessible | Explicitly read router and selected peers as manual task instructions |

The setup script uses separate profiles because no single automatic discovery directory is established for every host. Its generic profile emits `.agents/skills`, but that is not a promise that another platform scans it.

Core SKILL.md files use only portable name/description frontmatter. They do not require Claude-only command injection, Codex APIs, Cursor rules, a specific tool namespace, or automatic subagents. Platform exports bring referenced shared files inside each skill's own `resources/`; no symlink or ancestor-shared-folder access is needed. Optional upstream snapshots retain their own metadata and have narrower portability.

## Smoke test

1. Open the actual target project in the host and check its skill selector/list. Follow that host's refresh/restart guidance if needed.
2. Confirm the seven unique core names and no unintended older duplicate identity.
3. Invoke the router for a multi-stage request and a specialist directly for a small task.
4. Ask which instruction file and reference were loaded. Confirm a resource path inside the exported skill resolves.
5. Use an unavailable-provider request and verify it reports the missing capability rather than claiming success.

These steps validate host behavior; passing the file exporter tests alone does not.

Local files do not automatically become cloud/account-synced skills. Cloud/remote sessions need files mounted, committed, imported, or synced using that platform's documented mechanism. Managed policy/workspace trust can restrict discovery or access. Do not infer account-level installation from project exports.

Official sources:

- [Codex: Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Claude Code: Extend Claude with skills](https://code.claude.com/docs/en/skills)
- [Cursor: Agent Skills](https://cursor.com/docs/skills)

For a multi-host project, Codex uses .agents and Claude uses .claude; Cursor also supports compatibility roots. This can surface duplicate names. Review selectors and choose the intended copy rather than claiming the hosts merge instructions automatically.
