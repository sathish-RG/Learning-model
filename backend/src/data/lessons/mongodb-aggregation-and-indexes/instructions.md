## Your mission: the sales dashboard, and making it fast

`data.js` (locked) holds `customers` (4) and `orders` (8). Each order **embeds** its `items` (`product`, `qty`, `price`) and **references** its customer with `customerId`. In `queries.js`, build each report as an aggregation pipeline. Field names matter here: use exactly the ones shown.

1. Delivered orders from February onwards (`date` `"2026-02-01"` or later): `_id` and `date`, oldest first. *($match, $project, $sort)*
2. How many orders have each status: `{ _id: status, count }`, most first. *($group with `$sum: 1`)*
3. The top 3 products by revenue, ignoring cancelled orders: `{ _id: product, unitsSold, revenue }`. *($match, **$unwind**, $group, $sort, $limit. A line's revenue is `{ $multiply: ["$items.qty", "$items.price"] }`.)*
4. What each customer spent, ignoring cancelled orders: `{ name, spent }` with no `_id`, biggest first. *(group by `customerId` first, then **$lookup** the customer)*
5. How many orders came from each city (every order, even cancelled): `{ _id: city, orders }`, A to Z. *($lookup first, then group by the customer's city)*
6. **Indexes.** In `createIndexes`, create one index for each of these slow queries (follow the ESR rule):
   - `db.users.findOne({ email: "asha@example.com" })`
   - `db.orders.find({ customerId: 1 }).sort({ date: -1 })`
   - `db.orders.find({ status: "shipped", date: { $gte: "2026-03-01" } }).sort({ date: 1 })`

✅ **You're done when** the console ends with `🎉 All 8 checks correct!`: five reports, and three queries using an index (IXSCAN) instead of reading everything (COLLSCAN).
