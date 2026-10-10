## Why does this matter?

You now know real CSS, which is the foundation everything else is built on. Many teams also use **Tailwind CSS**, a tool that lets you style faster without ever leaving your HTML. Knowing it makes you productive in many modern codebases.

**This lesson is the one exception in Phase 2:** with Tailwind, you style by editing the **HTML**, so there's no `styles.css` to write.

## Styling with stickers 🏷️

Normal CSS is like writing a custom instruction for each wall: "this card gets white paint, rounded corners and a shadow". Tailwind gives you a **sheet of small stickers**, each doing exactly one job, which you stick straight onto elements:

```html
<div class="bg-white rounded-2xl shadow-lg p-6">
  ...
</div>
```

- `bg-white`: white background
- `rounded-2xl`: rounded corners
- `shadow-lg`: a large shadow
- `p-6`: padding

These small one-job classes are called **utility classes**. Every one of them is just CSS you already know, packaged as a class.

## Reading Tailwind classes 📖

Most class names are short versions of CSS properties:

| Tailwind | CSS you know |
|---|---|
| `p-4` / `px-4` / `mt-2` | padding 1rem / left & right padding / margin-top 0.5rem |
| `text-xl` / `font-bold` | font-size / font-weight |
| `text-slate-600` / `bg-sky-500` | color / background-color |
| `rounded-lg` / `border-2` | border-radius / border-width |
| `flex` / `items-center` / `gap-4` | Flexbox: display, align-items, gap |
| `grid` / `grid-cols-3` | Grid: display, three columns |
| `w-16` / `h-16` | width / height |

**Spacing uses a scale:** each step is `0.25rem` (4px). So `p-4` = `1rem` = 16px, and `p-8` = `2rem`.

**Colors use a scale too:** `sky-100` is very light, `sky-500` is the middle, and `sky-900` is very dark.

## States and screens: prefixes 🔁

Put a **prefix** in front of a class to apply it only sometimes:

- `hover:bg-sky-600`: only while hovering (like `:hover`)
- `focus-visible:outline-2`: only on keyboard focus
- `md:flex-row`: only on medium screens and up (like a `min-width` media query, mobile first)

```html
<button class="bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-lg">
  Follow
</button>
```

## Is this "messy"?

Long class lists look busy at first. The trade-off: you never have to invent class names, styles can't accidentally leak to other elements, and you can see exactly how something looks just by reading its HTML. It also helps to understand the CSS underneath, which is why you learned real CSS first.

## Remember ✅

- Tailwind = small utility classes, each doing one CSS job, written straight in the HTML.
- Spacing steps are 0.25rem (`p-4` = 1rem); colors go from 100 (light) to 900 (dark).
- Prefixes add conditions: `hover:`, `focus-visible:` and `md:` (bigger screens).
- Everything Tailwind does is CSS you already know.
