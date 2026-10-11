// Lesson 64: questions (and changes) for the products collection, in mongosh's language.
// Each function receives `db`; return the result. Every one runs on a fresh copy, and is checked.
// Reading: db.products.find(filter, projection).sort(...).skip(n).limit(n).toArray()

// 1. Kitchen products: name and price only (no _id), cheapest first
exports.q1 = (db) => db.products.find({}).toArray();

// 2. In stock (stock above 0) and under ₹1000: name, price and stock, cheapest first
exports.q2 = (db) => db.products.find({}).toArray();

// 3. Electronics or sports, rated 4.5 or more: name, category and rating, best rating first
exports.q3 = (db) => db.products.find({}).toArray();

// 4. Out of stock (stock 0), OR priced over ₹5000: name only, A to Z
exports.q4 = (db) => db.products.find({}).toArray();

// 5. Tagged "wireless": name and price, most expensive first
exports.q5 = (db) => db.products.find({}).toArray();

// 6. Page 2 of all products, 4 per page, sorted A to Z by name: name only
exports.q6 = (db) => db.products.find({}).toArray();

// 7. How many products are in stock? (a number)
exports.q7 = (db) => 0;

// 8. Add the Smart Watch: electronics, ₹4999, 10 in stock, rated 4.2, tags "wearable" and "wireless"
exports.q8 = (db) => {};

// 9. Restock: for every out-of-stock product, add 20 to stock, and set restocked to true
exports.q9 = (db) => {};

// 10. The Desk Lamp now costs ₹999
exports.q10 = (db) => {};

// 11. Delete every product rated below 4.0
exports.q11 = (db) => {};
