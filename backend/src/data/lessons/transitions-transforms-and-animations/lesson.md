## Why does this matter?

Small movements make an interface feel alive and help people understand what's happening: a button that lifts when you hover, a spinner while something loads, a message that slides in. Used well, motion makes apps feel friendly and polished.

## Transforms: moving a sticker on glass 🪟

A transform moves, turns or resizes an element **without disturbing anything around it**, like sliding a sticker across a window. The rest of the page doesn't move.

```css
transform: translateY(-4px);   /* move up 4px */
transform: scale(1.05);        /* 5% bigger */
transform: rotate(-2deg);      /* tilt slightly */
transform: rotate(-2deg) scale(1.05);   /* several at once */
```

## Transitions: a dimmer switch 💡

Without a transition, a change happens instantly, like flicking a light switch. A **transition** makes it smooth, like turning a dimmer:

```css
.button {
  transition: transform 200ms ease;
}

.button:hover {
  transform: translateY(-4px);
}
```

You set the transition on the **normal** state, and it then works in both directions: hovering and un-hovering.

A transition needs:

- **what** to animate (`transform`, `background-color`, or `all`)
- **how long** (`200ms` = 0.2 seconds; most interface motion is 150–300ms)
- **how it speeds up and slows down** (the timing function): `ease`, `ease-in-out` or `linear`

## Animations: a flipbook 📖

A transition goes from A to B when something changes. An **animation** can run by itself, loop forever, and have many steps. Think of a flipbook: you draw the key pages, and the browser draws everything in between.

Draw the key pages with `@keyframes`, then play them with `animation`:

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

`animation` takes the keyframes' name, the duration, the timing, and how many times to play (`infinite` = forever). You can also use percentages for more steps: `0%`, `50%`, `100%`.

## Keep it smooth and kind 🙏

- **Animate `transform` and `opacity` when you can.** Browsers can move these very smoothly. Animating `width` or `top` is slower and can stutter.
- **Respect people who prefer less motion.** Some people feel dizzy or sick from movement. Their device can ask for reduced motion, and you should listen:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none;
    transition: none;
  }
}
```

## Remember ✅

- `transform` moves, scales and rotates an element without affecting the layout.
- `transition` smooths a change between two states; set it on the normal state.
- `@keyframes` + `animation` play a flipbook, which can loop with `infinite`.
- Prefer animating `transform` and `opacity`, and respect `prefers-reduced-motion`.
