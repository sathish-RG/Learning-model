## Why does this matter?

In Phase 1, the browser checked forms for you with `required` and `pattern`. That's a great start, but real apps need more: matching passwords, friendly messages in your own words, showing a "Welcome!" message without reloading the page, or sending the data to a server in the background. JavaScript gives you full control over forms.

## Submitting: posting a letter ✉️

When someone submits a form, the browser's default behaviour is like **posting a letter**: it sends the data off and **reloads the page** (or opens a new one). In modern apps, we want to stop the letter at the postbox, check it, and handle it ourselves:

```js
const form = document.querySelector("#signup");

form.addEventListener("submit", (event) => {
  event.preventDefault();   // stop the page from reloading
  console.log("Form submitted, and the page stayed put!");
});
```

**Listen for `submit` on the form**, not `click` on the button. `submit` also catches the Enter key, so keyboard users are covered.

`event.preventDefault()` cancels whatever the browser would normally do. You'll use it constantly.

## Reading values 📖

```js
const name = form.querySelector("#name").value.trim();      // text boxes: .value
const agreed = form.querySelector("#terms").checked;          // checkboxes: .checked
```

- `.value` is **always text**, even for `type="number"`. Convert with `Number()` when needed.
- `.trim()` removes accidental spaces, so `"   "` doesn't count as a name.

## Taking over validation 🛂

Adding `novalidate` to a `<form>` turns off the browser's pop-up messages, so you can show **your own** messages, styled to match your site, right next to each field:

```js
const showError = (input, message) => {
  input.classList.add("invalid");
  input.nextElementSibling.textContent = message;   // the error <p> after the input
};
```

A good pattern on every submit:

1. **Clear** the old errors.
2. **Check** each field, and show a message for each problem.
3. **Only continue** if there were no problems.

## Accessible error messages ♿

- Put each message **right next to its field**, so people know which one is wrong.
- `aria-invalid="true"` on a field tells screen readers it has a problem.
- `aria-live="polite"` on a message area makes screen readers **announce** new messages.

## After a successful submit 🎉

- Show a confirmation message on the page.
- `form.reset()` clears every field back to its starting value.
- Later in the course, this is where you'll send the data to your server.

**Remember:** checks in the browser are for the user's convenience. A real server must always check the data again, because anyone can bypass your JavaScript.

## Remember ✅

- Listen for `submit` on the form, and call `event.preventDefault()` to stop the reload.
- Read text with `.value.trim()` and checkboxes with `.checked`.
- With `novalidate`, show your own messages: clear the old ones, check each field, then continue only if valid.
- Use `form.reset()` after success, and keep messages next to their fields.
