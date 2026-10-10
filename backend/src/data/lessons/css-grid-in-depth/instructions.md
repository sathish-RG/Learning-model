## Your mission: lay out a whole page with Grid

The page is locked; use only Grid properties in `styles.css`.

1. **The page grid.** Make `.layout` a grid with three columns: `150px 1fr 150px`, and a `gap` of `16px`.
2. **Draw the layout.** Give `.layout` these `grid-template-areas`:
   - row 1: `header` across all three columns
   - row 2: `nav`, `main`, `aside`
   - row 3: `footer` across all three columns
3. **Place each part.** Give `.top`, `.side`, `.content`, `.extra` and `.bottom` the matching `grid-area` names.
4. **A self-fitting gallery.** Make `.cards` a grid with `repeat(auto-fit, minmax(100px, 1fr))` columns and a `12px` gap.
5. **A featured card.** Make `.card.featured` span **2** columns.

✅ **You're done when** the header and footer stretch across the whole page, the menu sits on the left and the extras on the right, and the cards fill the middle in at least two columns, with the featured card twice as wide. (Make your browser wider to see even more columns appear.)
