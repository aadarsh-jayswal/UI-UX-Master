# Sonner implementation reference

Load only for actual Sonner work. Adapted from `ask-sonner`; load the preserved [full API reference](sonner-api.md) when exact props/defaults are needed, and confirm them against the installed version.

Mount one `Toaster` near the application root, outside clipping/stacking containers. Call `toast()` from client event handlers/callbacks; server actions should return results for client notification. A second toaster can duplicate messages unless intentionally identified/targeted.

| Goal | Pattern |
|---|---|
| Plain/status message | `toast(...)`, `toast.success/error/info/warning(...)` |
| Managed loading | `const id = toast.loading(...)`; update with the same id |
| Promise status | `toast.promise(promise, { loading, success, error })` |
| Persistent/dismissal | duration Infinity where justified; `toast.dismiss(id)` |
| Custom content with shell | JSX message/description |
| Design-system custom surface | `toast.custom(...)` with explicit semantics |
| Multiple toasters | Distinct ids and targeted toasterId according to installed API |

Escalate styling only as needed: defaults → inline options → part classes → headless design-system component. Default injected styles may win the cascade; do not accumulate blanket important overrides when a headless component is clearer. Theme must be set explicitly or connected to the actual theme provider; do not assume it tracks the OS.

Troubleshoot root mounting, StrictMode/effect duplication, stable toast IDs, lost/incompatible stylesheet injection, ancestor stacking/clipping, unresolved promises, persistent options, and multiple-toaster targeting. Do not use toasts as the only delivery of critical field errors. Check keyboard/action labels, reduced motion where applicable, and screen-reader announcements without claiming they were tested from source alone.
