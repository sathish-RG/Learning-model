## Your mission: run the shop's products collection

`data.js` (locked) holds the `products` collection: 12 documents. In `queries.js`, each function receives `db` and **returns** its result. Each runs on a fresh copy of the data, its result is shown as a table, and it's checked. Write queries (1–7) end with `.toArray()` (or return a number); write commands (8–11) return what the command returns, and are checked by how the collection looks afterwards.

For the projections, list only the fields asked for, and leave out `_id` (`_id: 0`).

1. Kitchen products: name and price, cheapest first.
2. In stock (`stock` above 0) **and** under ₹1000: name, price and stock, cheapest first.
3. Electronics **or** sports (`$in`), rated 4.5 or more (`$gte`): name, category and rating, best rating first.
4. Out of stock, **or** priced over ₹5000 (`$or`): name only, A to Z.
5. Tagged `"wireless"`: name and price, most expensive first.
6. Page 2 of all products, 4 per page, sorted A to Z by name: name only (`skip` and `limit`).
7. How many products are in stock? Return the number (`countDocuments`).
8. Add the Smart Watch: `name` `"Smart Watch"`, `category` `"electronics"`, `price` 4999, `stock` 10, `rating` 4.2, `tags` `["wearable", "wireless"]` (`insertOne`).
9. Restock: for **every** out-of-stock product, add 20 to `stock` (`$inc`) and set `restocked` to `true` (`$set`).
10. The Desk Lamp now costs ₹999 (`updateOne` + `$set`).
11. Delete every product rated below 4.0.

✅ **You're done when** the console ends with `🎉 All 11 queries correct!`
