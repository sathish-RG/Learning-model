## Your mission: a bookshop's rules for books

This is real Mongoose. In `bookSchema.js`, fill in the schema; the model export at the bottom is ready. `samples.js` (locked) holds 8 books people are trying to save: each one is run through your model with `validateSync()`, and checked. Use these messages **exactly**:

1. `title`: a string, **required** (`"A book needs a title"`), trimmed, at most 100 characters.
2. `author`: a string, **required** (`"Who wrote it?"`), trimmed.
3. `isbn`: a string, required, matching exactly 13 digits, `/^\d{13}$/` (`"ISBN must be exactly 13 digits"`).
4. `genre`: a string, required, stored in **lowercase**, and one of `fiction`, `non-fiction`, `science`, `history` or `fantasy` (`"{VALUE} is not a genre we stock"`).
5. `price`: a number, required, at least 0 (`"Price can't be negative"`).
6. `pages`: a number that must be a whole number: a custom validator using `Number.isInteger` (`"Pages must be a whole number"`).
7. `publishedYear`: a number that can't be later than this year: a custom validator using `new Date().getFullYear()` (`"Published year can't be in the future"`).
8. `tags`: an array of strings, with at most 5 items: a custom validator on the array (`"A book can have at most 5 tags"`).
9. `inStock`: a boolean that defaults to `true`.

Watch sample 1: the extra spaces in the title, the capital letters in the genre and the `secretNote` field should all be cleaned up. And sample 8's `"299"` should become a number.

✅ **You're done when** the console ends with `🎉 All 8 samples correct!`: 2 books accepted (cleaned up), and 6 rejected with exactly the right messages.
