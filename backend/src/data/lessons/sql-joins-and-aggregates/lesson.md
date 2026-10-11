## Why does this matter?

Real questions rarely fit in one table. "Which customers spent the most?" needs the **customers** and their **orders**. "How much did we sell per city?" needs to add up **groups** of rows. **JOIN** combines tables, and **GROUP BY** sums them up: together they turn a pile of records into the reports a business actually runs on.

## One fact, one place: why there are two tables 🧩

We could store the customer's name and city inside **every** order. But then, when Asha moves from Pune to Delhi, we'd have to fix every one of her orders, and missing one would leave the data contradicting itself.

So a relational database keeps **each fact in one place**, and links tables with IDs:

| customers | | orders | |
|---|---|---|---|
| **id** | name | id | **customer_id** |
| 1 | Asha | 1 | 1 |
| 2 | Ravi | 2 | 2 |
| | | 3 | 1 |

`orders.customer_id` is a **foreign key**: it points to the **primary key** (`customers.id`) of the customer who placed the order. Like a reference number on a form: "see customer file #1".

## JOIN: putting the tables side by side 🤝

```sql
SELECT orders.id, customers.name, orders.total
FROM orders
JOIN customers ON orders.customer_id = customers.id;
```

`ON` says how the rows match up: each order is paired with the customer whose `id` equals its `customer_id`. Short **aliases** save typing:

```sql
SELECT o.id, c.name, o.total
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE c.city = 'Pune';
```

| Join | Keeps |
|---|---|
| `JOIN` (inner join) | Only rows that have a match in **both** tables |
| `LEFT JOIN` | **Every** row of the left (first) table, even with no match. The missing columns become `NULL`. |

A `LEFT JOIN` is how you find customers **without** orders: keep everyone, then look for the ones where the order side is empty (`WHERE o.id IS NULL`). Note the `IS NULL`: `= NULL` never matches anything.

## Aggregates: one answer from many rows 🧮

| Function | Gives |
|---|---|
| `COUNT(*)` | How many rows |
| `COUNT(column)` | How many rows where that column isn't `NULL` |
| `SUM(column)` | The total |
| `AVG(column)` | The average |
| `MIN(column)` / `MAX(column)` | The smallest / largest |

```sql
SELECT COUNT(*) AS orders, SUM(total) AS revenue FROM orders;   -- one row of answers
```

## GROUP BY: one answer per group 🗂️

`GROUP BY` sorts the rows into piles, and the aggregates run **once per pile**:

```sql
SELECT status, COUNT(*) AS orders
FROM orders
GROUP BY status;
-- cancelled  2
-- delivered  6
-- shipped    2
```

Every column in the `SELECT` must either be in the `GROUP BY` or be inside an aggregate: "the total per status" makes sense; "the order date per status" doesn't (which one?).

## WHERE vs HAVING ⏳

They both filter, but at different moments:

- **`WHERE`** filters **rows**, before grouping ("ignore cancelled orders").
- **`HAVING`** filters **groups**, after grouping ("only customers whose total is over 2000").

```sql
SELECT c.name, SUM(o.total) AS spent
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.status <> 'cancelled'          -- 1. drop cancelled orders
GROUP BY c.id                          -- 2. one pile per customer
HAVING SUM(o.total) > 2000             -- 3. keep the big spenders
ORDER BY spent DESC;                   -- 4. biggest first
```

The full order of the clauses is: `SELECT … FROM … JOIN … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT`.

## Remember ✅

- Keep each fact in one table; link tables with a **foreign key** pointing to a **primary key**.
- `JOIN … ON a.x = b.y` pairs matching rows; `LEFT JOIN` also keeps rows with no match (as `NULL`).
- `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` turn many rows into one answer.
- `GROUP BY` gives one answer per group; `WHERE` filters rows before, `HAVING` filters groups after.
- Test for missing values with `IS NULL`, never `= NULL`.
