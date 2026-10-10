## Your mission: build a user profile

All output goes to the console.

1. **The profile.** Create a `user` object with:
   - `name`: `"Asha"`
   - `age`: `24`
   - `skills`: `["HTML", "CSS"]`
   - `address`: an object with `city: "Chennai"`

   Log `user.name` and `user.address.city`.
2. **Update it.** Change `age` to `25`, add `isLearning: true`, and push `"JavaScript"` onto `skills`. Log `user.age`, `user.isLearning` and `user.skills`.
3. **Bracket notation.** Store the text `"age"` in a variable `key`, and log `user[key]`.
4. **A method.** Add a method `greet()` that returns `"Hi, I'm "` + the user's name (use `this`). Log `user.greet()`.
5. **All the keys.** Log `Object.keys(user)`.
6. **Ship it as JSON.** Turn `user` into JSON text and log it. Log its `typeof`. Then parse it back into `copy`, and log `copy.address.city`.

✅ **You're done when** the console shows `Asha`, `Chennai`, `25`, `true`, the 3 skills, `25`, `Hi, I'm Asha`, the 6 keys, the JSON text (without `greet`), `string` and `Chennai`.
