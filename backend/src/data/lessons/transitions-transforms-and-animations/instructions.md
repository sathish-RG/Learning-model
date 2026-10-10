## Your mission: bring the page to life

The page is locked; use only transforms, transitions and animations in `styles.css`.

1. **Smooth buttons.** Give `.btn` `transition: transform 200ms ease`. On `.btn:hover`, lift it with `transform: translateY(-4px)`.
2. **A press.** On `.btn:active`, shrink it slightly with `transform: scale(0.95)`.
3. **A playful card.** Give `.card` `transition: transform 300ms ease`, and on `.card:hover` apply `transform: rotate(-2deg) scale(1.03)`.
4. **A spinner.** Create `@keyframes spin` that goes to `rotate(360deg)`, and give `.spinner` `animation: spin 1s linear infinite`.
5. **A message that slides in.** Create `@keyframes slide-in` that goes **from** `opacity: 0` and `transform: translateY(-20px)` **to** normal. Give `.notification` `animation: slide-in 600ms ease-out`.
6. **Be kind.** Add a `prefers-reduced-motion: reduce` media query that turns off all animations and transitions.

✅ **You're done when** the buttons lift smoothly on hover, the card tilts, the spinner spins forever, and the notification slides in when the preview loads.
