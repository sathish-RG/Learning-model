## Why does this matter?

Before you write a single query, you decide **how to store** the data: which tables or collections, which fields, and how they connect. This is **data modeling**, and it's the decision that's hardest to change later: a good model makes every feature easy, and a poor one makes every feature a fight. It's also the heart of the classic interview question: **"SQL or NoSQL?"**

## A spreadsheet vs folders 📊📁

The two big families of databases organise information in different ways:

| | 📊 SQL: a set of spreadsheets | 📁 NoSQL (MongoDB): a cabinet of folders |
|---|---|---|
| Unit | A **row** in a **table** | A **document** in a **collection** |
| Shape | Every row has exactly the same columns | Each document is a JSON-like object, with nested objects and arrays |
| Related data | In **other tables**, linked by IDs | Often **inside** the same document |
| Putting it together | `JOIN` when you read | Already together (or `$lookup`) |
| Rules | Strict: the schema is enforced by the database | Flexible: the app (e.g. Mongoose) enforces the shape |
| Examples | PostgreSQL, MySQL, SQLite | MongoDB, Firestore, DynamoDB |

A spreadsheet is perfect when everything has the same columns, and you cross-reference sheets with ID numbers. A folder is perfect when everything about one thing (a blog post, its tags, its comments) belongs together and you usually grab it all at once.

The words map across neatly: table → **collection**, row → **document**, column → **field**, primary key → **`_id`**, JOIN → **embedding** or **`$lookup`**.

## The blog, as linked tables 🔗

In SQL, each kind of thing gets its own table, and every link is a **foreign key**:

```sql
CREATE TABLE users (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE          -- no two users with the same email
);

CREATE TABLE posts (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),   -- the author: must be a real user
  title   TEXT NOT NULL,
  body    TEXT
);
```

The **constraints** are the database guarding your data: `NOT NULL` (required), `UNIQUE` (no duplicates) and `REFERENCES` (a **foreign key**: the database refuses a post by user 99 if there's no user 99). Storing each fact once, in its own table, is called **normalization**.

## The blog, as documents: embed or reference? 📄

In MongoDB, you choose for each relationship: put the data **inside** the document (**embed**), or store just its `_id` and look it up (**reference**).

```js
// posts collection
{
  _id: 1,
  title: "Hello MongoDB",
  authorId: 1,                          // REFERENCE: the author lives in the users collection
  tags: ["mongodb", "beginners"],       // a simple array: no table needed!
  comments: [                           // EMBEDDED: the comments live inside their post
    { userId: 2, text: "Great intro!" },
    { userId: 1, text: "Thanks Ravi!" },
  ],
}
```

| Embed ✅ when the data… | Reference ✅ when the data… |
|---|---|
| belongs to **one** parent (a post's comments) | is **shared** by many (one author, many posts) |
| is **read together** with the parent | is often read **on its own** (a user's profile) |
| stays **small** (a few dozen items) | can grow **without limit** (all of a user's orders) |
| rarely changes on its own | changes, and must stay correct everywhere (a user's name) |

Embedding means **one read** gets the whole post with its comments: fast and simple. Copying the author's details into every post, though, would mean updating hundreds of posts when they change their name. So: **embed what you read together; reference what's shared**.

You can still query inside embedded data, with **dot notation**: `db.posts.find({ "comments.userId": 2 })` finds every post that Ravi commented on.

## So which one? ⚖️

| Choose SQL when… | Choose MongoDB when… |
|---|---|
| The data is highly connected (many-to-many, reports across tables) | Data is naturally a "thing with its parts" (a post, an order, a profile) |
| You need strict rules and transactions (money, bookings, stock) | The shape varies or evolves quickly |
| You run lots of ad-hoc reports | You read whole objects at a time, at large scale |

Both are excellent, and both are used by huge companies. The MERN stack uses MongoDB, and Task Manager Pro fits it nicely: a task belongs to one user, and is always read as a whole.

## Remember ✅

- SQL = spreadsheets: fixed columns, data split into tables, linked by foreign keys, joined when read.
- MongoDB = folders: flexible documents with nested objects and arrays, in collections.
- `NOT NULL`, `UNIQUE` and `REFERENCES` let a SQL database refuse bad data.
- Embed what belongs to one parent and is read with it; reference what's shared, big or changes on its own.
- Query inside embedded arrays with dot notation: `{ "comments.userId": 2 }`.
