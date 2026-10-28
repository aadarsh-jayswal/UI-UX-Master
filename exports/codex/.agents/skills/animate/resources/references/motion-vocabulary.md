# Motion vocabulary

Naming lookup adapted from animation-vocabulary. Return the closest term first with a short description; add alternatives only when needed to distinguish intent. Naming does not initiate implementation.

| Term | Meaning |
|---|---|
| Fade | Change opacity to appear/disappear |
| Slide / translate | Move along an axis |
| Scale-in / pop-in | Grow into place; pop-in includes a small overshoot |
| Reveal | Uncover content with clipping/masking |
| Stagger | Offset a group's item timings into a cascade |
| Orchestration | Coordinate multiple effects as one sequence |
| Keyframes / tween | Specified points / interpolated values between points |
| Morph | Change shape continuously |
| Crossfade | Overlap one state's fade-out with another's fade-in |
| Shared-element transition | Connect one element's location/shape across views |
| Layout animation | Animate a change in position/size after layout changes |
| Origin-aware animation | Start a transformation at its trigger/source |
| Direction-aware transition | Movement direction reflects forward/back navigation |
| Scroll reveal / scroll-driven | Trigger at visibility / progress tied to scroll position |
| Parallax | Layers move at different rates to imply depth |
| View transition | Browser-managed connection between rendered states |
| Press feedback | Immediate response to a press |
| Hold-to-confirm | Progress over a deliberate sustained press |
| Swipe-to-dismiss / reorder | Gesture removes or changes an item's position |
| Rubber-banding | Increasing resistance and return beyond a boundary |
| Spring | Physics-like motion toward a target |
| Damping / stiffness / mass | Parameters controlling oscillation, force, and inertia |
| Velocity / momentum | Current movement rate / continued motion after input |
| Interruptibility | Retarget/reverse without resetting or locking input |
| Easing | How progression speeds up/slows down |
| Ease-out / ease-in-out / linear | Fast-to-slow / slow-fast-slow / constant progression |
| Asymmetric timing | Different timing for deliberate action versus response |
| Marquee / pulse / float / orbit | Continuous scrolling / repeating emphasis / drifting / circular motion |
| Clip-path / mask | Hard geometric clipping / potentially soft transparency control |
| Line drawing | Reveal an SVG path progressively |
| Number ticker / text morph | Transition changed numeric digits / text characters |
| Skeleton / shimmer | Loading structure / moving sheen on it |
| Jank / dropped frame | Perceptible stutter / missed display deadline |
| Compositing / layout thrashing | Combine rendered layers / costly repeated layout reads-writes |
| Reduced motion | Alternative behavior aligned with the user's motion preference |

For an effect outside this compact list, consult the preserved full [source glossary](vocabulary-source.md) rather than inventing an authoritative term. Say when a match is approximate. Technical browser/framework implementation claims require current documentation, not a vocabulary definition.
