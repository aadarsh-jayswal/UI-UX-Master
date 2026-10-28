# Page taxonomy reconciled from both local guides

Both `web_page_taxonomy_guide.md` and `web_page_taxonomy_guide_revised.md` were read completely for this implementation. Their identities/hashes are recorded in provenance. The revised guide supplies the independent dimensions; useful original examples remain covered below. Neither document is an independently invocable skill.

## Independent dimensions

| Dimension | Classifications | Design implication |
|---|---|---|
| Rendering/content delivery | Prebuilt/static generation, server-rendered, client-rendered, hybrid | Loading, freshness, personalization, runtime constraints |
| Navigation | Multi-page, single-page, hybrid | URLs, back/forward, focus/scroll restoration, deep links |
| Purpose/task | Navigation, marketing, commerce, content/support, application/community, system/exception | Primary user goal and information hierarchy |
| Access policy | Public, authenticated, role/permission, entitlement, invitation/link restrictions | Allowed actions, denied/expired states, server enforcement |
| Interface state | Loading, empty, validation/error, success, offline, permission/session | Alternative presentations of a surface, not necessarily separate pages |

Use only dimensions that affect the task. A content inventory may need purpose/access; implementation planning may also need rendering/navigation. Do not infer one dimension from another.

## Purpose coverage from both documents

- Entry/navigation: home/index, section/category/archive, internal search results, directory/listing.
- Marketing/decision: campaign/landing, squeeze/lead capture, pricing/plan comparison, service/feature/solution, case study/portfolio/testimonial.
- Commerce/transaction: product detail, cart/checkout, booking/reservation, order/payment/subscription/return, confirmation/thank-you.
- Information/support: article/blog/news, documentation/tutorial, FAQ/help, contact/support request, about/team/careers, legal/policy, media/resource.
- Application/community: dashboard, record list/detail, create/edit form, reports/tools/workspace, profile/feed/forum, onboarding/setup, settings/preferences/billing, restricted administration.
- Authentication flows: login, registration, recovery, multi-factor verification. Their purpose is authentication; their access policy is recorded separately.
- System/exception: not found, access denied, general error, maintenance/service status.

## Corrections to the original classification

| Original simplification | Canonical interpretation |
|---|---|
| Static content changes only when a developer edits files | Prebuilt content may come from a CMS/database and rebuild on updates; static does not mean manually authored |
| Static/dynamic/SPA/MPA in one architecture list | Rendering and navigation are independent; an SPA can be server-rendered and a site can mix approaches |
| SPA never refreshes; every MPA click discards the document | These are common navigation patterns, not guarantees about every event or framework |
| SERP means the site's internal search page | Say internal search results when that is intended; external search results also use SERP |
| Landing pages remove navigation to force one action | Navigation removal is a context-specific design choice, not a defining rule or automatic recommendation |
| Authentication gateway is an access level; dashboards are necessarily private | Classify authentication by purpose, and actual access policy independently; dashboards/admin/settings may have different permissions |

Example: product detail → commerce purpose; hybrid rendering; MPA with client enhancements; public viewing/account-only actions; states include loading reviews, out-of-stock, and added-to-cart. A dashboard → app purpose; rendering/navigation chosen independently; permissions depend on actual product requirements.

This is a practical working taxonomy, not an exhaustive standard. Product requirements determine runtime/security implementation. Technical framework advice should be checked against that project's actual version and authoritative documentation.
