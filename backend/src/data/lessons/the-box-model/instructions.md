## Your mission: frame three cards perfectly

The page has a **300px ruler** at the top. Make the cards match it exactly, using only box-model properties in `styles.css`.

1. **The magic line.** At the top of your CSS, set `box-sizing: border-box` on every element (`*`).
2. **Frame every card.** Give `.card`:
   - `width: 300px`
   - `padding: 24px`
   - `border: 4px solid hsl(220 40% 40%)`
   - `margin-bottom: 32px`
3. **A wider mat.** Give `#card-2` `padding: 16px 40px` (16px top and bottom, 40px left and right).
4. **A thick edge.** Give `#card-3` a thicker left border: `border-left-width: 16px`.
5. **Center the page.** Give `.page` `max-width: 600px` and `margin: 0 auto`.
6. **Round the corners.** Give `.card` `border-radius: 12px`.

✅ **You're done when** all three cards are exactly as wide as the ruler (thanks to `border-box`), card 2 has extra space at its sides, card 3 has a thick left edge, and the whole page sits in the middle.
