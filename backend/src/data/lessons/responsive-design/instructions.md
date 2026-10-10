## Your mission: one page, every screen

The page is locked, and the gallery already uses Grid with a gap. Write only responsive rules in `styles.css`.

1. **Fluid images.** Make every `img` shrink to fit its container: `max-width: 100%` and `height: auto`.
2. **A fluid headline.** Give `h1` `font-size: clamp(1.75rem, 6vw, 3rem)`.
3. **Mobile first.** Give `.gallery` one column as the base: `grid-template-columns: 1fr`.
4. **Bigger screens.** Add a media query for screens at least `480px` wide that gives `.gallery` **two** equal columns.
5. **Even bigger screens.** Add another media query for screens at least `640px` wide that gives `.gallery` **three** equal columns and gives `.page` `padding: 40px`.

✅ **You're done when** the big photo never sticks out of the page, and the gallery shows 1, 2 or 3 columns as you make your browser window narrower and wider.
