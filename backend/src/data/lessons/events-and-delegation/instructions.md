## Your mission: a page that reacts

Write your code in `app.js`.

1. **A counter.** When `#increment` is clicked, add 1 to `count` and show it in `#count`. When `#decrement` is clicked, subtract 1. Log the new count each time.
2. **A live greeting.** When the user types in `#name` (the `input` event), set `#greeting` to `Hello, NAME!`. If the box is empty, show `Hello, stranger!`.
3. **Delegated delete.** Add **one** click listener to `#todo`. If the click was on a `.delete` button, remove that button's `li`, and log `Removed: ` followed by the task's text (the text of its `.text` span).
4. **Add new tasks.** When `#add-item` is clicked, create a new `li` exactly like the existing ones: a `span.text` with `New task 1` (then 2, 3...) and a `button.delete` with `×`. Append it to `#todo`.

✅ **You're done when** the counter goes up and down, the greeting changes as you type, and the × buttons delete tasks, **including tasks you just added** (thanks to delegation).
