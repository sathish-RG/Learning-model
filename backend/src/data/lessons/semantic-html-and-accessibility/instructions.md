## Your mission: rescue a page from "div soup"

This blog page is built entirely from `<div>`s, and it has a few accessibility bugs. Give every part its proper tag. (The page will look almost the same, because the improvement is in the meaning!)

1. **Top of the page.** Change `<div class="top">` to a `<header>`, and the menu `<div class="menu">` inside it to a `<nav>` with `aria-label="Main"`.
2. **Main content.** Change `<div class="content">` to a `<main>`.
3. **The posts.** Change each `<div class="post">` to an `<article>`. Wrap each post's date in a `<time>` with a `datetime` attribute (for example `datetime="2026-10-01"`).
4. **The sidebar.** Change `<div class="sidebar">` to an `<aside>`.
5. **The bottom.** Change `<div class="bottom">` to a `<footer>`, and wrap the contact details in an `<address>`.
6. **A real button.** Replace `<div class="button">Subscribe</div>` with a `<button type="button">`.
7. **Fix the bugs.**
   - The `<h4>` skips heading levels: make it the right level.
   - The image has no `alt`: add one that describes it.
   - The `click here` link doesn't say where it goes: rewrite its text.

✅ **You're done when** no `<div>` is left on the page, the headings go in order, and every image and link makes sense on its own.
