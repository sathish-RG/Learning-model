// A tiny in-memory MongoDB for practice, built on "mingo" (MongoDB's query language in
// JavaScript). It speaks the same commands as mongosh, MongoDB's own shell:
//
//   db.products.find({ price: { $lt: 500 } }, { name: 1 }).sort({ price: 1 }).limit(3).toArray()
//   db.orders.aggregate([{ $match: ... }, { $group: ... }]).toArray()
//   db.products.updateOne({ _id: 1 }, { $set: { price: 99 } })
//
// (In a Node app, the MongoDB driver and Mongoose use these same commands, with `await`.)
const mingo = require("mingo");

const clone = (value) => JSON.parse(JSON.stringify(value));
const indexName = (keys) => Object.entries(keys).map(([field, dir]) => `${field}_${dir}`).join("_");

function createDb(data) {
  const collections = clone(data);
  const indexes = {};
  const options = { collectionResolver: (name) => collections[name] || [] };

  // find() returns a cursor: chain sort, skip and limit, then read it with toArray()
  class Cursor {
    constructor(docs) {
      this.docs = docs;
    }
    sort(spec) {
      this.docs = mingo.find(this.docs, {}).sort(spec).all();
      return this;
    }
    skip(n) {
      this.docs = this.docs.slice(n);
      return this;
    }
    limit(n) {
      this.docs = n > 0 ? this.docs.slice(0, n) : this.docs;
      return this;
    }
    toArray() {
      return clone(this.docs);
    }
    count() {
      return this.docs.length;
    }
  }

  const nextId = (docs) => {
    const numbers = docs.map((doc) => doc._id).filter((id) => typeof id === "number");
    return numbers.length ? Math.max(...numbers) + 1 : docs.length + 1;
  };

  const collection = (name) => {
    if (!collections[name]) collections[name] = [];
    const docs = () => collections[name];
    const matches = (filter) => {
      const query = new mingo.Query(filter || {});
      return (doc) => query.test(doc);
    };
    const update = (many) => (filter, changes) => {
      const fn = many ? mingo.updateMany : mingo.updateOne;
      const result = fn(docs(), filter || {}, changes);
      return { acknowledged: true, matchedCount: result.matchedCount, modifiedCount: result.modifiedCount };
    };
    const remove = (many) => (filter) => {
      const test = matches(filter);
      let deletedCount = 0;
      collections[name] = docs().filter((doc) => {
        if (test(doc) && (many || deletedCount === 0)) {
          deletedCount++;
          return false;
        }
        return true;
      });
      return { acknowledged: true, deletedCount };
    };

    return {
      find: (filter = {}, projection) => new Cursor(mingo.find(docs(), filter, projection).all()),
      findOne: (filter = {}, projection) => {
        const [doc] = mingo.find(docs(), filter, projection).limit(1).all();
        return doc ? clone(doc) : null;
      },
      countDocuments: (filter = {}) => docs().filter(matches(filter)).length,
      distinct: (field, filter = {}) => [...new Set(docs().filter(matches(filter)).map((doc) => doc[field]))].filter((v) => v !== undefined),
      insertOne: (doc) => {
        const saved = { _id: nextId(docs()), ...clone(doc) };
        docs().push(saved);
        return { acknowledged: true, insertedId: saved._id };
      },
      insertMany: (list) => {
        const insertedIds = list.map((doc) => {
          const saved = { _id: nextId(docs()), ...clone(doc) };
          docs().push(saved);
          return saved._id;
        });
        return { acknowledged: true, insertedCount: insertedIds.length, insertedIds };
      },
      updateOne: update(false),
      updateMany: update(true),
      deleteOne: remove(false),
      deleteMany: remove(true),
      aggregate: (pipeline) => new Cursor(mingo.aggregate(docs(), pipeline, options)),
      createIndex: (keys) => {
        indexes[name] = indexes[name] || [];
        indexes[name].push(clone(keys));
        return indexName(keys);
      },
      getIndexes: () => [{ _id: 1 }, ...(indexes[name] || [])].map((key) => ({ name: indexName(key), key })),
    };
  };

  // db.products, db.orders... any name works, like in mongosh
  const db = new Proxy(
    { getCollection: collection },
    { get: (target, prop) => (prop in target ? target[prop] : typeof prop === "string" ? collection(prop) : undefined) },
  );
  return { db, collections, indexes };
}

module.exports = { createDb };
