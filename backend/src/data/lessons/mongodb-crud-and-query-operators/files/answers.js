// Hidden: the expected answers. `writes` lists the collections a write query should change.
const NEW_PRODUCT = { name: "Smart Watch", category: "electronics", price: 4999, stock: 10, rating: 4.2, tags: ["wearable", "wireless"] };

module.exports = {
  queries: {
    q1: { title: "Kitchen products: name and price only (no _id), cheapest first", run: (db) => db.products.find({ category: "kitchen" }, { name: 1, price: 1, _id: 0 }).sort({ price: 1 }).toArray() },
    q2: { title: "In stock and under ₹1000: name, price and stock, cheapest first", run: (db) => db.products.find({ price: { $lt: 1000 }, stock: { $gt: 0 } }, { name: 1, price: 1, stock: 1, _id: 0 }).sort({ price: 1 }).toArray() },
    q3: { title: "Electronics or sports rated 4.5 or more: name, category and rating, best first", run: (db) => db.products.find({ category: { $in: ["electronics", "sports"] }, rating: { $gte: 4.5 } }, { name: 1, category: 1, rating: 1, _id: 0 }).sort({ rating: -1 }).toArray() },
    q4: { title: "Out of stock, or over ₹5000: name only, A to Z", run: (db) => db.products.find({ $or: [{ stock: 0 }, { price: { $gt: 5000 } }] }, { name: 1, _id: 0 }).sort({ name: 1 }).toArray() },
    q5: { title: "Tagged \"wireless\": name and price, most expensive first", run: (db) => db.products.find({ tags: "wireless" }, { name: 1, price: 1, _id: 0 }).sort({ price: -1 }).toArray() },
    q6: { title: "Page 2 of all products, 4 per page, A to Z: name only", run: (db) => db.products.find({}, { name: 1, _id: 0 }).sort({ name: 1 }).skip(4).limit(4).toArray() },
    q7: { title: "How many products are in stock?", run: (db) => db.products.countDocuments({ stock: { $gt: 0 } }) },
    q8: { title: "Add the Smart Watch", writes: ["products"], run: (db) => db.products.insertOne(NEW_PRODUCT) },
    q9: { title: "Restock: +20 stock and restocked: true for every out-of-stock product", writes: ["products"], run: (db) => db.products.updateMany({ stock: 0 }, { $inc: { stock: 20 }, $set: { restocked: true } }) },
    q10: { title: "The Desk Lamp now costs ₹999", writes: ["products"], run: (db) => db.products.updateOne({ name: "Desk Lamp" }, { $set: { price: 999 } }) },
    q11: { title: "Delete every product rated below 4.0", writes: ["products"], run: (db) => db.products.deleteMany({ rating: { $lt: 4 } }) },
  },
};
