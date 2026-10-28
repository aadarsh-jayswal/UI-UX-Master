# Findings

Lead with a one- or two-sentence verdict. Then:

- Surface, mode and assumptions that change severity (for example desktop-first, internal tool):
- Governing sources and evidence types (code, render at stated widths, screenshot, description):
- Creative goals and their priority, including visual narrative or interaction when relevant:
- For redesign comparisons: retained or lost brand identity, motion, and tested hover/focus/touch/scroll behaviour:

| # | Severity | Location | Issue and user impact | Before | After (exact values) | Standard |
|---|---|---|---|---|---|---|

- Severity: Blocker, High, Medium, Low. Order rows by user impact, blockers first. List prototype wiring gaps on a static page as notes below the table, not as rows.
- One issue per row; deduplicate root causes but never merge distinct problems. Keep cells short.
- Standard: a public criterion the reader can look up, such as `WCAG 1.4.11 Non-text Contrast (AA)`, or a dash when none applies. Do not put internal playbook IDs here; the user impact is the justification.
- After: a concrete correction (CSS, copy, size, colour with measured ratio), not a slogan.
- When a finding is a judgement rather than a measurement or rendered observation, say so in its Issue cell ("judgement: …"); do not add a confidence column.

## Verification

Only for checks that ran (renders, scripts, contrast, keyboard). Omit rows for reading or re-reading files.

| Check | Method | Result |
|---|---|---|

## Not verified

List each check that was not run and what would verify it.

**Verdict:** Block or Approve, with the one-line reason.

Record counterevidence and intentional exceptions when relevant. No supported findings is a valid outcome. An audit report does not authorize implementation.
