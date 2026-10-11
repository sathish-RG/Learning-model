## Your mission: the shop's sales reports

`database.sql` (locked) has two tables: `customers` (5) and `orders` (10), linked by `orders.customer_id`. In `queries.sql`, write one query under each numbered comment. Each one is run, shown as a table and checked. Name the columns as asked with `AS` (the names aren't checked, but they make your tables readable).

1. Every order with its customer's name: order id, name and total, by order id. *(JOIN)*
2. Orders from customers in Pune: name, order_date and total, oldest first. *(JOIN + WHERE)*
3. Every customer and their number of orders, **including** customers with none: name and order_count, A to Z. *(LEFT JOIN + GROUP BY. Hint: `COUNT(o.id)`, not `COUNT(*)`: why?)*
4. Total revenue from delivered orders, as one number named `revenue`. *(SUM)*
5. For each status: status, how many orders and their total value, A to Z by status. *(GROUP BY)*
6. Customers who spent more than 2000 on orders that weren't cancelled: name and the amount spent, biggest first. *(WHERE + GROUP BY + HAVING)*
7. The average order (not cancelled) per city, rounded to 2 decimals: city and avg_order, highest first. *(AVG + ROUND)*
8. Customers who have never ordered: name only. *(LEFT JOIN + IS NULL)*

✅ **You're done when** the console ends with `🎉 All 8 queries correct!`
