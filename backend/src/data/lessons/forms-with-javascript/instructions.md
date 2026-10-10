## Your mission: a sign-up form with friendly validation

The form has `novalidate`, so validation is all yours. Write your code in `app.js`.

1. **Catch the submit.** Listen for `submit` on `#signup`, call `event.preventDefault()`, and log `Form submitted`.
2. **Start clean.** At the start of each submit, remove the `invalid` class from every input and empty every `.error` message.
3. **Check each field.** Read the values (trimmed) and check them. For each problem, add the class `invalid` to the input and write the message into its `.error` paragraph (the element right after it):
   - `name` at least 2 characters → `Please enter your name`
   - `email` must contain `@` and `.` → `Please enter a valid email`
   - `password` at least 8 characters → `Use at least 8 characters`
   - `confirm` must match the password → `Passwords don't match`
   - `terms` must be ticked → `Please accept the terms` (its error is the `.error` after its label)
4. **Success!** If there were no problems, show `Welcome, NAME! 🎉` in `#result`, log the data as an object (`{ name, email }`), and reset the form.

✅ **You're done when** submitting the empty form shows 5 messages without reloading the page, and a correct form shows the welcome message and clears itself.
