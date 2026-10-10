## Why does this matter?

Your API keeps tasks in an array. When the server restarts, they're wiped, like writing on a whiteboard. Also, right now **anyone** can see and delete **everyone's** tasks.

- A **database** is a filing cabinet that keeps data safe, even through restarts.
- **Authentication** is a locker key: it makes sure people only open their own locker.

## MongoDB: folders of documents 🗂️

MongoDB stores data as **documents** that look just like JavaScript objects. Similar documents live together in a **collection**, like a drawer in the cabinet.

```js
{ title: "Buy milk", done: false, user: "sam" }
```

## Mongoose schemas: the form template 📋

A schema describes what every task must look like, like a printed form with fixed boxes. It stops bad data from getting in.

```js
const Task = mongoose.model('Task', new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
}));
```

## CRUD: the four things you do with data

**C**reate, **R**ead, **U**pdate, **D**elete:

```js
await Task.create({ title: "Buy milk" });         // Create
await Task.find();                                // Read
await Task.findByIdAndUpdate(id, { done: true }); // Update
await Task.findByIdAndDelete(id);                 // Delete
```

## SQL vs. NoSQL ⚖️

- **SQL** databases (like PostgreSQL or MySQL) are like **spreadsheets**: strict columns, and tables linked by IDs. Great when data is very structured, like bank accounts.
- **NoSQL** databases (like MongoDB) are like **folders of flexible documents**. Great when data varies in shape and you want to get started quickly.

The same question in each:

```sql
SELECT * FROM tasks WHERE done = false;
```

```js
Task.find({ done: false });
```

The four basic SQL commands:

```sql
INSERT INTO tasks (title) VALUES ('Buy milk');
SELECT * FROM tasks;
UPDATE tasks SET done = true WHERE id = 1;
DELETE FROM tasks WHERE id = 1;
```

## Passwords: blend, never store 🔒

Never save passwords as plain text. Store a **hash** instead. Hashing is like a blender: you can turn fruit into a smoothie, but you can't turn the smoothie back into fruit. At login, you blend what the user typed and check if the smoothies match.

## JWT: a festival wristband 🎟️

Checking a password on every request would be slow. Instead, after you log in once, the server gives you a **token** (a JWT), like a wristband at a festival. You show it with each request, staff check it quickly, and it expires after a while.

## Remember ✅

- A **database** keeps data safe across restarts, and **MongoDB** stores documents.
- **CRUD** = Create, Read, Update, Delete.
- **SQL** = strict tables, **NoSQL** = flexible documents.
- **Hash** passwords, and use a **JWT** wristband to prove who you are.
