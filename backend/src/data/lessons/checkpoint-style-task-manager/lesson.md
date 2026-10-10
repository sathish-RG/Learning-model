## Why does this matter?

In Checkpoint A you built the **structure** of Task Manager Pro. Now you'll make it look like a real, modern app, using **only CSS**, without touching a single line of HTML. That's exactly how professional teams often work: the HTML stays clean and meaningful, and the design lives in the stylesheet.

## The HTML is locked 🔒

The `index.html` here is Task Manager Pro from Checkpoint A, with a few **class names** added as handles for your selectors. You can read it, but you can't change it. Every bit of the design has to come from `styles.css`.

Spend a minute reading the HTML before you start. Make a note of the class names; they're your map.

## Plan your design 🗺️

Professionals work from the outside in:

1. **Foundations:** box-sizing, your color and size variables, and the base font. Decide your palette **first**, as variables.
2. **Page layout:** where the big areas go (header, main, sidebar, footer), on phones first, then bigger screens.
3. **Components:** the header, cards, the task list, the form and the table, one at a time.
4. **States and polish:** hover, focus, invalid fields and a little motion.
5. **Test** at different screen widths.

## Your toolbox 🧰

| Lesson | Where it fits in Task Manager Pro |
|---|---|
| 10. Selectors | Targeting `.task-list li`, `.site-header a` and other parts |
| 11. Typography | A readable font, a type scale in `rem` |
| 12. Box model | `border-box`, card padding, borders, rounded corners |
| 13. Positioning | A sticky header |
| 14. Flexbox | The header row, the menu, each task row |
| 15. Grid | The page layout with named areas, and the content cards |
| 16. Responsive | One column on phones, main + sidebar on bigger screens |
| 17. Variables & states | The palette, hover and focus styles, invalid fields, stripes |
| 18. Motion | Buttons that lift smoothly on hover |

## A few hints 💡

**The body can be the page grid.** Its direct children are the header, `main`, `aside` and footer:

```css
body {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "aside"
    "footer";
}
```

Then, in a media query for bigger screens, redraw the areas with `main` and `aside` side by side.

**Style form fields once, for all of them:**

```css
.task-form input[type="text"],
.task-form input[type="date"],
.task-form select,
.task-form textarea {
  width: 100%;
}
```

`input[type="text"]` is an **attribute selector**: it matches only inputs whose `type` is `text`.

## Remember ✅

- The HTML is locked: every bit of the design comes from CSS.
- Work outside-in: foundations → layout → components → states → testing.
- Every Phase 2 lesson has a job in this checkpoint.
