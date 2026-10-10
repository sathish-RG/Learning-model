## Why does this matter?

In Phase 1 you built the **structure** of a house. Now it's time to decorate. CSS (Cascading Style Sheets) controls how everything *looks*: colors, sizes, spacing and layout. Every beautiful website you've seen is ordinary HTML plus CSS.

## Instructions for the decorator 🎨

Imagine leaving notes for a decorator:

- "Paint **all the doors** green."
- "Paint every door with a **'sale' sticker** red."
- "Paint the **one door named 'front-door'** purple."

That's exactly how CSS works. Each note is a **rule**:

```css
h2 {
  color: navy;
}
```

- `h2` is the **selector**: *which* elements to style
- `color` is the **property**: *what* to change
- `navy` is the **value**: *what* to change it to

The HTML loads the stylesheet with `<link rel="stylesheet" href="styles.css" />` in its `<head>`. In this phase that part is already done for you, so you only write CSS.

## The three main selectors 🎯

| Selector | Example | Picks |
|---|---|---|
| Element | `li` | every `<li>` on the page |
| Class | `.sale` | every element with `class="sale"` |
| Id | `#title` | the one element with `id="title"` |

Classes start with a **dot**, ids with a **hash**. An element can have several classes, separated by spaces: `class="fruit sale"`.

## Combining selectors

- **Grouping** (comma): one rule for several selectors. `h1, h2 { color: navy; }`
- **Descendant** (space): elements *inside* other elements. `nav a` means "links inside a nav".
- **Everything**: `*` selects every element.

## The cascade: who wins? 🏆

What if two rules disagree?

```css
li { color: green; }
li { color: blue; }
```

When two rules are equally specific, **the later one wins**. That's the "cascading" in Cascading Style Sheets: rules flow down the file, and later ones can overwrite earlier ones.

## Specificity: the more precise note wins

If one note says "paint all doors green" and another says "paint the front door purple", the decorator follows the **more precise** note, no matter which came first. CSS scores each selector:

- an **id** is worth the most
- then **classes**
- then **elements**

So `#title` beats `.title`, and `.title` beats `h1`. Count them like a score: `.fruit-list li` has **1 class + 1 element**, which beats `.sale`'s **1 class**. To win, you need a higher score, for example `.fruit-list .sale` (**2 classes**).

You may see `!important` used to force a rule to win. **Avoid it.** It's like shouting over everyone, and it makes styles very hard to fix later.

## Inheritance: passed down from parents 👪

Some properties, like `color` and `font-family`, are **inherited**: set them on a parent and the children get them too. Set `color` on `footer`, and every paragraph inside the footer gets it.

## Remember ✅

- A rule = selector + `{ property: value; }`.
- Element selectors (`li`), classes (`.sale`) and ids (`#title`), plus grouping (`a, b`) and descendants (`nav a`).
- Equal specificity: the later rule wins. Otherwise: id > class > element.
- Win with a more specific selector, not `!important`.
