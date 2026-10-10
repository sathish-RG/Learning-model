## Why does this matter?

Every website you have ever used, from YouTube to your bank, is built from the same basic ingredients. Before your Task Manager can *do* anything, it needs to **show up on the screen** and look good. That's what this module is about.

## Think of a house 🏠

- **HTML is the structure**: the walls, rooms and doors. It decides *what* is on the page: a title, a list, a button.
- **CSS is the paint and furniture**: colors, sizes, and where everything sits.
- **JavaScript** (the next module) is the electricity. It makes things *happen* when you click.

## HTML: putting labels on things

HTML wraps your content in **tags**, like putting things into labeled boxes. Most tags come in pairs: an opening tag and a closing tag with a slash.

```html
<h1>My Tasks</h1>
<p>Buy milk</p>
<button>Add task</button>
```

- `<h1>` means "the main heading"
- `<p>` means "a paragraph of text"
- `<button>` means... a button!

## CSS: making it look nice

CSS gives instructions like *"make this blue"* or *"leave some space around this."* Without CSS, every website would look like a plain Word document.

## Arranging things: Flexbox and Grid

Most layout work comes down to two tools:

- **Flexbox** lines things up in **one row** (or one column), like books on a shelf. Perfect for a header with a logo on the left and a button on the right.
- **Grid** arranges things in **rows *and* columns**, like an egg carton. Perfect for a board of task cards.

## Tailwind: styling with stickers

Writing CSS in a separate file means jumping back and forth. **Tailwind** gives you small, ready-made "stickers" (called *classes*) that you put right on your HTML:

```html
<button class="bg-blue-500 text-white rounded-lg p-2">
  Add task
</button>
```

Each sticker does one small job: `bg-blue-500` is a blue background, `rounded-lg` rounds the corners, and `p-2` adds a little space inside.

For layout:

- `flex` turns on Flexbox
- `grid grid-cols-2` makes a grid with 2 columns
- `gap-4` adds space between items

## Phones vs. laptops 📱💻

A page should look good on any screen. In Tailwind, put `md:` in front of a sticker to say *"only on medium-sized screens and bigger"*:

```html
<main class="grid gap-4 md:grid-cols-2">
```

This means: one column on phones, two columns on bigger screens. That's called **responsive design**.

## Remember ✅

- **HTML** = what is on the page. **CSS** = how it looks.
- Use **Flexbox** for a single row, **Grid** for rows and columns.
- Tailwind classes are small styling stickers, and `md:` makes them apply only on bigger screens.
