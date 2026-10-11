// Hidden: the expected answers, and the slow queries that need an index.
const notCancelled = { $match: { status: { $ne: "cancelled" } } };
const itemTotal = { $multiply: ["$items.qty", "$items.price"] };

module.exports = {
  queries: {
    q1: {
      title: "Delivered orders from February onwards: _id and date, oldest first",
      run: (db) => db.orders.aggregate([{ $match: { status: "delivered", date: { $gte: "2026-02-01" } } }, { $project: { date: 1 } }, { $sort: { date: 1 } }]).toArray(),
    },
    q2: {
      title: "Orders per status: { _id: status, count }, most first",
      run: (db) => db.orders.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }, { $sort: { count: -1 } }]).toArray(),
    },
    q3: {
      title: "Top 3 products by revenue (not cancelled): { _id: product, unitsSold, revenue }",
      run: (db) =>
        db.orders
          .aggregate([notCancelled, { $unwind: "$items" }, { $group: { _id: "$items.product", unitsSold: { $sum: "$items.qty" }, revenue: { $sum: itemTotal } } }, { $sort: { revenue: -1 } }, { $limit: 3 }])
          .toArray(),
    },
    q4: {
      title: "What each customer spent (not cancelled): { name, spent }, biggest first",
      run: (db) =>
        db.orders
          .aggregate([
            notCancelled,
            { $unwind: "$items" },
            { $group: { _id: "$customerId", spent: { $sum: itemTotal } } },
            { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } },
            { $unwind: "$customer" },
            { $project: { _id: 0, name: "$customer.name", spent: 1 } },
            { $sort: { spent: -1 } },
          ])
          .toArray(),
    },
    q5: {
      title: "Orders per city (every order): { _id: city, orders }, A to Z",
      run: (db) =>
        db.orders
          .aggregate([
            { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customer" } },
            { $unwind: "$customer" },
            { $group: { _id: "$customer.city", orders: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ])
          .toArray(),
    },
  },
  indexChecks: [
    {
      title: 'db.users.findOne({ email: "asha@example.com" })',
      collection: "users",
      equality: ["email"],
      hint: "Index the field you look users up by.",
    },
    {
      title: "db.orders.find({ customerId: 1 }).sort({ date: -1 })  (a customer's orders, newest first)",
      collection: "orders",
      equality: ["customerId"],
      sort: { date: -1 },
      hint: "Equality field first, then the sort field: { customerId: 1, date: -1 }.",
    },
    {
      title: 'db.orders.find({ status: "shipped", date: { $gte: "2026-03-01" } }).sort({ date: 1 })',
      collection: "orders",
      equality: ["status"],
      sort: { date: 1 },
      hint: "Equality (status) first, then sort and range (date).",
    },
  ],
};
