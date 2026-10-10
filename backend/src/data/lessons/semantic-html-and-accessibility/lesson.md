## Why does this matter?

You *could* build a whole page out of `<div>` tags. A `<div>` just means "a box", with no meaning at all. The page would look fine, but browsers, search engines and screen readers would have no idea which box is the menu, which is the main content and which is the footer.

**Semantic HTML** means picking the tag that describes what the content *is*. It's free, it makes your code easier to read, and it's the single biggest step towards an accessible website.

## Labeled moving boxes 📦

Imagine moving house. If every box just says "BOX", unpacking is a nightmare. If they say "Kitchen", "Books" and "Bedroom", you know exactly where everything goes.

`<div>` is the box that says "BOX". Semantic tags are the labeled boxes.

## The page landmarks 🗺️

Most pages have the same big areas. HTML has a tag for each one:

| Tag | What it is |
|---|---|
| `<header>` | The top area: logo, site name, often the menu |
| `<nav>` | A block of main navigation links |
| `<main>` | The main content. **Only one per page.** |
| `<article>` | A self-contained piece you could cut out and share on its own, like a newspaper article, a blog post or a product card |
| `<section>` | A themed part of the page, usually with its own heading |
| `<aside>` | Related but separate content: a sidebar, a "did you know?" box |
| `<footer>` | The bottom area: contact details, copyright, links |

```html
<header>
  <h1>My Blog</h1>
  <nav aria-label="Main">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>Learning HTML</h2>
    <p>Posted on <time datetime="2026-10-01">1 October 2026</time></p>
  </article>
</main>
<footer>
  <p>&copy; 2026 My Blog</p>
</footer>
```

Screen-reader users can **jump between these landmarks** like chapters in an audiobook: "Go to main content", "Go to navigation". With only `<div>`s, there are no chapters at all.

## Small semantic helpers

- **`<time datetime="2026-10-01">`** marks a date in a format computers understand, while the visible text can say "1 October 2026".
- **`<address>`** holds contact information for the page or article.
- **`<button>`** is for anything clickable that *does* something. A `<div>` made to look like a button can't be reached with the Tab key and isn't announced as a button. Use the real thing.
- **`aria-label="Main"`** gives an element an accessible name. It's useful when a page has more than one `<nav>`.

## The accessibility checklist ♿

You already know most of these from earlier lessons:

1. **`lang`** is set on `<html>`.
2. **Headings** go in order: one `<h1>`, with no skipped levels.
3. Every **image has `alt`** text (or `alt=""` if it's decoration).
4. Every **form field has a `<label>`**.
5. **Link text** says where it goes. No "click here".
6. **Landmarks** are used: `<header>`, `<nav>`, `<main>` and `<footer>`.
7. **Real buttons** (`<button>`) are used for actions, and **real links** (`<a>`) for going places.

**The first rule of accessibility:** if a plain HTML tag does the job, use it. Don't rebuild it from `<div>`s.

## Remember ✅

- `<div>` means "a box" with no meaning. Semantic tags say what the content *is*.
- Landmarks: `<header>`, `<nav>`, `<main>` (only one), `<article>`, `<section>`, `<aside>`, `<footer>`.
- Use `<time>`, `<address>` and real `<button>`s where they fit.
- Accessible HTML = correct `lang`, ordered headings, alt text, labels, clear links and landmarks.
