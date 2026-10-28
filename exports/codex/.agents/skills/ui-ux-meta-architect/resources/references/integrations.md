# Optional integration contracts

No integration is enabled by the core collection. Installation, discovery, authentication, model access, credentials, and successful execution are separate states. The package contains optional upstream snapshots under `integrations/skills/`; use setup's explicit `--optional` selection to export one. Never infer a tool connection from a Markdown file. Core mode execution does not require these snapshots.

| Existing identity | Activate for | Input → output | Requirements and boundaries |
|---|---|---|---|
| shadcn | Actual shadcn components/registries/presets | Project/task → components/configuration | Compatible runner, components.json/context, docs/registry access. Follow current base-specific API; no implicit preset overwrite. |
| migrate-radix-to-base | Explicit Radix→Base UI migration | Components/consumers → migrated code/reports | Git/clean branch workflow, package manager, types/build, registry references. Preserve customization; report behavior changes and unsupported parts. |
| write-swift | Swift coding/concurrency/debugging | Source/problem → code/review | Compatible Swift toolchain and platform tooling. Source flags baseline/future features; verify actual compiler before using them. |
| higgsfield-generate | General media/ad production or finished-video scoring | Brief/media → assets/report | CLI, auth/workspace, credits/model availability, media inputs. No provider substitution or spent credits without task authorization. |
| higgsfield-soul-id | Reusable personal identity training | 5–20 face photos/name → identity reference | Documented Basic+ plan; authenticated service. Persistent training differs from a face edit. |
| higgsfield-product-photoshoot | Branded product photography | Brief/product reference → coordinated images | Dedicated enhancement/generation backend; prefer faithful product reference. |
| higgsfield-marketplace-cards | Listing main/secondary/A+ image bundles | Product/listing facts → image set | Marketplace backend/scopes. Backend compliance templates do not independently certify a listing. |
| higgsfield-brandkit | Identity, approved brand assets, editable brandbook | Brief/official assets → brand system/applications | CLI, Python and stage-specific render/export/font tools. Preserve approval state and exact official assets. |
| higgsfield-websites | Chosen Higgsfield site/app/game lifecycle | Build/edit request → live product | CLI, Git, Bun, provider runtime/access. Deploy is live public immediately; separate feed listing from deploy. Quanta is app-specific, not a general UI default. |
| higgsfield-video-explainer | Illustrated narrated explainer | Topic/source/choices → assembled MP4 | Presets, voices, generation/assembly services; ordered audio/video pairing and factual sources. |
| higgsfield-youtube-thumbnail | Truthful video covers | Brief/face/logo references → cover variants | Generation service; canvas for flattened overlays; inspect before claiming visual fidelity. |

Each survives separately as an existing optional specialist because it owns a specific library/toolchain, backend job contract, persistent state, or assembly workflow that the core skill cannot execute by generic UI advice. No new wrapper skills are created. Exact upstream identities and licenses remain in provenance. Snapshots are a starting point, not a claim of current service compatibility.

## Selection and fallback

Use the host's actual discovered identity/path first. If explicitly manually loading a snapshot, state that it is manual loading, inspect its requirements, and do not claim native discovery. Provider snapshots may contain Bash/Python or host-specific frontmatter; those are not portable guarantees. Check supported shell/OS and tools before executing. Installers do not install dependencies, connect MCP, log in, or run snapshot scripts.

If unavailable, name the missing capability and complete independent brief/specification work. Ask for missing access only when necessary; offer another available route only with equivalent scope and without silently replacing the user's chosen service. Do not ask users to paste tokens into chat.

Design connector categories (Figma/design, feedback, analytics, knowledge base, tracker) can enrich core workflows using actual connected tools. Do not copy the source's empty Gmail/Calendar endpoints. External publication, ticket creation, and messaging require actual user authorization. Connector names do not make them available.

Higgsfield documentation mentions `higgsfield-game-generation`, but no definition exists in the scanned scope. It is not packaged or invented. The existing higgsfield-websites snapshot carries its documented game branch. Some generation text still refers to the missing skill; route actual game requests through the website branch only when its prerequisites are available.
