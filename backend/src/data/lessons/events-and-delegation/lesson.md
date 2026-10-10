## Why does this matter?

A page that only changes once, when it loads, isn't an app yet. Apps **react**: you click "Like", type in a search box, press Enter, drag a slider. **Events** are how your JavaScript hears what the user does, so it can respond.

## Event listeners: the waitstaff 🍽️

Picture a restaurant. You tell a waiter: "**When** table 5 raises a hand, bring them water." The waiter stands by and waits; when it happens, they act.

`addEventListener` is that instruction:

```js
const button = document.querySelector("#like");

button.addEventListener("click", () => {
  console.log("Liked!");
});
```

1. **Which element** to watch: `button`
2. **Which event** to wait for: `"click"`
3. **What to do** when it happens: the function, called a **handler**

The handler doesn't run straight away. It runs **every time** the event happens.

## Common events 📋

| Event | When it happens |
|---|---|
| `click` | The element is clicked (or tapped, or activated with the keyboard) |
| `input` | The value of a text box changes, on every keystroke |
| `change` | A checkbox, select or input is changed and finished |
| `keydown` | A key is pressed |
| `submit` | A form is sent (next lesson!) |
| `mouseover` | The mouse moves onto the element |

## The event object: the order slip 🧾

Your handler receives an **event object**, like the waiter's order slip, with details about what happened:

```js
input.addEventListener("input", (event) => {
  console.log(event.type);            // "input"
  console.log(event.target.value);    // what's typed so far
});
```

`event.target` is **the element where the event happened**.

## Bubbling: a shout travels up the family tree 📣

When you click a button inside a list item inside a list, the click doesn't stay on the button. It **bubbles up** through every parent: button → `li` → `ul` → `body`. It's like shouting in a building: everyone up the stairs hears it.

## Delegation: one head waiter for the whole room 🤵

Imagine a list with 100 items, each with a delete button. You *could* add 100 listeners, one per button. But it's much smarter to put **one listener on the list itself**. Thanks to bubbling, it hears every click inside, and `event.target` tells you exactly what was clicked:

```js
list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete");
  if (!button) return;               // the click wasn't on a delete button
  button.closest("li").remove();     // remove that button's list item
});
```

- `closest(selector)` walks **up** the family tree from an element and finds the nearest match (including the element itself).
- **The best part:** items added **later** work automatically, because the listener lives on the parent, which was there all along.

This is called **event delegation**: one head waiter at the door of the room, instead of a waiter at every table.

## Remember ✅

- `element.addEventListener("event", handler)` runs the handler every time the event happens.
- The event object tells you what happened; `event.target` is where it happened.
- Events bubble up from the element through all its parents.
- Delegation: listen on the parent, then use `event.target.closest(...)` to find what was clicked. It works for new items too.
