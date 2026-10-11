## Your mission: a fully controlled sign-up form

Everything happens in `App.jsx`.

1. **One state object.** Create `form` state: `{ name: "", email: "", plan: "free", agree: false }`.
2. **Control every field.** Give each field `value` (or `checked`, for the checkbox) from `form`, and one shared `handleChange` that updates the right key. For the checkbox, use `event.target.checked`.
3. **Live preview.** Show `NAME is joining the PLAN plan` in `#preview`, updating as you type. Show `Someone` when the name is empty.
4. **Errors from state.** Calculate:
   - `name` shorter than 2 characters → `Please enter your name`
   - `email` without `@` → `Please enter a valid email`
   - `agree` not ticked → `Please accept the terms`

   Show each message in the `.error` paragraph under its field, but **only after** the user has tried to submit once (keep a `submitted` state).
5. **Submit.** On submit, prevent the reload and set `submitted` to `true`. If there are no errors, log the form object, show `Thanks, NAME!` in `#result`, and reset the form to its starting values (and `submitted` to `false`).

✅ **You're done when** the preview updates as you type, submitting an empty form shows 3 errors, and a valid form logs the data, thanks you, and clears itself.
