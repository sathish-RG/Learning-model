## Your mission: answer 9 questions about a library

`database.sql` (locked) creates a `books` table with 12 books: open it to see the columns and data. In `queries.sql`, write one `SELECT` under each numbered comment. This is a real SQLite database (running in your browser): after each pause, every query runs on a fresh copy, its result is shown as a table, and it's checked: ✅ or ❌, with a hint.

Keep each comment line as it is (`-- 1. …`): that's how your answers are found. Pick **only** the columns asked for, in the order asked.

1. Every column of every book.
2. Title and author of every book, A to Z by title.
3. George Orwell's books: title and year, oldest first.
4. In-stock books (`in_stock = 1`) under 400 rupees: title and price, cheapest first, then by title.
5. The 3 longest books: title and pages (most pages first).
6. Dystopia or Fiction books from the 1900s (1900 to 1999): title, genre and year, oldest first. Use `IN` and `BETWEEN`.
7. Books with "the" anywhere in the title: title only, A to Z. Use `LIKE`.
8. Every genre, once each, A to Z.
9. Andy Weir's books with 5% tax added: the title, and the price × 1.05 rounded to 2 decimals (`ROUND(..., 2)`) named `price_with_tax`, cheapest first.

✅ **You're done when** the console ends with `🎉 All 9 queries correct!`
