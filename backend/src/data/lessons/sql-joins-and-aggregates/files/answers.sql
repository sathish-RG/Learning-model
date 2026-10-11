-- 1. Every order with its customer's name: order id, name and total, by order id
SELECT orders.id, customers.name, orders.total
FROM orders JOIN customers ON orders.customer_id = customers.id
ORDER BY orders.id;

-- 2. Orders from customers in Pune: name, order_date and total, oldest first
SELECT c.name, o.order_date, o.total
FROM orders o JOIN customers c ON o.customer_id = c.id
WHERE c.city = 'Pune'
ORDER BY o.order_date;

-- 3. Every customer and their number of orders (even with none): name and order_count, A to Z
SELECT c.name, COUNT(o.id) AS order_count
FROM customers c LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id
ORDER BY c.name;

-- 4. Total revenue from delivered orders, as one number named revenue
SELECT SUM(total) AS revenue FROM orders WHERE status = 'delivered';

-- 5. For each status: status, orders (how many) and total_value, A to Z by status
SELECT status, COUNT(*) AS orders, SUM(total) AS total_value
FROM orders
GROUP BY status
ORDER BY status;

-- 6. Customers who spent more than 2000 on orders that weren't cancelled: name and spent, biggest first
SELECT c.name, SUM(o.total) AS spent
FROM customers c JOIN orders o ON o.customer_id = c.id
WHERE o.status <> 'cancelled'
GROUP BY c.id
HAVING SUM(o.total) > 2000
ORDER BY spent DESC;

-- 7. Average order (not cancelled) per city, rounded to 2 decimals: city and avg_order, highest first
SELECT c.city, ROUND(AVG(o.total), 2) AS avg_order
FROM customers c JOIN orders o ON o.customer_id = c.id
WHERE o.status <> 'cancelled'
GROUP BY c.city
ORDER BY avg_order DESC;

-- 8. Customers who have never ordered: name only
SELECT c.name
FROM customers c LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;
