# Web Page Taxonomy Guide

A web page can be classified along several independent dimensions. A single page may have one label from each dimension—for example, a public product page may be statically generated, use client-side navigation, and serve an e-commerce purpose. The categories below are practical labels, not a universal or exhaustive standard.

## 1. Rendering and Content Delivery

This dimension describes when and where the page's HTML and data are produced. These approaches can be combined on the same site, route, or even page.

- **Prebuilt or statically generated:** HTML is produced ahead of a visitor's request, often at build time or when content is updated, then served from a web server or CDN. Content can come from a CMS or database; it does not have to be hand-edited HTML.
- **Server-rendered:** The server produces HTML in response to a request. It may use the URL, current data, or the visitor's session to shape the response.
- **Client-rendered:** The browser's JavaScript builds or updates much of the page after loading data or an initial shell.
- **Hybrid or partially rendered:** A page combines approaches, such as server-rendered content with interactive browser components, or prebuilt content with personalized data loaded later.

These labels describe rendering, not whether the site is an SPA or MPA. Modern frameworks commonly combine static, server, and client rendering strategies on the same site. [Next.js rendering documentation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)

## 2. Navigation Model

This dimension describes how users move between views and URLs.

- **Multi-page application (MPA):** Navigation commonly requests a new HTML document from the server.
- **Single-page application (SPA):** The browser loads an application document and JavaScript updates the view during many navigations without a full document reload.
- **Hybrid navigation:** Some routes or navigations use client-side transitions while others load a new document.

An SPA can still update the address bar and support distinct URLs. Avoid defining it as a site that “never refreshes”: full reloads can still happen. [MDN: Single-page application](https://developer.mozilla.org/en-US/docs/Glossary/SPA)

## 3. Page Purpose or User Task

Purpose labels describe what a page helps a visitor do. A page may serve more than one purpose.

### Entry and Navigation

- **Homepage:** Introduces the site or organization and points to key areas.
- **Section or category page:** Groups related items or content, such as a product category or news archive.
- **Internal search results:** Shows results from a site's own search feature. “Search engine results page” can also mean results from an external search engine, so specify which one.
- **Directory or listing page:** Presents a browsable set of people, services, locations, products, or records.

### Marketing and Decision Support

- **Campaign or landing page:** Supports a campaign or focused task. It may simplify navigation, but removing navigation is a design choice rather than a defining requirement.
- **Lead capture page:** Invites a visitor to share contact details, often in exchange for a resource or follow-up.
- **Pricing or plan comparison:** Explains costs, tiers, or entitlements to help a visitor choose.
- **Service, feature, or solution page:** Explains an organization's offering.
- **Case study, portfolio, or testimonial page:** Provides examples or evidence to support a decision.

### Commerce and Transactions

- **Product or offer detail page:** Describes an item or offer and supports actions such as purchase, booking, or adding to a cart.
- **Cart and checkout:** Lets a visitor review an order and provide the information needed to complete it.
- **Booking or reservation flow:** Lets a visitor choose availability and submit a reservation.
- **Order, payment, subscription, and return pages:** Supports transactions before or after purchase.
- **Confirmation page:** Confirms an action such as an order, booking, registration, or form submission.

### Information, Support, and Learning

- **Article, blog post, or news page:** Presents editorial or educational content.
- **Documentation or tutorial:** Explains how to use a product, service, or process.
- **Help, FAQ, or troubleshooting page:** Answers support questions.
- **Contact or support request page:** Provides contact details or collects a request.
- **About, team, careers, or organization page:** Describes the organization and its people or opportunities.
- **Legal and policy pages:** Includes privacy notices, terms, accessibility statements, and related policies.
- **Media or resource page:** Presents a gallery, video, audio, download, or resource collection.

### Application and Community

- **Dashboard or overview:** Summarizes a user's data, activity, or tasks.
- **Record list and detail:** Lets a user find and inspect application records.
- **Create or edit form:** Collects or updates information.
- **Reports, tools, or workspace:** Provides analysis, configuration, editing, or other task-specific functionality.
- **Profile, feed, forum, or discussion:** Supports identity, sharing, and community participation.
- **Onboarding or setup:** Helps a user configure an account or begin using a service.

### System and Exception Pages

- **Not found (404), access denied, or error page:** Explains why a requested page or action is unavailable.
- **Maintenance or service status page:** Communicates planned maintenance or service health.

## 4. Access Policy

This dimension describes who can view or use the page. Authentication means verifying identity; authorization determines what an identified user is allowed to access. [MDN: Authentication](https://developer.mozilla.org/en-US/docs/Web/Security/Authentication)

- **Public:** Available without signing in.
- **Authenticated:** Requires a signed-in account.
- **Role or permission restricted:** Available only to selected roles, teams, owners, or administrators.
- **Entitlement restricted:** Requires a subscription, purchase, enrollment, or other entitlement.
- **Invitation or link restricted:** Available to invited people or holders of a specific link, subject to the site's policy.

A page can have multiple access requirements. For example, a course page might require both sign-in and enrollment. Login, registration, password recovery, and multi-factor verification are **authentication-flow pages**; classify their purpose here and record their access policy separately.

## 5. Interface State (Optional)

Record important states when the classification will be used for design, implementation, or testing. These are usually states of a page or component, not separate page purposes.

- Loading or processing
- Empty or first-use state
- Validation error or failed submission
- Success or confirmation
- Offline or unavailable data
- Permission denied or expired session

## Example

A product detail page might be classified as:

- **Purpose:** Commerce → product detail
- **Rendering:** Hybrid
- **Navigation:** MPA with client-side enhancements
- **Access:** Public, with account-only actions
- **States:** Loading reviews, out of stock, added to cart

Use only the dimensions relevant to the project. For a simple content inventory, purpose and access may be enough; for implementation planning, include rendering and navigation too.
