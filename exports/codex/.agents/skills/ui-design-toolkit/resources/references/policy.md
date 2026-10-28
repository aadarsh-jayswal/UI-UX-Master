# Context and conflict policy

Apply host instruction authority and actual user authorization. A skill cannot grant tools, override higher-priority instructions, or enlarge the task.

## Select the governing context

1. Preserve explicit user outcomes and binding product decisions.
2. Satisfy applicable accessibility/platform requirements. If a requested treatment conflicts, explain the specific issue and choose a workable treatment; do not claim compliance without evidence.
3. Use current local tokens, components, content, and supported stack before generic preferences.
4. Load only relevant domain/platform guidance. Source opinions are conditional defaults, not laws for unrelated projects.

For an existing product, repetition is a candidate pattern, not proof of canonical intent. For a new product, user constraints and the actual primary task guide initial decisions; mark assumptions rather than inventing audience research or brand facts.

## Creative direction

Promote distinctive design, visual narrative, and expressive interaction as part of UI quality. Brand expression, atmosphere, beauty, and delight are valid outcomes alongside clarity and task completion. For websites and redesigns, actively consider imagery, typography, depth, hover response, transitions, and scroll choreography. Preserve recognizable identity and successful interaction behavior unless the requested direction changes them. Do not equate a plainer, quieter, or more static result with an improvement.

The original experience is evidence: compare its visual storytelling and interactive behavior before replacing them. Where motion is central to the brief, a static substitute or generic fade is a regression unless it achieves the intended outcome through another demonstrated treatment. Keep the scale of changes within the task; creative initiative does not require a separate request for every effect.

## Explicit resolutions

| Source tension | Canonical decision |
|---|---|
| Source discourages decorative motion or custom curves | Animation, ornament, and custom curves are welcome when they support the creative direction. Reuse governing tokens or extend them coherently. No blanket ban applies to effects whose purpose is visual impact or delight. |
| Apple materials, blur, glow, or other rich effects versus rendering cost | Select materials for the product's art direction; Apple-specific conventions apply in context. Preserve contrast and reduced-transparency alternatives. Measure expensive treatments and optimize their implementation rather than assuming a static replacement is better. |
| Short transition recipes versus cinematic or scroll-driven sequences | Feedback should feel immediate; narrative sequences may unfold over longer durations or follow scroll progress. Timing tables are starting points, not caps. Preserve usable controls and interruption behavior. |
| Keyboard or repeated interactions versus expressive feedback | Support keyboard, pointer, and touch with suitable feedback. Repeated or reversible animation is valid when it feels responsive and serves the experience. Keep input available and provide reduced-motion behavior; do not invent usage counts. |
| Transform/opacity-only or never-animate-layout source rules | There is no universal animated-property ban. Choose the technique needed for the effect, then inspect rendering cost and optimize actual bottlenecks. |
| One-shot reveal recipes versus replayable visual narrative | Choose one-shot, replay, reversal, or continuous behavior for the scene's purpose. Scroll-linked storytelling and repeatable hover interactions need not follow a one-shot reveal rule. |
| Prototype glass or layering versus production art direction | Design comparison chrome independently. Adopt product materials and stacking deliberately rather than copying the harness by default. |
| General Sonner recommendation versus component-library-specific toast APIs | Follow the installed base/library contract. Do not add Sonner solely because the generic list mentions it. |
| Audit wants another executor; user already requested fixes | Keep audit read-only. Pass its result to an implementation mode using existing authorization. No compulsory subagent or repeated permission question. |
| Provider website rules suppress visual reinspection; other outputs require it | Never claim visual verification unless inspected. Provider mechanics do not override honest verification or user-requested inspection. |
| Polish recipes give exact values; creative direction welcomes expressive motion | [Polish](polish.md) values govern routine interactive feedback (press, hover, icon swap, enter and exit of small surfaces). Narrative and expressive sequences follow [motion decisions](motion.md). Both keep reduced-motion behaviour and never use an accelerating ease-in to close. |
| Playbook principles versus the project's established system | The [playbook](playbook/index.md) gives defaults and checks; the project's tokens and components win where they are deliberate and consistent. Cite playbook IDs as support, not authority. |
| Backend marketplace compliance claims | Describe the backend workflow; do not certify a listing without platform-specific evidence. |

## Standards and platform specificity

The source accessibility-review's AA quick reference includes WCAG 2.1 criterion 2.5.5, which is Level AAA. Preserve target-size guidance as a recommendation where appropriate, label the criterion correctly, and account for its exceptions. See [W3C 2.5.5](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html). In WCAG 2.2, 2.5.8 Target Size (Minimum) is Level AA (24 by 24 CSS pixels, with spacing and other exceptions); cite it for AA target claims. A requested newer standard needs current authoritative guidance, not an assumed upgrade of this collection's source checklist.

Higgsfield's Quanta/TanStack/Cloudflare restrictions apply only after that provider workflow is selected. Web Motion guidance does not apply to native Reanimated APIs. A source's tool-specific frontmatter does not make those tools available on another host.

This adaptation intentionally replaces absolute taste prescriptions with scoped defaults. Preserve original authorship in the collection's provenance; record product-specific exceptions in the handoff rather than forking another rule catalog.
