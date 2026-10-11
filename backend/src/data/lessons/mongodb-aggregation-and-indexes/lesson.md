## Why does this matter?

`find` answers "which documents?". But a dashboard needs answers like "revenue per product", "top customers" or "orders per city": totals and groups, sometimes across collections. That's the **aggregation pipeline**, MongoDB's version of SQL's `GROUP BY` and `JOIN`. And when the collections grow to millions of documents, **indexes** decide whether a query takes 2 milliseconds or 20 seconds.

## The pipeline: an assembly line 🏭

An aggregation is a list of **stages**. Documents flow through them like items on an assembly line: each stage takes what the previous one produced, changes it, and passes it on.

```js
db.orders.aggregate([
  { $match: { status: "delivered" } },                    // 1. keep only some documents
  { $group: { _id: "$customerId", orders: { $sum: 1 } } }, // 2. squash them into groups
  { $sort: { orders: -1 } },                              // 3. sort the groups
  { $limit: 3 },                                          // 4. keep the top 3
]).toArray();
```

| Stage | Does | Like SQL's |
|---|---|---|
| `$match` | Keeps documents that pass a filter (the same filters as `find`) | `WHERE` / `HAVING` |
| `$project` | Picks, renames or calculates fields | `SELECT` columns |
| `$group` | One output document per group, with totals | `GROUP BY` |
| `$sort` / `$limit` / `$skip` | Order and cut | `ORDER BY` / `LIMIT` |
| `$unwind` | One document **per item** of an array | (no direct match) |
| `$lookup` | Brings in matching documents from another collection | `JOIN` |

Put `$match` as **early** as you can: the fewer documents reach the next stages, the faster the whole line runs.

## "$field": reading a field's value 💲

Inside a stage, a string starting with `$` means "**the value of** this field": `"$status"`, `"$items.price"`. Without the `$`, it's just the text `"status"`.

## $group: totals per group 🧮

`_id` says **what to group by**; every other field is an **accumulator**:

```js
{ $group: {
  _id: "$status",                    // one group per status
  count: { $sum: 1 },                // +1 per document: a count
  revenue: { $sum: "$total" },       // add up a field
  average: { $avg: "$total" },       // also $min, $max, $push (collect into an array)
} }
// → { _id: "delivered", count: 5, revenue: ..., average: ... }
```

## $unwind: one document per array item 📦

Our orders **embed** their items. To add up per **product**, first split each order into one document per item:

```js
// { _id: 101, items: [{ product: "Keyboard", qty: 1 }, { product: "Mouse", qty: 2 }] }
{ $unwind: "$items" }
// → { _id: 101, items: { product: "Keyboard", qty: 1 } }
// → { _id: 101, items: { product: "Mouse", qty: 2 } }
```

Now `"$items.product"` is a single value you can group by, and `{ $multiply: ["$items.qty", "$items.price"] }` is that line's total.

## $lookup: joining another collection 🔗

```js
{ $lookup: {
  from: "customers",         // the other collection
  localField: "customerId",  // the field in THIS document...
  foreignField: "_id",       // ...matching this field over THERE
  as: "customer",            // where to put the matches: always an ARRAY
} },
{ $unwind: "$customer" },    // one match → turn [ {...} ] into {...}
{ $project: { _id: 0, name: "$customer.name", spent: 1 } }
```

`$lookup` is powerful but slower than reading one document, which is why embedding (Lesson 63) is often the better design.

## Indexes: the book's index 📖

Without an index, finding Asha's orders means MongoDB reads **every** order and checks each one: a **collection scan** (`COLLSCAN`). Fine for 100 orders, painful for 10 million.

An **index** is like the index at the back of a book: a sorted list of values with page numbers. MongoDB jumps straight to the right entries: an **index scan** (`IXSCAN`).

```js
db.users.createIndex({ email: 1 });                    // one field (1 = ascending)
db.orders.createIndex({ customerId: 1, date: -1 });    // a compound index
```

For a **compound** index, the **order of the fields** matters. Follow the **ESR rule**:

1. **E**quality fields first: the ones you match exactly (`customerId: 1`, `status: "shipped"`).
2. **S**ort fields next, in the query's sort direction (or all reversed: indexes can be read backwards).
3. **R**ange fields last (`$gt`, `$lt`…).

So `find({ customerId: 1 }).sort({ date: -1 })` wants `{ customerId: 1, date: -1 }`. A `{ date: -1, customerId: 1 }` index would sort fine, but couldn't jump to one customer.

Indexes aren't free: each one takes memory, and slows down every insert and update a little (the index must be updated too). Add them for the queries you actually run often. To check if a query uses one, add `.explain()` in mongosh and look for `IXSCAN` vs `COLLSCAN`.

## Remember ✅

- A pipeline is an assembly line of stages: `$match` → `$group` → `$sort` → …; `$match` early.
- `"$field"` means "this field's value"; `$group` needs an `_id` (what to group by) plus accumulators like `$sum`.
- `$unwind` splits an array into one document per item; `$lookup` joins another collection (into an array).
- Indexes turn a COLLSCAN into an IXSCAN. For compound indexes: **E**quality, then **S**ort, then **R**ange.
- Every index costs memory and write speed: index the queries you run often.
