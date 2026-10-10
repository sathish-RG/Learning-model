## Why does this matter?

Flexbox is great for one row *or* one column. But whole page layouts, and galleries of cards, need **rows and columns at the same time**. That's what CSS Grid is for. With a few lines you can build layouts that once took hundreds.

## A city map 🗺️

Think of a city planner drawing a map:

- The **grid container** is the land: you put `display: grid` on it.
- **Columns and rows** are the streets that divide it into blocks.
- **Grid areas** are named neighborhoods: "the header goes here, the sidebar goes there".

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 16px;
}
```

## The fr unit: slicing a pizza 🍕

`fr` means "**a fraction of the leftover space**". After fixed sizes (like `200px`) are taken out, the rest is shared like slices of pizza:

- `1fr 1fr` = two equal columns
- `2fr 1fr` = the first column gets two slices, the second gets one
- `200px 1fr 200px` = two fixed sidebars, and the middle takes the rest

`repeat(3, 1fr)` is shorthand for `1fr 1fr 1fr`.

## Drawing the layout with words ✍️

`grid-template-areas` lets you **draw your layout** using names. Each string is one row:

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
}

.top  { grid-area: header; }
.side { grid-area: nav; }
```

Writing a name several times in a row makes that area **stretch** across those columns. The header spans all three.

## Card galleries that fit themselves 🖼️

This one line is worth memorizing:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}
```

It means: "fit **as many columns as you can**, each at least `160px` wide and at most an equal share (`1fr`)". On a phone you get one column; on a laptop, four or five. It adapts automatically, with no extra code.

- `minmax(min, max)`: a size that can grow and shrink between two limits
- `auto-fit`: as many columns as will fit

## Making one item bigger

An item can **span** several columns or rows:

```css
.featured {
  grid-column: span 2;   /* two columns wide */
}
```

## Remember ✅

- `display: grid` + `grid-template-columns` creates columns; `gap` adds space between cells.
- `fr` shares leftover space like pizza slices; `repeat(3, 1fr)` = three equal columns.
- `grid-template-areas` draws the layout with names; each child gets a `grid-area`.
- `repeat(auto-fit, minmax(160px, 1fr))` makes galleries that fit themselves; `span 2` makes an item bigger.
