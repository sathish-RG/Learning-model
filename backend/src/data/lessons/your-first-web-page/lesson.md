## Why does this matter?

Every website you have ever visited, from Google to YouTube to your bank, is an **HTML file** underneath. HTML is the language every web browser speaks. Learn it, and you can put anything you like on the web.

The good news: HTML is not really "programming". You're not giving the computer instructions; you're just **labeling your content** so the browser knows what each piece is.

## A house 🏠

Think of a web page as a house:

- **HTML is the structure**: the walls, the rooms, the doors. It decides *what* is on the page.
- **CSS** (Phase 2) is the paint and furniture. It decides how things *look*.
- **JavaScript** (Phase 3) is the electricity. It makes things *happen*.

In this phase, we only build the structure. Your pages will look plain, and that's exactly right.

## Tags: labels for your content 🏷️

HTML uses **tags** to label content. A tag is a word inside angle brackets:

```html
<p>I am a paragraph.</p>
```

- `<p>` is the **opening tag**: "a paragraph starts here".
- `</p>` is the **closing tag** (note the slash): "the paragraph ends here".
- The opening tag, the content and the closing tag together make an **element**.

A few elements have nothing inside them, so they have no closing tag. These are called **void elements**. Think of them as stickers rather than boxes:

```html
<br />
```

## The skeleton every page needs 🦴

Every HTML page starts with the same skeleton:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

Line by line:

- `<!DOCTYPE html>` is a stamp at the very top that says *"this is a modern HTML page."*
- `<html lang="en">` is **the whole house**. Everything goes inside it. `lang="en"` says the page is in English, so screen readers pronounce words correctly.
- `<head>` is the **backstage area**: information *about* the page that visitors don't see on the page itself.
  - `<meta charset="UTF-8" />` tells the browser which alphabet to use, so accents and emojis (é, ñ, 😀) show up correctly.
  - `<title>` is the text on the **browser tab** (and in Google results).
- `<body>` is **everything visitors see**: text, pictures, buttons.
- `<h1>` is the main heading and `<p>` is a paragraph. You'll learn many more tags soon.

## Nesting: boxes inside boxes 📦

Elements go inside other elements, like boxes inside boxes. `<head>` and `<body>` live inside `<html>`, and your heading lives inside `<body>`.

The golden rule: **close the inner box before the outer one.**

```html
<!-- ✅ Correct: p opens last, so it closes first -->
<body><p>Hi!</p></body>

<!-- ❌ Wrong: the boxes overlap -->
<body><p>Hi!</body></p>
```

That's why we **indent** (push in) nested lines with spaces. It makes the boxes easy to see. The browser doesn't care about spaces, but people reading your code do.

## Comments: notes to yourself 📝

Anything between `<!--` and `-->` is a **comment**. The browser ignores it completely, so it's perfect for leaving notes:

```html
<!-- The main heading goes here -->
<h1>Hello!</h1>
```

## Remember ✅

- HTML **labels** content with tags: `<p>` opens, `</p>` closes.
- Every page needs the skeleton: `<!DOCTYPE html>`, `<html>`, `<head>` and `<body>`.
- `<head>` is backstage (title, charset); `<body>` is what visitors see.
- Close inner elements before outer ones, and indent to keep things readable.
