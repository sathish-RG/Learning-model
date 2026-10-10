## Why does this matter?

In Phase 3, your JavaScript lived on its own, printing to the console. Real apps change the **page**: a new message appears in a chat, a "Liked ❤️" button turns red, a cart counter goes up. This phase connects your JavaScript to the HTML and CSS you already know.

## The DOM: a family tree 🌳

When the browser reads your HTML, it builds a **family tree** of everything on the page. This tree is called the **DOM** (Document Object Model).

```html
<body>
  <h1>Shopping list</h1>
  <ul>
    <li>Milk</li>
    <li>Eggs</li>
  </ul>
</body>
```

- `body` is the **parent** of `h1` and `ul`.
- `h1` and `ul` are **siblings**.
- The two `li`s are **children** of `ul`.

JavaScript can find any member of this family and change them **live**. The page updates instantly, without reloading.

## Finding elements: a searchlight 🔦

`document.querySelector()` is a **searchlight**. Give it any CSS selector (the same ones from Phase 2!) and it returns the **first** matching element:

```js
const title = document.querySelector("#title");    // by id
const firstItem = document.querySelector("li");    // first <li>
const note = document.querySelector(".note");      // by class
```

`document.querySelectorAll()` is a **floodlight**: it returns **all** matches, as a list you can loop over:

```js
const items = document.querySelectorAll("#list li");
console.log(items.length);
items.forEach((item) => console.log(item.textContent));
```

If nothing matches, `querySelector` returns `null`. Check your selector if you get `Cannot read properties of null`.

## Changing text ✏️

```js
title.textContent = "My Shopping List";
```

`textContent` sets plain text, and it's **safe**: if the text contains `<b>`, it's shown as the characters `<b>`, not turned into a tag. There's also `innerHTML`, which *does* turn text into HTML. Avoid using it with anything a user typed, because someone could inject harmful code.

## Changing styles: switching outfits 👕

You *could* change styles directly: `title.style.color = "red"`. But the clean way is to define looks as **classes in CSS**, then switch outfits from JavaScript with `classList`:

```js
item.classList.add("done");        // put the outfit on
item.classList.remove("done");     // take it off
item.classList.toggle("done");     // on if off, off if on
item.classList.contains("done");   // true or false
```

This keeps styling in CSS and logic in JavaScript, each doing its own job.

## Creating new elements 👶

Adding a member to the family takes three steps: create, fill in, attach.

```js
const li = document.createElement("li");   // 1. create (it exists, but isn't on the page yet)
li.textContent = "Coffee";                 // 2. fill in
list.append(li);                           // 3. attach it to a parent: now it appears!
```

- `append` adds to the **end** of the parent; `prepend` adds to the **start**.
- `element.remove()` takes an element off the page.

## Attributes

```js
link.setAttribute("href", "https://example.com");
input.getAttribute("placeholder");
```

## Remember ✅

- The DOM is a family tree the browser builds from your HTML; JavaScript can change it live.
- `querySelector` (first match) and `querySelectorAll` (all matches) use CSS selectors.
- Use `textContent` for text, and `classList.add/remove/toggle` to switch CSS classes.
- New elements: `createElement` → fill in → `append` to a parent.
