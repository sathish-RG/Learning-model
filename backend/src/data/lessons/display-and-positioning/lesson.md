## Why does this matter?

Headers that stay at the top while you scroll, "NEW" badges on product cards, chat buttons floating in the corner, menus that sit in a row: all of these come from two properties, `display` and `position`.

## display: how a box shares its line 📚

Every element has a default `display`:

- **`block`**: like a **shelf**. It takes the whole width, and the next thing starts below it. Headings, paragraphs, lists and `<article>` are block.
- **`inline`**: like **words in a sentence**. It sits in the line of text, and you can't give it a width or height. Links, `<strong>` and `<span>` are inline.
- **`inline-block`**: like **stickers in a row**. It sits in a line *but* can have its own width, height and padding.
- **`none`**: **hidden completely**, as if it weren't in the HTML at all.

```css
.tags li {
  display: inline-block;   /* list items side by side */
}
.secret {
  display: none;           /* gone */
}
```

## position: moving boxes around 📍

### static: the default

Boxes sit in the normal flow, one after another. `top`, `left` and friends do nothing.

### relative: a small nudge, and an anchor

`position: relative` lets you nudge a box from its normal spot with `top`/`left`. Its old space stays reserved. More importantly, it turns the box into an **anchor** for any `absolute` children inside it.

### absolute: a sticky note on a box 🗒️

`position: absolute` lifts the box **out of the flow** (other content acts as if it isn't there). It's positioned relative to the nearest ancestor that has a position set, like sticking a note onto the corner of a specific box:

```css
.card {
  position: relative;   /* the anchor */
}
.badge {
  position: absolute;   /* stuck to the card's corner */
  top: -10px;
  right: -10px;
}
```

Forget `position: relative` on the card and the badge flies off to the corner of the whole page!

### fixed: a sticker on the TV screen 📺

`position: fixed` sticks the box to the **screen itself**. It stays in the same spot while everything scrolls underneath, like a sticker on the glass of a TV. That's how chat and "back to top" buttons work.

### sticky: a bookmark 🔖

`position: sticky` acts normally until you scroll it to an edge, then it **sticks** there. Perfect for headers. You must say *where* it sticks:

```css
.site-header {
  position: sticky;
  top: 0;
}
```

## z-index: papers on a desk 🗂️

When positioned boxes overlap, `z-index` decides which is on top, like stacking papers: a higher number sits higher up the pile. It only works on boxes with a `position` other than `static`.

## Remember ✅

- `block` = a shelf, `inline` = words in a line, `inline-block` = stickers with a size, `none` = hidden.
- `relative` nudges a box and makes it an anchor; `absolute` sticks to the nearest anchor.
- `fixed` sticks to the screen; `sticky` sticks when you scroll to it (needs `top`).
- `z-index` stacks positioned boxes: higher is on top.
