## Why does this matter?

More than half of all web visits come from phones. The same page has to work on a 360px phone, a tablet and a 1920px monitor. **Responsive design** means one page that reshapes itself to fit any screen.

## Water takes the shape of its glass 💧

A responsive page behaves like water: pour it into a tall thin glass or a wide bowl, and it fills the shape. Your layout should do the same.

## Step 1: the viewport tag

Phones pretend to be wide screens unless you tell them otherwise. This line in the HTML `<head>` says "use the real width of the device":

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

It's already in every page from now on.

## Step 2: mobile first 🎒

Pack for a weekend trip first (the essentials), then add extra bags for longer trips. In CSS:

1. Write the **base styles for small screens** first: usually one simple column.
2. Then **add** changes for bigger screens with media queries.

Phones then get the simplest CSS, and bigger screens get the extras.

## Media queries: "if the screen is at least this wide..." 📐

A media query wraps rules that only apply when a condition is true:

```css
/* Base (phones): one column */
.grid {
  grid-template-columns: 1fr;
}

/* Screens at least 480px wide: two columns */
@media (min-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

The width where the layout changes is called a **breakpoint**. Real sites often use breakpoints around `768px` (tablets) and `1024px` (laptops). The preview window in this course is small, so our missions use `480px` and `640px`, so you can actually see the changes.

## Fluid images 🖼️

An image wider than the screen breaks the layout and makes the page scroll sideways. This rule makes images shrink to fit, while keeping their shape:

```css
img {
  max-width: 100%;
  height: auto;
}
```

## clamp(): a thermostat for sizes 🌡️

A thermostat keeps the temperature between a minimum and a maximum. `clamp()` does the same for sizes:

```css
h1 {
  font-size: clamp(1.75rem, 6vw, 3rem);
}
```

- **Minimum:** never smaller than `1.75rem`
- **Preferred:** `6vw` (6% of the screen width), so it grows with the screen
- **Maximum:** never bigger than `3rem`

Headings get bigger on big screens and smaller on phones, with no media query needed. (`vw` means "viewport width": `1vw` is 1% of the screen's width.)

## Testing your layout

Make your browser window narrower and wider, and watch the preview change. Most browsers also have a **device mode** in their developer tools (press F12) that shows how your page looks on different phones.

## Remember ✅

- Responsive = one page that fits every screen.
- Mobile first: base styles for phones, then `@media (min-width: ...)` adds changes for bigger screens.
- `img { max-width: 100%; height: auto; }` keeps images inside the screen.
- `clamp(min, preferred, max)` lets sizes grow with the screen, within limits.
