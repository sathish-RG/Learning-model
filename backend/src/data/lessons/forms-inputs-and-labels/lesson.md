## Why does this matter?

Forms are how visitors **talk back** to a website: signing up, logging in, searching, paying. Almost every app you'll ever build has forms, and a well-built form is easy for everyone to fill in, including people using phones, keyboards or screen readers.

## A paper form at the doctor's office 📋

Think of the form you fill in at a clinic:

- The **clipboard** holding everything is `<form>`.
- Each **printed question** ("Your name:") is a `<label>`.
- Each **blank box** you write in is an `<input>`.
- **Handing it to the receptionist** is the submit `<button>`.

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" />

  <button type="submit">Sign up</button>
</form>
```

- `action` is *where* the form is sent, and `method` is *how*. We won't send forms anywhere until the backend phases, so `action="#"` is fine for now.

## Labels: the question next to each box 🏷️

Every input needs a label. Connect them by giving the input an `id` and the label a matching `for`:

```html
<label for="full-name">Full name</label>
<input type="text" id="full-name" name="fullName" />
```

Why this matters:

- **Clicking the label** puts the cursor in the box (try it later!), which is a bigger target on phones.
- **Screen readers** read the label aloud when the box is selected. Without it, users just hear "edit text" and have to guess.

You can also wrap the input inside the label, with no `for`/`id` needed:

```html
<label>Full name <input type="text" name="fullName" /></label>
```

## Placeholder is not a label ⚠️

`placeholder="you@example.com"` shows a faint example inside the box, but it **disappears as soon as you type**. Then the user forgets what the box was for. Use it only for hints, *alongside* a real label.

## name: the field's ID in the back office 🗂️

`name` is the label the *server* sees when the form is sent, like the column names in a spreadsheet. A field without a `name` isn't sent at all!

## Input types: the right box for the job

Change `type` and you get a different box, with a matching keyboard on phones:

| type | What it's for |
|---|---|
| `text` | Plain text, like a name |
| `email` | An email address (phones show an @ key) |
| `password` | Hides the characters as you type |
| `number` | Numbers only, with up/down arrows |
| `tel` | Phone numbers (phones show a number pad) |
| `date` | Shows a date picker |
| `url` | A web address |
| `search` | A search box |

## Helping the browser fill it in

`autocomplete` tells the browser what a field is, so it can offer saved details. That's faster for users, and password managers love it:

```html
<input type="email" id="email" name="email" autocomplete="email" />
<input type="password" id="pw" name="password" autocomplete="new-password" />
```

## Remember ✅

- `<form>` holds the fields; a `<button type="submit">` sends it.
- Every `<input>` needs a `<label>`: match the label's `for` to the input's `id`.
- `placeholder` is a hint, not a label. `name` is what the server sees.
- Pick the right `type` (email, password, date, tel...) and add `autocomplete`.
