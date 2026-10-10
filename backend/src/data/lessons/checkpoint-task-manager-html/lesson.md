## Why does this matter?

So far, you've practiced each part of HTML on its own. Real pages use **everything at once**. In this checkpoint you'll build the first version of **Task Manager Pro**, the app you'll keep improving for the rest of the course.

It will look plain, because there's no CSS yet, and that's exactly right. Builders put up the walls before anyone paints them. In Phase 2 you'll make it beautiful; in Phases 3 and 4 you'll make it work.

## Plan before you build 🗺️

Professionals don't start typing straight away. They sketch the page first. Here's a good order:

1. **Skeleton first:** doctype, `<html lang>`, `<head>` and `<body>`.
2. **Landmarks next:** `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`. That's the floor plan of the house.
3. **Headings:** one `<h1>`, then an `<h2>` for each section. Read them on their own: they should work as a table of contents.
4. **Fill in the content:** lists, the table, the form, images and text.
5. **Check accessibility last:** labels, alt text, link text and heading order.

## Quick recap of your toolbox 🧰

| Lesson | What you'll use it for in Task Manager Pro |
|---|---|
| 1. Your first web page | The page skeleton and the browser-tab title |
| 2. Text & headings | Section headings, important text with `<strong>`, a tip in a `<blockquote>`, `&copy;` |
| 3. Links & lists | The menu, jump links to each section, the list of tasks |
| 4. Images & media | The logo, and a picture with a caption |
| 5. Tables | The weekly statistics table |
| 6. Forms I | The "add a task" form with labeled inputs |
| 7. Forms II | Priority (dropdown), category (radio buttons), "remind me" (checkbox), validation |
| 8. Semantic HTML | Landmarks, `<time>` for due dates, `<address>`, real buttons |

## Hints for the trickier parts 💡

**A task you can tick off** is a checkbox and a label inside a list item:

```html
<li>
  <input type="checkbox" id="task-1" name="done" />
  <label for="task-1">Finish the HTML checkpoint</label>
  (due <time datetime="2026-10-20">20 Oct</time>)
</li>
```

Every `id` on a page must be **unique**, so number them: `task-1`, `task-2`, and so on.

**Jump links** need matching `id`s: `<a href="#stats">` jumps to `<section id="stats">`.

**Due dates in the form** can use `type="date"`, plus a `min` so nobody picks a date in the past.

## Remember ✅

- Plan first: skeleton → landmarks → headings → content → accessibility check.
- Every concept from Lessons 1–8 has a place in Task Manager Pro.
- Plain-looking is fine: this checkpoint is all about correct, meaningful structure.
