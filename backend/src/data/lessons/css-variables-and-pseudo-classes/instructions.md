## Your mission: a themeable settings page

The page is locked; use variables, pseudo-classes and pseudo-elements in `styles.css`.

1. **The palette.** On `:root`, define these variables:
   - `--bg: hsl(0 0% 100%)`
   - `--text: hsl(220 15% 15%)`
   - `--brand: hsl(260 70% 55%)`
   - `--radius: 12px`
2. **Use the palette.** Give `body` `background-color: var(--bg)` and `color: var(--text)`. Give `.button` `background-color: var(--brand)` and `border-radius: var(--radius)`.
3. **Dark mode, no JavaScript.** Write a rule for `:root:has(#dark-mode:checked)` that changes `--bg` to `hsl(220 20% 10%)` and `--text` to `hsl(220 15% 90%)`. Tick the checkbox in the preview to try it!
4. **Button states.** On `.button:hover`, change the background to `hsl(260 70% 45%)`. On `.button:focus-visible`, add `outline: 3px solid var(--brand)` and `outline-offset: 3px`.
5. **Form feedback.** Give `input:invalid` a `border-color` of `crimson`, and `input:valid` a `border-color` of `seagreen`.
6. **Zebra stripes.** Give every even item in `.settings li` (use `:nth-child(even)`) the background `hsl(260 40% 96%)`.
7. **A decoration.** Use `.tip::before` to add `"💡 "` in front of the tip.

✅ **You're done when** ticking "Dark mode" switches the whole page to dark, the button changes on hover and shows an outline when you Tab to it, the email box turns green once valid, and the list has stripes.
