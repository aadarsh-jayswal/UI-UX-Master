# React Native / Expo motion profile

Read [shared decisions](motion.md), then the relevant [Expo recipes](expo-recipes.md). The source recipes are a versioned snapshot. Verify current SDK/library contracts rather than automatically adding or replacing packages.

Source stack: Reanimated/worklets, Gesture Handler, Expo Router, expo-haptics; optional keyboard-controller, Lottie, or Skia for a concrete need. Use the project's compatible installation mechanism. Reanimated 4's New Architecture/setup assumptions must match the project; do not prescribe them to an earlier incompatible app.

Keep continuous gestures and animation work in the appropriate UI runtime. Avoid per-frame React setState or scheduling RN-runtime callbacks every update. Use current shared-value/worklet APIs; schedule business logic at meaningful thresholds/commit events. Preserve velocity and allow interrupted/reversed gestures. Use native navigation/sheet/tab components where they provide the required behavior instead of recreating them in JS.

No hover on touch. Give immediate press-in feedback, commit on the appropriate release action, support cancellation and usable touch targets/hit slop. Use platform-specific units/guidance. Haptics are optional, paired with visual feedback, and aligned to the causal event rather than every frame; hardware/settings can suppress them.

Develop expressive transitions, gestures, imagery, and visual storytelling using tools suited to the product. Transform/opacity, layout animation, Lottie, Skia, and material effects are available according to the intended experience and compatible runtime. Profile complex size, elevation, or blur animation on representative devices; optimize actual bottlenecks while retaining the direction. Respect text scaling and keyboard movement; hardcoded dimensions can fail at large text. Reduced motion should retain content and feedback through a suitable lower-motion alternative.

Verify release builds on representative physical devices where available. Gesture velocity, haptic timing, and slow-device feel remain unverified when only a simulator/source review was possible.
