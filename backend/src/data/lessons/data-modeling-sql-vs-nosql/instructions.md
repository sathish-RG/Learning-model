## Your mission: design a blog's data, both ways

The blog has **users** (Asha and Ravi), **posts** written by a user, and **comments** written by a user on a post. You'll model it twice. The checker tries to break your design (a duplicate email, a post by a user who doesn't exist…), then queries it.

**Part 1: tables, in `schema.sql`.** Write three `CREATE TABLE` statements, with exactly these column names:

1. `users`: `id` (primary key), `name` (required) and `email` (required, and **unique**).
2. `posts`: `id` (primary key), `user_id` (required, **references** `users(id)`), `title` (required) and `body`.
3. `comments`: `id` (primary key), `post_id` (required, references `posts(id)`), `user_id` (required, references `users(id)`) and `text` (required).

**Part 2: documents, in `documents.js`.** Fill in the two arrays:

4. `users`: `{ _id: 1, name: "Asha", email: "asha@example.com" }` and `{ _id: 2, name: "Ravi", email: "ravi@example.com" }`.
5. `posts`, with two documents. Each one **references** its author with an `authorId` (the user's `_id`), and **embeds** its comments as an array of `{ userId, text }`:
   - `_id: 1`, `"Hello MongoDB"` by Asha, with tags `["mongodb", "beginners"]` and two comments: Ravi says `"Great intro!"`, then Asha says `"Thanks Ravi!"`
   - `_id: 2`, `"SQL vs NoSQL"` by Ravi, with tags `["sql"]` and no comments yet (an empty array)

   Give each post a `body` too (any text you like).

✅ **You're done when** the console ends with `🎉 All 8 checks correct!`, showing your comments joined back together with SQL, and your posts joined with their authors using `$lookup`.
