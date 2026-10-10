## Your mission: build a grade calculator

Use only conditionals; all output goes to the console.

1. **The grade.** Using `if` / `else if` / `else`, set `grade` based on `score`:
   - 90 or more → `"A"`
   - 80 or more → `"B"`
   - 70 or more → `"C"`
   - 60 or more → `"D"`
   - anything lower → `"F"`

   Then log `"Grade:"` and the grade, like `console.log("Grade:", grade)`.
2. **Pass or fail.** Use a **ternary** to set `result` to `"pass"` if `score` is 60 or more, otherwise `"fail"`. Log `"Result:"` and the result.
3. **Study or rest?** Use a `switch` on `day`: `"mon"` to `"fri"` log `"Study day"`, `"sat"` and `"sun"` log `"Rest day"`, and anything else logs `"Unknown day"`.
4. **Truthy check.** If `username` is truthy, log `"Welcome, "` plus the name; otherwise log `"Please enter a name"`.
5. **Test it.** Try changing `score` to `95` and then `45`, and check the grade changes. Then set it back to `82`.

✅ **You're done when** (with `score = 82`) the console shows:
`Grade: B` · `Result: pass` · `Rest day` · `Please enter a name`
