## Why does this matter?

MongoDB is the **M** in MERN. Instead of tables and SQL, it stores **documents** (JSON-like objects) in **collections**, and you query them with... more objects. If you know JavaScript objects, you already know half of MongoDB. This lesson covers the four things every app does with its data: **C**reate, **R**ead, **U**pdate and **D**elete (CRUD).

## The folder cabinet 📁

A MongoDB **database** is a cabinet; each **collection** (`products`, `users`) is a drawer; each **document** is a folder with everything about one thing:

```js
{
  _id: 1,                              // every document has a unique _id
  name: "Wireless Mouse",
  category: "electronics",
  price: 799,
  tags: ["computer", "wireless"],      // arrays and nested objects are welcome
}
```

The commands below are written the way you type them in **mongosh**, MongoDB's own shell: `db.<collection>.<command>(...)`. In a Node app, the MongoDB driver (and Mongoose, Lesson 66) use the **same** commands, with `await`.

## Reading: find(filter, projection) 🔍

```js
db.products.find({ category: "kitchen" })                    // filter: which documents
db.products.find({ category: "kitchen" }, { name: 1, _id: 0 }) // projection: which fields
```

- The **filter** is an object of conditions. `{}` matches everything.
- The **projection** picks fields: `1` = include, `0` = exclude. `_id` is included unless you say `_id: 0`.
- `find` returns a **cursor**: chain `.sort()`, `.skip()` and `.limit()`, then read it with `.toArray()`.

```js
db.products.find({}).sort({ price: -1 }).skip(10).limit(10).toArray(); // page 2, priciest first
```

`.sort({ price: 1 })` is smallest first; `-1` is largest first. For page `p` of size `n`: `.skip((p - 1) * n).limit(n)`.

## Query operators: conditions with a $ 💲

Several conditions in one filter must **all** be true (an implicit AND):

```js
db.products.find({ category: "sports", price: { $lt: 1000 } });  // sports AND under 1000
```

| Operator | Means | Example |
|---|---|---|
| `$eq` / `$ne` | equal / not equal | `{ category: { $ne: "home" } }` |
| `$gt` / `$gte` | greater than / or equal | `{ rating: { $gte: 4.5 } }` |
| `$lt` / `$lte` | less than / or equal | `{ price: { $lt: 1000 } }` |
| `$in` / `$nin` | one of a list / none of a list | `{ category: { $in: ["sports", "home"] } }` |
| `$or` | at least one condition is true | `{ $or: [{ stock: 0 }, { price: { $gt: 5000 } }] }` |
| `$and` | all are true (needed only for repeated fields) | `{ $and: [{ price: { $gt: 100 } }, { price: { $ne: 500 } }] }` |
| `$exists` | the field is there (or not) | `{ restocked: { $exists: true } }` |

Two handy shortcuts:

- **Arrays match by item.** `{ tags: "wireless" }` finds documents whose `tags` array **contains** `"wireless"`.
- **Ranges** combine: `{ price: { $gte: 500, $lte: 2000 } }`.

Counting: `db.products.countDocuments({ stock: 0 })` returns a number.

## Creating: insertOne / insertMany ➕

```js
db.products.insertOne({ name: "Smart Watch", price: 4999 });
// { acknowledged: true, insertedId: ... }   MongoDB adds the _id for you
```

No table to create first, no schema to declare: the collection appears with its first document. That's flexible, and it's also why Mongoose adds rules back in (Lesson 66).

## Updating: updateOne / updateMany ✏️

Updates take a **filter** (which documents) and **update operators** (what to change):

```js
db.products.updateOne({ name: "Desk Lamp" }, { $set: { price: 999 } });
db.products.updateMany({ stock: 0 }, { $inc: { stock: 20 }, $set: { restocked: true } });
```

| Operator | Does |
|---|---|
| `$set` | Sets fields (adds them if they're missing) |
| `$unset` | Removes fields |
| `$inc` | Adds to a number (`-1` subtracts) |
| `$push` / `$pull` | Adds to / removes from an array |

⚠️ Always use an operator like `$set`. Without one, many tools replace the **whole** document with the object you pass, and every other field is gone.

## Deleting: deleteOne / deleteMany 🗑️

```js
db.products.deleteMany({ rating: { $lt: 4 } }); // { acknowledged: true, deletedCount: 1 }
```

⚠️ `deleteMany({})` matches **everything**. Always double-check the filter of a delete (try it with `find` first!).

## Remember ✅

- `find(filter, projection)` → `.sort()` → `.skip()` → `.limit()` → `.toArray()`.
- Several conditions = AND; use `$or` for "either"; compare with `$gt`, `$lt`, `$in`…
- `{ tags: "x" }` matches arrays that contain `"x"`.
- Change documents with `updateOne`/`updateMany` + `$set`, `$inc`, `$push`; never forget the operator.
- Test a filter with `find` before using it in `deleteMany`.
