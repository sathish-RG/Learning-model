## Why does this matter?

Some information naturally comes in rows and columns: train timetables, price lists, sports scores, school schedules. HTML tables show this kind of data clearly, and they let screen readers tell users which column and row each value belongs to.

**Tables are only for data**, never for arranging a page's layout. That's what CSS is for (Phase 2).

## A spreadsheet 📊

A table is like a small spreadsheet. HTML builds it one row at a time:

- `<table>`: the whole spreadsheet
- `<tr>`: a **t**able **r**ow
- `<td>`: a **t**able **d**ata cell, a normal box
- `<th>`: a **t**able **h**eader cell, a label for a column or row (shown in bold)

```html
<table>
  <tr>
    <th>Fruit</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Apple</td>
    <td>₹30</td>
  </tr>
</table>
```

## A title for your table

`<caption>` gives the table a title, like the heading above a chart. It goes straight after the `<table>` tag:

```html
<table>
  <caption>Fruit prices this week</caption>
  ...
</table>
```

## Head, body and feet

Bigger tables are split into three parts, like a person:

- `<thead>`: the **head**, the row of column labels
- `<tbody>`: the **body**, the actual data
- `<tfoot>`: the **feet**, totals or summaries at the bottom

```html
<table>
  <caption>Fruit prices</caption>
  <thead>
    <tr><th scope="col">Fruit</th><th scope="col">Price</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Apple</th><td>₹30</td></tr>
    <tr><th scope="row">Mango</th><td>₹60</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Total</th><td>₹90</td></tr>
  </tfoot>
</table>
```

## scope: labels on a chessboard ♟️

A chessboard has letters along the bottom and numbers up the side, so "e4" means one exact square. `scope` does the same for tables:

- `scope="col"` on a `<th>`: "I label this **column**."
- `scope="row"` on a `<th>`: "I label this **row**."

With these, a screen reader can say "Mango, Price, ₹60" instead of just "₹60".

## Merging cells: colspan and rowspan

Sometimes one cell needs to stretch across several, just like "merge cells" in a spreadsheet:

- `colspan="2"`: this cell is **2 columns wide**
- `rowspan="2"`: this cell is **2 rows tall**

```html
<tr>
  <th scope="row">Saturday</th>
  <td colspan="2">Closed all day</td>
</tr>
```

When a cell spans two columns, that row has **one fewer cell**, because the merged cell takes up both spaces.

## Remember ✅

- Tables are for data in rows and columns, never for page layout.
- `<tr>` is a row, `<td>` a cell, `<th>` a header cell, and `<caption>` the title.
- `<thead>`, `<tbody>` and `<tfoot>` are the head, body and feet.
- `scope="col"`/`"row"` connects headers to their cells; `colspan`/`rowspan` merge cells.
