# Curated library selection

Adapted from `pick-ui-library`. Use this when the user requests a choice, the task genuinely requires a dependency decision, or the current implementation lacks necessary behavior. Inspect package.json/lockfiles and existing conventions first. Do not churn a working dependency or install anything from a lookup alone. Verify current APIs/compatibility through authoritative docs before implementation.

| Need | Source-list candidate |
|---|---|
| Accessible unstyled interaction primitives | Base UI |
| Command palette | cmdk |
| Toasts in a compatible React project | Sonner; defer to installed component-base contract |
| Verification-code input | input-otp |
| Developer control panel | Leva; dialkit as an alternate |
| Springs/layout/exit/gesture motion | Motion; CSS/WAAPI may suffice for simpler effects |
| Animated numeric values | NumberFlow |
| Animated text | torph |
| 3D globe | Cobe |
| Dynamic OG artwork | Satori |
| Syntax highlighting | Shiki |
| Streaming charts | Liveline |
| General charts | Recharts |
| Drag and drop | dnd kit |
| Virtualization | Virtuoso |
| Shared React state | Zustand |
| Conditional classes | clsx |
| Typed Tailwind variants | cva |
| Theme management in a compatible Next/React stack | next-themes |

Recommend one fit with a task-specific reason; disclose if the requirement is outside the source list. Existing framework/platform constraints can make the entire list inapplicable. If shadcn or another system already owns a component/API, use its native specialist/docs rather than hand-rolling an incompatible substitute.
