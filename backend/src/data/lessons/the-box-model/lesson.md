## Why does this matter?

Every element on a web page is a **rectangle**: headings, paragraphs, buttons, images, all of them. Understanding how big those rectangles are, and how much space sits around them, is the key to every layout you'll ever build.

## A framed painting on a wall 🖼️

Picture a painting hanging on a wall:

- The **painting** itself is the **content**: the text or image.
- The **mat** (the paper border between the painting and the frame) is the **padding**: space *inside* the box.
- The **frame** is the **border**.
- The **empty wall** between this frame and the next one is the **margin**: space *outside* the box.

```css
.card {
  padding: 24px;            /* the mat */
  border: 4px solid navy;   /* the frame */
  margin-bottom: 32px;      /* the wall space below */
}
```

Padding takes on the element's background color (it's part of the picture); margin is always see-through (it's the wall).

## Width, height and the box-sizing surprise 😮

You'd expect `width: 300px` to make a box 300 pixels wide. But by default, CSS sets the width of the **painting only**, then **adds** the padding and border on top:

300 (content) + 24 + 24 (padding) + 4 + 4 (border) = **356px** wide!

The fix is one line, which almost every professional stylesheet starts with:

```css
* {
  box-sizing: border-box;
}
```

Now `width: 300px` means **the whole framed picture is 300px**, and the padding and border fit *inside*. It's like ordering a frame by its total outside size.

## Shorthands: clockwise from the top 🕛

Padding, margin and border can each take 1 to 4 values. With four values, go **clockwise, starting at the top** (Top, Right, Bottom, Left: think "**TRouBLe**"):

```css
padding: 10px;                  /* all four sides */
padding: 16px 40px;             /* top & bottom 16px, left & right 40px */
padding: 10px 20px 30px 40px;   /* top, right, bottom, left */
```

You can also target one side: `padding-left`, `margin-top`, `border-bottom`, and so on.

## Borders

`border` takes three parts: **width, style, color**.

```css
border: 2px solid hsl(220 15% 80%);
border-left: 12px solid tomato;   /* just one side */
border-radius: 12px;              /* rounded corners */
```

Styles include `solid`, `dashed` and `dotted`.

## Centering a box: margin auto ⚖️

To center a box horizontally, give it a width (or `max-width`) and set its left and right margins to `auto`. The browser splits the leftover wall space equally:

```css
.page {
  max-width: 600px;
  margin: 0 auto;
}
```

`max-width` means "never wider than this, but happy to be narrower on small screens".

**One quirk:** when two vertical margins touch (a box with `margin-bottom: 32px` above a box with `margin-top: 20px`), you get **32px, not 52px**. The bigger margin wins. This is called **margin collapse**.

## Remember ✅

- Every element is a box: content, then padding (inside), border, then margin (outside).
- Start every stylesheet with `* { box-sizing: border-box; }` so `width` includes padding and border.
- Shorthands go clockwise from the top: top, right, bottom, left.
- `max-width` + `margin: 0 auto` centers a box.
