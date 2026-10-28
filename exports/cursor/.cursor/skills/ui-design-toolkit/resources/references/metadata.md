# Metadata review and repair

Adapted from `fixing-metadata`. Use the project's current head/metadata API; do not migrate SEO libraries to perform a narrow fix.

1. Identify affected public/private/staging pages and the actual owner of metadata. Avoid duplicate competing title/description/canonical/robots systems.
2. Verify useful stable titles, plain-text descriptions for searchable/shareable pages, canonical URLs, and indexing intent. Publicness and authentication are product policies, not guesses based on filename.
3. Align canonical with Open Graph URL. Use absolute stable image URLs, intentional card type, correct dimensions/aspect for the chosen destination, and current platform documentation when needed.
4. Check favicons and relevant touch/app icons, valid referenced manifest, and theme color.
5. Add structured data only when it accurately represents rendered content. Do not invent ratings, prices, reviews, or organizations.
6. For localized pages, verify actual language/locale and alternate URLs; avoid hreflang entries for nonexistent pages.
7. Escape dynamic strings and keep values deterministic. Protect staging/preview indexing according to actual deployment intent.

Verify emitted head output and a real reachable URL when claiming a social preview works; localhost checks alone do not prove remote fetch behavior. Source-only checks are useful but must be labeled. Keep diffs scoped to metadata and report inaccessible external preview tools.
