## Why does this matter?

Most of what people do on the web is **read**. Good colors and typography make text comfortable to read, guide the eye to what matters, and give a site its personality. Bad typography makes people leave.

## Colors: a paint mixing station 🎨

CSS understands colors in several ways:

| Format | Example | Think of it as |
|---|---|---|
| Name | `tomato` | Picking a crayon by its name |
| Hex | `#ff6347` | A paint code from the hardware store |
| RGB | `rgb(255 99 71)` | Mixing red, green and blue light (0–255 each) |
| HSL | `hsl(9 100% 64%)` | A **paint mixer** with three dials |

**HSL** is the easiest to work with by hand:

- **Hue** (0–360): where you point on the color wheel. 0 = red, 120 = green, 240 = blue.
- **Saturation** (0–100%): how vivid. 0% is gray, 100% is full color.
- **Lightness** (0–100%): 0% is black, 50% is normal, 100% is white.

Need a darker version of your brand color? Just lower the lightness. That's why designers love HSL.

Use `color` for text and `background-color` for the area behind it. Always keep **strong contrast** between the two, so everyone, including people with low vision, can read your text.

## Units: how big is "big"? 📏

- `px` (pixels): a **fixed** size. Fine for borders.
- `rem`: a size **relative to the page's base font size**, which is usually 16px. So `1.5rem` = 24px. If someone sets their browser to bigger text, everything in `rem` grows with it. **Use `rem` for font sizes.**
- `em`: relative to the **current element's** font size. Great for spacing that should grow with the text.
- `%`: a percentage of the parent's size.

Think of `rem` like measuring in "hand widths": if the person is bigger, their hand is bigger, and everything stays in proportion.

## Typography: making text look good ✍️

- `font-family`: which typeface to use. Always give **fallbacks**, in case the first one isn't installed: `font-family: system-ui, sans-serif;`
- `font-size`: how big the text is. Use `rem`.
- `font-weight`: how thick the letters are, from `100` (thin) to `900` (heavy). `400` is normal; `700` is bold.
- `line-height`: the **breathing room between lines**. Around `1.5` to `1.7` is comfortable for paragraphs. Use a plain number (no unit), so it scales with the font size.
- `letter-spacing`: space between letters. A little extra suits small uppercase labels; a little less suits big headings.
- `text-align`: `left`, `center` or `right`.
- `text-transform: uppercase`: shows text in capitals without changing the HTML.
- `font-style: italic` and `text-decoration` (underlines).

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
}
```

## A type scale

Pick a handful of sizes and reuse them, like a set of measuring cups: for example `1rem` for text, `1.25rem` for intros, `1.5rem` for section headings and `2.5rem` for the page title. A small, consistent set looks professional.

## Remember ✅

- Colors: names, hex, `rgb()` or `hsl()`. HSL lets you change lightness easily.
- Keep strong contrast between text and background.
- Use `rem` for font sizes so text respects the reader's settings.
- `font-family` (with fallbacks), `font-weight`, `line-height` and `letter-spacing` shape your text.
