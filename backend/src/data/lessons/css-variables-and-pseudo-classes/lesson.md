## Why does this matter?

Real websites reuse the same colors and sizes hundreds of times, and they react when you hover, click or type. **CSS variables** keep a design consistent and make themes like dark mode easy. **Pseudo-classes** let you style elements depending on what's happening to them.

## Variables: a labeled paint palette 🎨

Imagine a palette with labeled pots: "brand", "background", "text". Every wall is painted from these pots. Change what's in the "brand" pot, and every wall using it changes too.

CSS variables (officially "custom properties") work the same way. Define them once, usually on `:root` (the whole page), with names starting with two dashes:

```css
:root {
  --brand: hsl(260 70% 55%);
  --radius: 12px;
}

.button {
  background-color: var(--brand);
  border-radius: var(--radius);
}
```

`var(--brand)` means "use whatever is in the brand pot".

## Themes: swapping the paint pots 🌙

Because variables can be **redefined**, a dark theme is just a different set of pots:

```css
:root {
  --bg: white;
  --text: black;
}

.dark {
  --bg: hsl(220 20% 10%);
  --text: hsl(220 15% 90%);
}

body {
  background-color: var(--bg);
  color: var(--text);
}
```

You can even switch themes **without any JavaScript**, using `:has()` ("contains"). This selector means "the page, when it contains a checked dark-mode checkbox":

```css
:root:has(#dark-mode:checked) {
  --bg: hsl(220 20% 10%);
}
```

## Pseudo-classes: styling by mood 😊

A pseudo-class (written with **one colon**) selects an element when it's in a certain **state**, like a mood:

| Pseudo-class | When it applies |
|---|---|
| `:hover` | The mouse is over it |
| `:focus-visible` | It was reached with the keyboard (Tab key) |
| `:active` | It's being pressed right now |
| `:checked` | A checkbox or radio is ticked |
| `:invalid` / `:valid` | A form field breaks / follows its rules |
| `:nth-child(even)` | Every second item: zebra stripes for tables and lists |
| `:first-child` / `:last-child` | The first / last item |

```css
.button:hover {
  background-color: hsl(260 70% 45%);
}

.button:focus-visible {
  outline: 3px solid var(--brand);
  outline-offset: 3px;
}
```

**Never remove the focus outline without adding a better one.** People who use a keyboard need to see where they are on the page.

## Pseudo-elements: decorations that aren't in the HTML ✨

A pseudo-element (written with **two colons**) styles a *part* of an element, or adds decoration:

- `::before` / `::after` add content before or after the element's content. They need a `content` property:

  ```css
  .tip::before {
    content: "💡 ";
  }
  ```

- `::placeholder` styles the hint text inside an input.
- `::first-letter` styles the first letter, like a fancy book chapter.

**One colon = a state** (`:hover`). **Two colons = a part or decoration** (`::before`).

## Remember ✅

- Define variables on `:root` with `--name: value;` and use them with `var(--name)`.
- Redefine variables to create themes like dark mode.
- Pseudo-classes (`:hover`, `:focus-visible`, `:invalid`, `:nth-child()`) style states.
- Pseudo-elements (`::before`, `::after`) add decoration; they need `content`.
