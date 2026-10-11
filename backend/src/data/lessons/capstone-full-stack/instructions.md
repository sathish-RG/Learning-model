## Your mission: run Task Manager Pro on your own machine

The complete project is in the file tree below: browse it, then click **Download project** to get it all as `task-manager-pro.zip`. Then follow these steps on your computer. Take them one at a time: each one ends with a check that it worked.

### 0. What you need

- [ ] **Node.js 22 or newer.** Run `node -v` in a terminal. No Node, or an older one? Install the **LTS** version from nodejs.org.
- [ ] **A code editor** (VS Code is great) and **a terminal** (VS Code has one built in: *Terminal → New Terminal*).

### 1. Get the code

- [ ] Click **Download project**, unzip it, and open the `task-manager-pro` folder in your editor. You should see a `backend` and a `frontend` folder.

### 2. Create your database (the filing cabinet)

**Option A: MongoDB Atlas, free in the cloud (recommended)**

- [ ] Sign up at **mongodb.com/cloud/atlas**, and create a **free** cluster (the M0 tier). Any region near you is fine.
- [ ] **Database Access** → *Add New Database User*: choose a username and a password (letters and numbers are simplest). Write them down.
- [ ] **Network Access** → *Add IP Address* → *Add Current IP Address*. (Atlas only accepts connections from addresses on this list.)
- [ ] **Clusters** → *Connect* → *Drivers*: copy the connection string. It looks like `mongodb+srv://USER:<db_password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`.
- [ ] Replace `<db_password>` with your password, and add the database name `task-manager-pro` right after `.net/`:
  `mongodb+srv://USER:PASSWORD@cluster0.abcde.mongodb.net/task-manager-pro?retryWrites=true&w=majority`

**Option B: MongoDB on your computer**

- [ ] Install **MongoDB Community Server** and start it. Your connection string is `mongodb://127.0.0.1:27017/task-manager-pro`.

### 3. Configure the API (the kitchen)

- [ ] In a terminal: `cd task-manager-pro/backend`
- [ ] Copy the example settings: `cp .env.example .env` (Windows cmd: `copy .env.example .env`)
- [ ] Open `.env` and paste your connection string as `MONGODB_URI=...`
- [ ] Make a secret for signing logins: run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and paste the result as `JWT_SECRET=...`

### 4. Start the API

- [ ] `npm install` (downloads Express, Mongoose, bcryptjs, jsonwebtoken and cookie-parser into `node_modules`)
- [ ] `npm run dev`. You should see:
  `MongoDB connected: task-manager-pro` and `API listening on http://localhost:5000`
- [ ] Open **http://localhost:5000/api/health** in your browser: `{"ok":true,"database":"connected"}` 🎉
- [ ] Leave this terminal running. (`--watch` restarts the API whenever you save a backend file.)

### 5. Start the React app (the dining room)

- [ ] Open a **second** terminal: `cd task-manager-pro/frontend`
- [ ] `npm install`, then `npm run dev`
- [ ] Open **http://localhost:5173**

### 6. Use it, and watch it work

- [ ] **Create an account** and add three tasks. Watch the API terminal: every click logs a line like `POST /api/tasks → 201 (14ms)`.
- [ ] Tick a task, try the filters, delete one, and **refresh the page**: everything is still there, because it's in MongoDB now, not `localStorage`.
- [ ] Try a 2-letter task title, or a wrong password: see the error messages (and the `400` / `401` in the API terminal).
- [ ] **Log out**, create a second account: it has its own, empty list.
- [ ] **Look inside the filing cabinet.** In Atlas: *Browse Collections* (or use MongoDB Compass). Open `users`: there's a `passwordHash`, never a password. Open `tasks`: each one has a `user` field holding its owner's `_id`.

### When something goes wrong 🧯

| You see | It usually means |
|---|---|
| `Missing MONGODB_URI` | There's no `.env` file in `backend/`, or the name is misspelled |
| `Could not connect to MongoDB: ... timed out` / `ECONNREFUSED` | Atlas: your IP address isn't in **Network Access**. Local: MongoDB isn't running |
| `bad auth : authentication failed` | The username or password in the connection string is wrong (also check `<` `>` were removed) |
| `EADDRINUSE: address already in use :::5000` | Something else uses port 5000: stop it, or set `PORT=5001` in `.env` and in `frontend/vite.config.js` |
| The app says `Request failed (500)` / `ECONNREFUSED` in the Vite terminal | The API isn't running: start it first (step 4) |
| `npm: command not found` or Vite complains about the Node version | Install Node.js 22 LTS or newer, then open a new terminal |

✅ **You're done when** you can register, log in, add, tick, filter and delete tasks at http://localhost:5173, the tasks survive a refresh, and you've seen your documents in MongoDB. Then mark this Capstone as completed: you've built a full-stack app! 🎓

### Ready for more? 🚀

- **Add a feature, end to end:** due dates (a `dueDate: Date` field in the schema, an `<input type="date">` in the form, sorting by it), or editing a task's title (the `PATCH` route already accepts it!).
- **Deploy it:** put the API on a host like Render or Railway (set `MONGODB_URI`, `JWT_SECRET` and `NODE_ENV=production` there), build the React app with `npm run build`, and serve it from the same domain as the API, or set up CORS and cross-site cookies.
- **Put it on GitHub**, with this README, as a portfolio project. (Check that `.env` isn't in it!)
