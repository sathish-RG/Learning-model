// Lesson 65: reports with aggregation pipelines, and indexes for slow queries.
// Each function receives `db` and returns the result. Every one runs on a fresh copy, and is checked.
// db.orders.aggregate([ { $stage: ... }, { $stage: ... } ]).toArray()

// 1. Delivered orders from February onwards (date "2026-02-01" or later): _id and date, oldest first
exports.q1 = (db) => db.orders.aggregate([]).toArray();

// 2. How many orders have each status: { _id: status, count }, most first
exports.q2 = (db) => db.orders.aggregate([]).toArray();

// 3. Top 3 products by revenue, ignoring cancelled orders: { _id: product, unitsSold, revenue }
exports.q3 = (db) => db.orders.aggregate([]).toArray();

// 4. What each customer spent, ignoring cancelled orders: { name, spent } (no _id), biggest first
exports.q4 = (db) => db.orders.aggregate([]).toArray();

// 5. How many orders came from each city (count every order): { _id: city, orders }, A to Z
exports.q5 = (db) => db.orders.aggregate([]).toArray();

// 6. Indexes: create one index for each of the 3 slow queries in the mission
exports.createIndexes = (db) => {
  // db.collection.createIndex({ field: 1 })
};
