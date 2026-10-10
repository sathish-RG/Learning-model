## Why does this matter?

Most of the web is **text**: articles, product descriptions, instructions. Good structure makes text easy to scan, helps search engines understand your page, and lets people using screen readers jump straight to the part they need.

## A newspaper 📰

Think of a newspaper page:

- A big **headline** tells you what the page is about.
- **Section titles** break it into parts.
- **Paragraphs** hold the actual story.

HTML has a tag for each of these.

## Headings: the outline of your page

There are six heading levels, from `<h1>` (most important) to `<h6>` (least important):

```html
<h1>The Story of the Web</h1>
  <h2>How it started</h2>
    <h3>The first website</h3>
  <h2>The web today</h2>
```

Headings work like a **table of contents**:

- Use **one `<h1>`** per page: the page's main title.
- **Don't skip levels.** An `<h3>` belongs under an `<h2>`, not straight under the `<h1>`.
- Choose headings by **importance, not size**. Making text look bigger is CSS's job (Phase 2).

## Paragraphs and spaces

Wrap each block of text in `<p>`. One surprise: **the browser ignores extra spaces and line breaks** in your code. These two are shown exactly the same:

```html
<p>Hello world</p>

<p>Hello
       world</p>
```

When you *do* need a line break inside the text, like in an address or a poem, use `<br />`. To show a change of topic, use `<hr />` (a horizontal line).

## Meaning, not just looks: strong and em

- `<strong>` means **"this is important"**. Browsers show it in bold.
- `<em>` means **"stress this word"**, the way you'd say it out loud. Browsers show it in italics.

```html
<p><strong>Never</strong> share your password. It's <em>your</em> account.</p>
```

Screen readers can change their voice for these, so they carry real meaning. A few more useful ones:

- `<mark>` highlights text, like a highlighter pen.
- `<small>` is for side comments and fine print.
- `<code>` is for bits of code inside a sentence.

## Quotes 💬

For a longer quote that stands on its own, use `<blockquote>`. For a short quote inside a sentence, use `<q>` (the browser adds the quote marks for you):

```html
<blockquote>
  <p>The power of the Web is in its universality.</p>
</blockquote>
<p>Tim Berners-Lee said the web should be <q>for everyone</q>.</p>
```

## Showing special characters

What if you want to show a tag on the page, like `<p>`? The browser would think it's a real tag! Instead, use **entities**: special codes that stand for one character.

- `&lt;` shows `<` (**l**ess **t**han)
- `&gt;` shows `>` (**g**reater **t**han)
- `&amp;` shows `&`
- `&copy;` shows ©

So `&lt;p&gt;` appears on the page as `<p>`.

## Remember ✅

- Headings are your outline: one `<h1>`, then `<h2>`, `<h3>`... without skipping levels.
- Wrap text in `<p>`; the browser ignores extra spaces and line breaks.
- `<strong>` = important, `<em>` = stressed. They carry meaning, not just looks.
- Use `<blockquote>` for long quotes, and entities like `&lt;` for special characters.
