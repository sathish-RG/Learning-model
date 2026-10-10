## Your mission: build Task Manager Pro in HTML

Build the whole Task Manager Pro page in `index.html`, using everything from Lessons 1–8. Work through the checklist in order.

1. **Skeleton** *(Lesson 1).* A complete page with `lang="en"`, `<meta charset="UTF-8" />` and the title `Task Manager Pro`.
2. **Header** *(Lessons 3, 4, 8).* A `<header>` with:
   - a logo `<img>` with good `alt` text (use the URL in the starter comment)
   - an `<h1>` `Task Manager Pro`
   - a `<nav aria-label="Main">` holding a list of three jump links: `Tasks`, `Add a task` and `Stats`
3. **Today's tasks** *(Lessons 2, 3, 6, 8).* In `<main>`, a `<section id="tasks">` with the `<h2>` `Today's tasks` and a list of at least three tasks. Each task:
   - is an `<li>` with a checkbox and a matching label
   - shows its due date in a `<time datetime="...">`
   - marks at least one task as `<strong>`important`</strong>`
4. **Add a task** *(Lessons 6, 7).* A `<section id="new-task">` with the `<h2>` `Add a task` and a `<form action="#">`, containing:
   - `Title`: required text, at least 3 characters
   - `Notes`: a textarea
   - `Due date`: a date input with a `min` date
   - `Priority`: a required select (Low / Medium / High)
   - `Category`: a `<fieldset>` + `<legend>` with three radio buttons (`Work`, `Study`, `Personal`)
   - `Remind me`: a checkbox
   - an `Add task` submit button
5. **Stats** *(Lesson 5).* A `<section id="stats">` with the `<h2>` `This week` and a table with:
   - a `<caption>`
   - `<thead>`, `<tbody>` and `<tfoot>`
   - `scope` on every header cell
   - one `colspan` cell
6. **Sidebar** *(Lessons 2, 4).* An `<aside>` with an `<h2>` `Tip of the day`, a `<blockquote>`, and a `<figure>` with an image and a `<figcaption>`.
7. **Footer** *(Lessons 2, 3, 8).* A `<footer>` with an `<address>` holding an email link, and a line with `&copy;`.
8. **Final check** *(Lesson 8):*
   - only one `<h1>`, and headings in order
   - every image has `alt`, and every form field has a label
   - every `id` is unique
   - no `<div>` anywhere

✅ **You're done when** every jump link works, the form refuses to send without a title and priority, and the final check passes.
