# 🚀 Deploying DevPrep to Production

A step-by-step manual for putting DevPrep (the "Absolute Beginner to Pro" MERN course) online:

| Part | Service | What runs there |
|---|---|---|
| 🗄️ Database | **MongoDB Atlas** | Users, progress, streaks and the 67 lessons |
| 🍳 Backend | **Render** (or Railway) | The Express API in `backend/` |
| 🪑 Frontend | **Vercel** | The React app in `frontend/` |

Plan for about **45 minutes** the first time. Do the parts **in order**: each one needs something from the one before.

---

## 📋 Contents

1. [Before you start](#0-before-you-start)
2. [Database: MongoDB Atlas](#1-database-mongodb-atlas)
3. [Backend: Render (or Railway)](#2-backend-render-or-railway)
4. [Seeding the 67 lessons in production](#3-seeding-the-67-lessons-in-production) ⚠️ *crucial*
5. [Frontend: Vercel](#4-frontend-vercel)
6. [Connect the two](#5-connect-the-frontend-and-the-backend)
7. [Post-deployment checklist](#6-post-deployment-checklist)
8. [Troubleshooting](#7-troubleshooting)
9. [Updating the app later](#8-updating-the-app-later)

---

## 0. Before you start

- [ ] The code is pushed to a **GitHub** repository (Render and Vercel deploy straight from it).
- [ ] **No `.env` file is committed.** Both `backend/.gitignore` and `frontend/.gitignore` already exclude it. Check with:

  ```bash
  git ls-files | grep -E '(^|/)\.env$'    # must print nothing
  ```
- [ ] **Node.js 22** or newer on your own computer (`node -v`). You'll use it to generate secrets, and possibly to seed.
- [ ] Free accounts on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), [Render](https://render.com) and [Vercel](https://vercel.com).

### How the pieces talk to each other 🔌

DevPrep keeps users logged in with an **httpOnly cookie** set by the API. Browsers only send that cookie freely when the page and the API are on the **same site**. A `*.vercel.app` page and a `*.onrender.com` API are **different sites**, so this guide uses the setup that avoids the problem:

```
Browser ──▶ https://your-app.vercel.app            (React app, served by Vercel)
        └─▶ https://your-app.vercel.app/api/v1/... (Vercel forwards it ──▶ Render API ──▶ Atlas)
```

**Vercel forwards every `/api` request to Render** (a *rewrite*). The browser only ever sees one website, so the cookie, CORS and Safari's tracking protection all just work. *(A direct cross-site setup is described in [Option B](#option-b-direct-cross-site-requests) if you prefer it.)*

---

## 1. Database: MongoDB Atlas

### 1.1 Create a cluster

1. Log in to **MongoDB Atlas** → **Create** a new project (e.g. `DevPrep`).
2. Click **Build a Database / Create cluster** → choose **M0 (Free)**.
3. Pick a provider and a **region close to your Render region** (e.g. AWS `us-east-1` with Render *Ohio/Virginia*, or `ap-south-1` with Render *Singapore*): it keeps every API request fast.
4. Name it (e.g. `devprep-cluster`) → **Create**.

### 1.2 Create a database user

1. **Security → Database Access → Add New Database User**.
2. Authentication: **Password**. Username: `devprep-api`. Click **Autogenerate Secure Password** and **copy it somewhere safe**.
3. Built-in role: **Read and write to any database** (or, stricter: *Specific privileges → `readWrite` on `devprep`*).
4. **Add User**.

> 💡 Prefer a password with only letters and numbers. If it contains `@ : / ? # [ ] %`, it must be **URL-encoded** in the connection string (`@` → `%40`, `#` → `%23`…).

### 1.3 Allow network access

1. **Security → Network Access → Add IP Address**.
2. Render's and Railway's free/standard plans don't have a fixed outgoing IP address, so choose **Allow access from anywhere** (`0.0.0.0/0`) → **Confirm**.

> 🔐 This is safe **only** with a strong, unique database password (from step 1.2). On paid Render plans you can instead add the static outbound IPs listed under your service's **Connect → Outbound** tab.

### 1.4 Get the connection string

1. **Database → Connect → Drivers** (Node.js).
2. Copy the string. It looks like:

   ```
   mongodb+srv://devprep-api:<db_password>@devprep-cluster.abcde.mongodb.net/?retryWrites=true&w=majority&appName=devprep-cluster
   ```
3. Make two changes:
   - replace `<db_password>` with the real password (no `<` `>`);
   - add the **database name** `devprep` right after `.mongodb.net/`.

   ```
   mongodb+srv://devprep-api:YOUR_PASSWORD@devprep-cluster.abcde.mongodb.net/devprep?retryWrites=true&w=majority&appName=devprep-cluster
   ```

This is your **`MONGO_URI`**. Keep it secret.

---

## 2. Backend: Render (or Railway)

### 2.1 Generate a JWT secret

The API refuses to start in production with a secret shorter than 32 characters. Generate a strong one:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the 96-character result: this is your **`JWT_SECRET`**.

### 2.2 Environment variables

| Variable | Value | Required | Notes |
|---|---|:---:|---|
| `NODE_ENV` | `production` | ✅ | Turns on secure cookies, stricter rate limits and production logging |
| `MONGO_URI` | Your Atlas string from step 1.4 | ✅ | Must include `/devprep` |
| `JWT_SECRET` | The value from step 2.1 | ✅ | At least 32 characters |
| `CLIENT_URL` | `https://your-app.vercel.app` | ✅ | The **exact** frontend origin: `https`, no trailing `/`. Used for CORS. Use a placeholder now, and fix it in [step 5](#5-connect-the-frontend-and-the-backend). |
| `JWT_EXPIRES_IN` | `7d` | | How long a login lasts (default `7d`) |
| `COOKIE_SAME_SITE` | `lax` | | Keep `lax` with the recommended setup. `none` only for [Option B](#option-b-direct-cross-site-requests). |
| `NODE_VERSION` | `22` | | Render only: pins the Node.js version |
| `PORT` | *(leave unset)* | | Render and Railway set it automatically; the API reads it (default `5000` locally) |

> ⚠️ Note the name: the backend reads **`MONGO_URI`** (not `MONGODB_URI`).

### 2.3 Deploy on Render

1. **Render Dashboard → New → Web Service** → connect your GitHub repository.
2. Fill in the settings:

   | Setting | Value |
   |---|---|
   | **Name** | `devprep-api` (your URL becomes `https://devprep-api.onrender.com`) |
   | **Region** | The same area as your Atlas cluster |
   | **Branch** | `main` |
   | **Root Directory** | `backend` |
   | **Runtime** | Node |
   | **Build Command** | `npm ci` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free to try it out; **Starter** or above for real users (see the note below) |

3. **Environment → Add Environment Variable**: add every variable from the table in 2.2.
4. **Advanced → Health Check Path**: `/api/v1/health`
5. **Create Web Service**. Watch the logs until you see:

   ```
   MongoDB connected: devprep-cluster-shard-00-01.abcde.mongodb.net/devprep
   Server running in production mode on port 10000
   ```
6. Open `https://devprep-api.onrender.com/api/v1/health`. You should get:

   ```json
   { "success": true, "message": "OK", "data": { "status": "up", "database": "connected", ... } }
   ```

> 💤 **Free instances sleep** after 15 minutes without traffic, and the first request then takes up to a minute to wake them. The app gives up after 10 seconds and shows *"Can't reach the server"*, so a learner's first click can fail. Use a paid instance for real users. Free instances also have **no Shell**, which affects [seeding](#3-seeding-the-67-lessons-in-production).

### 2.3 (alternative) Deploy on Railway

1. **New Project → Deploy from GitHub repo** → pick the repository.
2. Open the service → **Settings**:
   - **Root Directory**: `/backend`
   - **Build Command**: `npm ci` · **Start Command**: `npm start`
   - **Networking → Generate Domain** (e.g. `https://devprep-api.up.railway.app`)
   - **Healthcheck Path**: `/api/v1/health`
3. **Variables**: add the variables from 2.2 (no `NODE_VERSION` or `PORT` needed).
4. Deploy, and open `https://<your-domain>/api/v1/health` to check.

---

## 3. Seeding the 67 lessons in production

A brand-new database is **empty**: no lessons means an empty dashboard. The seed script copies the whole course (8 phases, 62 lessons and 5 checkpoints) from `backend/src/data/curriculum.js` into MongoDB.

### 3.1 The two commands

| Command | What it does | When to use it |
|---|---|---|
| `npm run seed:reset` | 🧨 Deletes **all** lessons, **all** learners' progress and streaks, sets everyone's XP to 0, then inserts all 67 lessons | **Once**, on the first deployment (an empty database). **Never** once real learners have signed up, unless you mean to wipe their progress. |
| `npm run seed` | ♻️ Inserts new lessons and updates changed ones, matched by slug, so lesson IDs and everyone's progress are **kept**. Removes lessons that are no longer in the course. | Every time lesson content changes. Safe to run as often as you like. |

### 3.2 Build the database indexes (once)

In production the API does **not** create MongoDB indexes automatically (`autoIndex` is off, so large collections never block). The seed script builds the lessons' indexes, but you must build the others **once**. They include the **unique email** index and the one that stops a lesson's progress (and XP) from being recorded twice. Run this from the `backend` folder, wherever you run the seed (see 3.3):

```bash
node --input-type=module -e "
import { connectDB, disconnectDB } from './src/config/db.js';
import User from './src/models/User.js';
import Progress from './src/models/Progress.js';
import Streak from './src/models/Streak.js';
await connectDB();
for (const Model of [User, Progress, Streak]) {
  await Model.syncIndexes();
  console.log(Model.modelName, (await Model.listIndexes()).map((index) => index.name).join(', '));
}
await disconnectDB();
"
```

Expected output:

```
User _id_, email_1
Progress _id_, user_1_topic_1
Streak _id_, user_1
```

### 3.3 Where to run the commands

Pick **one** of these options. They all run the same script against the same Atlas database.

#### Option 1: Render Shell (paid Render instances)

1. Render Dashboard → your `devprep-api` service → **Shell** tab.
2. You start in the repository folder. Move into the backend (if `ls` already shows `src` and `package.json`, you're there):

   ```bash
   cd backend
   ```
3. First deployment only (empty database):

   ```bash
   npm run seed:reset
   ```
4. Build the indexes: paste the command from [3.2](#32-build-the-database-indexes-once).
5. Confirm the sync (this is the command for every future content update):

   ```bash
   npm run seed
   ```

The Shell already has all your Render environment variables, so nothing else is needed.

#### Option 2: From your own computer (works with free plans)

The seed script connects to whatever database `MONGO_URI` points at, so you can run it locally against Atlas. Your own IP is covered by the `0.0.0.0/0` rule from step 1.3.

```bash
git clone https://github.com/<you>/<repo>.git
cd <repo>/backend
npm ci
```

**macOS / Linux / Git Bash:**

```bash
export MONGO_URI='mongodb+srv://devprep-api:YOUR_PASSWORD@devprep-cluster.abcde.mongodb.net/devprep?retryWrites=true&w=majority'
export JWT_SECRET='seed-only-placeholder-not-used-by-the-seed'

npm run seed:reset      # first deployment only
# ...then paste the index command from 3.2...
npm run seed            # every later content update
```

**Windows PowerShell:**

```powershell
$env:MONGO_URI = 'mongodb+srv://devprep-api:YOUR_PASSWORD@devprep-cluster.abcde.mongodb.net/devprep?retryWrites=true&w=majority'
$env:JWT_SECRET = 'seed-only-placeholder-not-used-by-the-seed'

npm run seed:reset      # first deployment only
npm run seed            # every later content update
```

*(For the index command on Windows, use Git Bash or WSL: its multi-line quoting is bash-style.)*

> 💡 Variables set in the terminal **win** over any local `backend/.env`, so this can't accidentally seed your local database. Double-check the `MONGO_URI` points at Atlas before running `seed:reset`. `JWT_SECRET` only has to exist: the seed never signs tokens.

#### Option 3: Railway CLI

```bash
npm i -g @railway/cli
railway login
cd backend
railway link                       # choose the project and the API service
railway run npm run seed:reset     # first deployment only
railway run npm run seed           # every later content update
```

`railway run` runs the command **on your computer** with the service's Railway variables (including `MONGO_URI`). Run the index command from 3.2 with `railway run` in front of it too (`railway run node --input-type=module -e "..."`), or use Option 2.

### 3.4 Check that it worked

The seed prints a summary. All **67** items must be there, and published:

```
Topics seeded: 67 inserted, 0 updated, 0 removed
┌─────────┬──────────────────────────────────────┬─────────┬─────────────┬───────────┬─────────┐
│ (index) │ phase                                │ lessons │ checkpoints │ published │ order   │
├─────────┼──────────────────────────────────────┼─────────┼─────────────┼───────────┼─────────┤
│ 0       │ 'Phase 1: HTML'                      │ 8       │ 1           │ 9         │ '1–9'   │
│ 1       │ 'Phase 2: CSS'                       │ 10      │ 1           │ 11        │ '10–20' │
│ 2       │ 'Phase 3: JavaScript Fundamentals'   │ 8       │ 0           │ 8         │ '21–28' │
│ 3       │ 'Phase 4: JavaScript in the Browser' │ 4       │ 1           │ 5         │ '29–33' │
│ 4       │ 'Phase 5: Advanced JavaScript'       │ 7       │ 0           │ 7         │ '34–40' │
│ 5       │ 'Phase 6: React'                     │ 11      │ 1           │ 12        │ '41–52' │
│ 6       │ 'Phase 7: Node.js & Express'         │ 8       │ 0           │ 8         │ '53–60' │
│ 7       │ 'Phase 8: Databases'                 │ 6       │ 1           │ 7         │ '61–67' │
└─────────┴──────────────────────────────────────┴─────────┴─────────────┴───────────┴─────────┘
```

On later runs of `npm run seed`, the first line reads like `0 inserted, 67 updated, 0 removed`. That's expected.

You can also check in **Atlas → Database → Browse Collections → `devprep.topics`**: there should be **67 documents**.

### 3.5 Optional: sync lessons automatically on every deploy

`npm run seed` is safe to repeat, so you can let every deploy keep the lessons in sync with the code:

- **Render (paid):** Settings → **Pre-Deploy Command**: `npm run seed`
- **Render (free) / Railway:** set the Build Command to `npm ci && npm run seed` (environment variables are available during the build).

> 🛑 **Never** put `seed:reset` in a build or deploy command: it would wipe every learner's progress on each deploy.

---

## 4. Frontend: Vercel

### 4.1 Add the Vercel configuration

Create **`frontend/vercel.json`**, replacing `devprep-api.onrender.com` with your API's address from step 2 (Render or Railway), then commit and push it:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://devprep-api.onrender.com/api/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

| Rule | Why it's needed |
|---|---|
| `/api/:path*` → your API | Forwards API calls to Render, so the app and the API look like **one site** (the cookie works, and no CORS is needed) |
| `/(.*)` → `/index.html` | DevPrep is a single-page app: without this, refreshing a page like `/topics/your-first-web-page` shows Vercel's 404 |

### 4.2 Environment variables

| Variable | Value | Notes |
|---|---|---|
| `VITE_API_BASE_URL` | `/api/v1` | Where the app sends API requests. With the rewrite above, keep it **relative**: `/api/v1` (also the default if it's unset). |

> ⚠️ The variable is called **`VITE_API_BASE_URL`** in this project (see `frontend/src/utils/api.js`), not `VITE_API_URL`, and it must end with **`/api/v1`**.
>
> Vite **bakes** `VITE_*` variables into the build. After changing one, you must **redeploy**: restarting isn't enough.

### 4.3 Deploy

1. **Vercel Dashboard → Add New → Project** → import the repository.
2. Configure:

   | Setting | Value |
   |---|---|
   | **Root Directory** | `frontend` |
   | **Framework Preset** | Vite |
   | **Install Command** | `npm ci` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |
   | **Environment Variables** | `VITE_API_BASE_URL` = `/api/v1` |

3. **Deploy**. You'll get a URL like `https://devprep.vercel.app`.
4. Check that the forwarding works: open `https://devprep.vercel.app/api/v1/health` and you should see the same `"status":"up"` JSON as in step 2.

To build locally exactly as Vercel does:

```bash
cd frontend
npm ci
npm run build       # outputs frontend/dist
npm run preview     # serves the build on http://localhost:4173
```

---

## 5. Connect the frontend and the backend

1. Copy your Vercel production URL, e.g. `https://devprep.vercel.app`.
2. **Render → devprep-api → Environment**: set `CLIENT_URL=https://devprep.vercel.app` (exactly: `https`, no trailing slash) → **Save Changes** (Render redeploys).
3. Using a custom domain (e.g. `https://learn.example.com`)? Add it in **Vercel → Settings → Domains**, then set `CLIENT_URL` to **that** domain instead.

---

## 6. Post-deployment checklist

Open your Vercel URL in a **private/incognito window** and work down the list.

### 🔌 API connectivity

- [ ] `https://<api>/api/v1/health` returns `"status":"up"` and `"database":"connected"`.
- [ ] `https://<your-app>.vercel.app/api/v1/health` returns the same (the Vercel rewrite works).
- [ ] The Render logs show no `Missing required environment variables` or `MongoDB error` lines.

### 🔐 Authentication

- [ ] **Register** a new account → you land on the dashboard ("Welcome back, …").
- [ ] DevTools → **Application → Cookies**: a `token` cookie exists with **HttpOnly ✓**, **Secure ✓**, **SameSite Lax**.
- [ ] **Refresh** the page → you're still logged in.
- [ ] **Log out**, then log in again → it works. A **wrong password** shows an error message.
- [ ] Registering the **same email twice** shows *"An account with this email already exists"*.

### 📚 Lessons and the dashboard

- [ ] The dashboard's learning path shows **8 phases**, and the progress card reads **0 / 67**.
- [ ] No lesson shows "coming soon" (all 67 are published).
- [ ] Open **Lesson 1: Your First Web Page** → the **Learn** step renders → **Practice** opens the editor and the live preview.
- [ ] Spot-check one lesson per runtime: Phase 3 (console), Phase 6 (React), Phase 7 (a Node server), Phase 8 (SQL results tables). The first Node lesson may take ~10 seconds to install its packages.
- [ ] **Save** code, refresh, and the code is still there. **Mark as completed** shows the celebration, and XP and the streak go up.
- [ ] The **Capstone** (item 67) shows the file tree, and **Download project** saves `task-manager-pro.zip`.
- [ ] Refresh directly on a deep link like `/topics/your-first-web-page` → it loads (no 404).

### 🗄️ Database

- [ ] Atlas → `devprep.users` has your test user, with a `password` hash (never plain text).
- [ ] Atlas → each collection's **Indexes** tab shows the indexes from [step 3.2](#32-build-the-database-indexes-once).
- [ ] Delete your test account(s) from `devprep.users` (and their documents in `progresses` and `streaks`) if you don't want them in production.

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Render logs: `Missing required environment variables: MONGO_URI, JWT_SECRET` | The variables aren't set on the service, or are misspelled | Add them under **Environment** (note: `MONGO_URI`, not `MONGODB_URI`) |
| `JWT_SECRET must be at least 32 characters in production` | The secret is too short | Generate one with the command in 2.1 |
| `Failed to connect to MongoDB: ... Server selection timed out` | Atlas is blocking Render's IP address | Atlas → Network Access → allow `0.0.0.0/0` (step 1.3) |
| `bad auth : authentication failed` | Wrong user or password in `MONGO_URI`, or unencoded special characters | Re-copy the string; URL-encode the password or regenerate it with letters and numbers only |
| The dashboard loads but shows **no lessons** | The production database was never seeded | Run [step 3](#3-seeding-the-67-lessons-in-production) |
| *"Can't reach the server"* on the first request | A free Render instance was asleep | Wait a minute and retry; use a paid instance for real users |
| 404 when refreshing a page | `vercel.json` is missing the `/(.*)` → `/index.html` rule | Add it (step 4.1) and redeploy |
| Browser console: **CORS error** | The app calls the API directly, and `CLIENT_URL` doesn't exactly match the frontend origin | Prefer the rewrite setup (`VITE_API_BASE_URL=/api/v1`). Otherwise make `CLIENT_URL` match exactly, with no trailing `/` |
| Login "works" but you're logged out on the next request | The cookie isn't being sent across sites | Use the rewrite setup, or follow [Option B](#option-b-direct-cross-site-requests) fully |
| `Too many requests, please try again later` (429) | The API rate limit (300 requests per 15 minutes per IP; 20 for login/register) | Wait 15 minutes. With the Vercel rewrite, requests reach Render from Vercel's servers: if many different learners get 429s together, the API's `trust proxy` setting (`backend/src/app.js`) needs reviewing for this two-proxy setup |
| The practice editor or preview stays blank | The browser can't reach CodeSandbox's servers (the in-browser runtimes load from `*.codesandbox.io`) | Disable aggressive ad/script blockers, or allow `codesandbox.io` on restrictive networks |
| `Seeding failed: ...` | Usually a connection problem (same causes as above) | Check `MONGO_URI` and Atlas Network Access, then re-run |

### Option B: direct cross-site requests

If you'd rather **not** use the Vercel rewrite, the app can call the API's own URL directly:

- **Vercel:** `VITE_API_BASE_URL=https://devprep-api.onrender.com/api/v1` (and keep only the `/(.*)` rule in `vercel.json`).
- **Render:** `CLIENT_URL=https://devprep.vercel.app` and `COOKIE_SAME_SITE=none`.

Be aware of the trade-offs:

- Browsers treat the login cookie as a **third-party cookie**. **Safari**, **Brave** and Firefox's strict mode block those, so logins silently fail for those learners. Chrome is restricting them too.
- With `SameSite=None`, the cookie is sent on requests started by **any** website, so you should add **CSRF protection** first.

If you use custom domains on the **same site** instead, both problems go away, and `COOKIE_SAME_SITE` can stay `lax`. For example: `learn.example.com` for the app, `api.example.com` for the API.

---

## 8. Updating the app later

| You changed… | What to do |
|---|---|
| Backend code | Push to `main`: Render (or Railway) redeploys automatically |
| Frontend code | Push to `main`: Vercel redeploys automatically (each pull request also gets a preview URL) |
| **Lesson content** (`backend/src/data/…`) | Push, wait for the backend deploy, then run **`npm run seed`** (step 3.3), unless you enabled [automatic syncing](#35-optional-sync-lessons-automatically-on-every-deploy). Learners keep their progress. |
| A `VITE_*` variable | Change it in Vercel, then **Redeploy** (it's built into the bundle) |
| A backend variable | Change it in Render/Railway: the service restarts with it |

### 🔒 Keep it secure

- Never commit `.env` files. Keep secrets only in the Render/Railway/Vercel dashboards.
- Changing `JWT_SECRET` logs **everyone** out (their cookies become invalid). That's useful if it ever leaks.
- Atlas **M0** has no automatic backups. Before a risky change, export the data (`mongodump --uri "$MONGO_URI"`), or upgrade to a cluster tier with backups once you have real learners.
