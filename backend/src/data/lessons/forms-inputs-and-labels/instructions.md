## Your mission: build a sign-up form

Build a sign-up form where every field is properly labeled.

1. **The form.** Under the `<h1>`, add a `<form>` with `action="#"`.
2. **Five labeled fields.** Inside it, add these five fields. Each needs a `<label>` whose `for` matches the input's `id`, plus a `name`:
   - `Full name`: a `text` input
   - `Email`: an `email` input
   - `Password`: a `password` input
   - `Date of birth`: a `date` input
   - `Phone`: a `tel` input
3. **Autofill hints.** Give the fields these `autocomplete` values, in order: `name`, `email`, `new-password`, `bday`, `tel`.
4. **One hint.** Give the email box `placeholder="you@example.com"`.
5. **Send button.** End the form with a `<button type="submit">` that says `Create account`.

*Tip:* put each label and its input inside their own `<p>`, so every field sits on its own line.

✅ **You're done when** clicking each label in the preview puts the cursor in its box, and the date field opens a date picker.
