## Your mission: build a course feedback survey

Build a survey that uses every kind of choice, and let the browser check the answers.

1. **About you.** Inside the `<form>`, add a `<fieldset>` with the `<legend>` `About you`, containing:
   - `Name`: a required text input with `minlength="2"`
   - `Age`: a number input with `min="13"` and `max="120"`
   - `PIN code`: a required input with `pattern="[0-9]{6}"` and a `title` that explains the rule
2. **The rating.** Add a second `<fieldset>` with the `<legend>` `How was the course?`, holding three **radio buttons** that share one `name`: `Great`, `Okay` and `Hard`. Make the group required.
3. **What you learned.** Add a third `<fieldset>` with the `<legend>` `What did you learn?`, holding three **checkboxes**: `HTML`, `Links & lists` and `Forms`.
4. **Favourite lesson.** Add a labeled, required `<select>` with a first `Choose one…` option (empty `value`) followed by at least three lessons.
5. **Comments.** Add a labeled `<textarea>` with `rows="4"` and `maxlength="300"`.
6. **Send.** End with a `<button type="submit">` that says `Send feedback`.

Every input, select and textarea needs a label!

✅ **You're done when** clicking `Send feedback` on an empty form shows the browser's warnings, a PIN like `12AB` is rejected, and you can pick only one rating.
