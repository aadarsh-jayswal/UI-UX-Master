# Evidence-based DESIGN.md

Adapted from `create-design-md`. This mode writes only DESIGN.md. It does not update product code/dependencies or promote accidental styling into product intent.

## Evidence modes

- **Repository:** Choose one product. Inspect existing accepted guidance, active theme/tokens, shared primitives/variants, and actual runtime consumers. Exclude unused examples, migrations, generated registries, and other applications. Trace source → owner → consumer.
- **URL reconstruction:** Requires rendered browser access to DOM, computed styles, and loaded CSS at relevant desktop/mobile widths. A screenshot alone cannot establish exact values. Sample distinct templates for site-wide rules; label output reconstructed and scope page-only observations accordingly.

For each candidate record role, value, source, scope, recurrence, confidence, and implementation consequence. Omit unsupported claims. Do not invent brand personality, hidden token ownership, rationale, or semantic aliases solely to organize values. Existing accepted decisions remain unless user/current governing evidence replaces them.

## Schema and validation

Check the currently available `@google/design.md` specification before encoding themes or an unfamiliar field. Use its canonical schema, not a fork. Choose export target: css-tailwind for Tailwind v4, json-tailwind for v3, otherwise an appropriate supported interchange such as dtcg. Tool access/network/package execution remains subject to actual authorization and host capability.

Minimal document:

```yaml
---
version: alpha
name: Product name
description: Evidence-backed purpose
---
```

Add colors, typography, rounded, spacing, and components only from supported named roles. Mappings, not arbitrary arrays or nested source objects. Typography scales map canonical properties such as fontFamily/fontSize/lineHeight/fontWeight/letterSpacing; `typography.mono.fontFamily` is valid shape, scalar `typography.mono` is not. A single governing radius may normalize to `rounded.base`; do not invent derived steps. Keep color names flat and export-safe. Theme syntax follows the installed spec; if unsupported, retain alternate values in a clearly documentary Themes table.

Overview states evidenced product purpose/presentation; add only supported sections in order: Colors, Themes, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. Prose must change an implementation decision rather than restate a token inventory. Keep audit notes/conflicts outside the document.

Run the available equivalent of:

```text
npx @google/design.md lint DESIGN.md
npx @google/design.md export --format css-tailwind DESIGN.md
```

Substitute the selected format and project runner. Inspect emitted token families, not merely exit status. Colors/font/radius/spacing information that silently disappears indicates schema/export trouble. On update compare prior accepted decisions using the tool's diff when available. Do not retain unwanted export files. If tooling is unavailable, report a draft as unvalidated; never call it validated or silently discard supported information to pass a tool.
