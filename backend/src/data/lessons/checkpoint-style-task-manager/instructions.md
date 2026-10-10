## Your mission: style Task Manager Pro

Turn the plain Task Manager Pro page into a modern, responsive app, writing only in `styles.css`. Work through the checklist in order.

1. **Foundations** *(Lessons 11, 12, 17).*
   - Set `box-sizing: border-box` on everything.
   - On `:root`, define variables for at least a background, a text color, a brand color, a card color and a border radius.
   - Give `body` a font (`system-ui, sans-serif`), your colors and a comfortable `line-height`.
2. **Page layout** *(Lessons 15, 16).*
   - Make `body` a grid, with `grid-template-areas` stacking header, main, sidebar and footer in **one column**.
   - In a media query for screens at least `640px` wide, put `main` and the `aside` **side by side** (the main area wider than the sidebar).
3. **Header** *(Lessons 13, 14).* Make `.site-header` a flex row with the logo and title on the left and the menu on the right, vertically centered. Make it sticky at the top. Lay the menu links out in a row with a gap, and make the logo round.
4. **Cards** *(Lesson 12).* Give each `.card` a background, padding, a border and rounded corners using your variables.
5. **Task list** *(Lessons 14, 17).* Remove the bullets, make each task a flex row with a gap, and add zebra stripes (or a hover color) to the tasks.
6. **Form** *(Lessons 12, 17, 18).*
   - Make text fields, the date, the select and the textarea full width, with padding and a border.
   - Give fields a clear `:focus-visible` outline, and an `:invalid` style.
   - Style the button with your brand color and a smooth hover lift.
7. **Table** *(Lessons 10, 17).* Make `.stats-table` full width, give cells padding, left-align the headers and add zebra stripes to the body rows.
8. **Typography** *(Lessons 11, 16).* Use a `rem` type scale, and a `clamp()` font size for the `h1`.

✅ **You're done when:**
- on a narrow window everything is one neat column, and on a wide window the sidebar sits beside the main content
- the header stays at the top while you scroll
- every card, field and button looks consistent
- you can see where you are when you press Tab through the page
