## Why does this matter?

In Phase 7, your tasks, orders and users lived in JavaScript arrays. Every time the server restarted, **they were gone**. Real apps keep their data in a **database**: it survives restarts and crashes, it can hold millions of records, and it can answer questions about them in milliseconds. **SQL** is the language for asking those questions, and it has been the most used data language in the world for 50 years.

## A whiteboard vs a filing cabinet 🗄️

| | 🧽 Whiteboard (variables, arrays) | 🗄️ Filing cabinet (a database) |
|---|---|---|
| Where it lives | The server's **memory** | A **disk**, on a database server |
| After a restart | **Wiped clean** | Still there, exactly as you left it |
| How much it holds | What fits in memory | Millions of records |
| Finding something | You search it yourself, with loops | You **ask**, and it finds it fast |
| Several people at once | Messy | Built for it: one clerk keeps everything in order |

Your Express server is the kitchen. The database is its **pantry**: everything is stored there safely, and the cooks fetch exactly what they need.

## Tables: data like a spreadsheet 📊

A **relational** (SQL) database stores data in **tables**, which look a lot like spreadsheets:

| id | title | author | year | price |
|---|---|---|---|---|
| 1 | The Hobbit | J.R.R. Tolkien | 1937 | 399 |
| 2 | 1984 | George Orwell | 1949 | 299 |

- Each **row** is one record (one book).
- Each **column** is one property, with a fixed **type**: `INTEGER`, `REAL` (a decimal number), `TEXT`…
- The **primary key** (`id`) is unique for every row: the book's ID card.

Unlike a spreadsheet, the rules are strict: every book has the same columns, and a `year` can't contain `"last summer"`. That strictness is what keeps the data trustworthy.

## SELECT: asking questions 🔍

```sql
SELECT title, author    -- which columns
FROM books              -- from which table
WHERE year > 1950       -- which rows (optional)
ORDER BY year DESC      -- in what order (optional)
LIMIT 5;                -- how many at most (optional)
```

The parts always come in that order: `SELECT` → `FROM` → `WHERE` → `ORDER BY` → `LIMIT`. Each statement ends with `;`, and capital letters for the keywords are just a habit (it makes them easy to spot).

| You want | Write |
|---|---|
| Every column | `SELECT *` |
| Rows that match | `WHERE genre = 'Fantasy'` (text in **single** quotes) |
| Several conditions | `WHERE price < 400 AND in_stock = 1` (also `OR`, `NOT`) |
| One of a list | `WHERE genre IN ('Fiction', 'Dystopia')` |
| A range | `WHERE year BETWEEN 1900 AND 1999` (both ends included) |
| Text containing… | `WHERE title LIKE '%war%'` (`%` = any characters) |
| Sorted | `ORDER BY price` (smallest first) or `ORDER BY price DESC` |
| Sorted, with a tie-breaker | `ORDER BY price, title` |
| The first few | `LIMIT 3` |
| No duplicates | `SELECT DISTINCT genre` |
| A calculated column | `SELECT price * 2 AS double_price` |

`=` compares in SQL (not `===`), and "not equal" is `<>` or `!=`.

## Rows come back in no particular order 🔀

Without `ORDER BY`, a database may return rows in **any** order, and it can change from one day to the next. Whenever the order matters, say so.

## Remember ✅

- Variables are a whiteboard (wiped on restart); a database is a filing cabinet (kept safe on disk).
- SQL databases store **tables**: rows are records, columns are typed properties, the primary key is unique.
- `SELECT columns FROM table WHERE condition ORDER BY column LIMIT n`, in that order.
- Text goes in single quotes; combine conditions with `AND` / `OR`; `IN`, `BETWEEN` and `LIKE '%…%'` are shortcuts.
- Use `ORDER BY` whenever the order matters, and `AS` to name calculated columns.
