## Why does this matter?

Navigation bars, rows of buttons, cards of equal width, perfectly centered content: **Flexbox** handles all of them. It's the tool you'll reach for most often when arranging items in a single row or column.

## Books on a shelf 📚

Think of a bookshelf:

- The **shelf** is the **flex container**: the parent you put `display: flex` on.
- The **books** are the **flex items**: its direct children.

As soon as the parent gets `display: flex`, its children line up in a **row**, side by side.

```css
.navbar {
  display: flex;
}
```

## Two directions: the main axis and the cross axis ↔️↕️

- The **main axis** runs the way the books are lined up. That's left to right by default.
- The **cross axis** runs the other way: up and down, along the height of the shelf.

`flex-direction: column` turns the shelf on its side, so items stack vertically and the two axes swap.

## Spacing along the main axis: justify-content

| Value | What happens |
|---|---|
| `flex-start` | All books pushed to the start (the default) |
| `center` | Books gathered in the middle |
| `flex-end` | All books pushed to the end |
| `space-between` | First book at the start, last at the end, equal gaps between |
| `space-around` / `space-evenly` | Equal space around every book |

## Lining up on the cross axis: align-items

| Value | What happens |
|---|---|
| `stretch` | Items stretch to the full height (the default) |
| `center` | Items line up through their middles |
| `flex-start` / `flex-end` | Items line up at the top / bottom |

## The famous perfect center 🎯

Centering something both ways used to be hard. With Flexbox, it's two lines:

```css
.hero {
  display: flex;
  justify-content: center;   /* middle of the main axis */
  align-items: center;       /* middle of the cross axis */
}
```

## Gaps and wrapping

- `gap: 16px` puts space **between** items (never on the outside edges).
- `flex-wrap: wrap` lets items **move onto a new line** when they don't fit, instead of squashing.

## Sizing the items themselves

These go on the **items**, not the container:

- `flex: 1` means "share the leftover space equally". Give it to three cards and they become **equal widths**.
- `flex: 2` on one item makes it take twice as much leftover space as a `flex: 1` item.
- `align-self` lets one item break from the group's `align-items`.

```css
.feature {
  flex: 1;   /* every feature card gets an equal share */
}
```

## Remember ✅

- `display: flex` on the parent lines up its children in a row (the main axis).
- `justify-content` spaces items along the main axis; `align-items` lines them up across it.
- `justify-content: center` + `align-items: center` = perfect centering.
- `gap` adds space between items, `flex-wrap: wrap` allows new lines, and `flex: 1` shares space equally.
