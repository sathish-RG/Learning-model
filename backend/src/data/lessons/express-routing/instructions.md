## Your mission: the menu API, the Express way

Write it in `server.js`. `menu.js` (the dishes) and `public/index.html` (a menu page, the "dining room") are locked. The page only sends `GET` requests, so it works right in the preview.

1. **The page.** `GET /` → send the menu page. Read it with `fs.readFileSync(PAGE, "utf8")` and send it with `res.type("html").send(...)`. The preview shows the page, but each button says there's no reply yet.
2. **The menu, with filters.** `GET /api/menu` → `res.json` with the dishes. When they're given in the query string:
   - `?category=drinks` keeps only that category
   - `?maxPrice=80` keeps dishes that cost **80 or less** (remember: query values are text!)
   - both together apply both filters
3. **One dish.** `GET /api/menu/:id` → the dish with that `id` (convert it to a number). If there's none: `404` with `{ "error": "No dish with id 42" }` (with the real id).
4. **The specials.** `GET /api/menu/specials` → only the dishes where `special` is `true`. Click **⭐ Specials** in the page. Does it work? If you get `No dish with id specials`, move the route so it comes **before** `/api/menu/:id`.

✅ **You're done when** every button on the page works (`Dish #42` shows the 404 error), and the test drive's replies are `200` five times (with 2 drinks, 3 dishes up to ₹80, 1 dessert, 2 specials and `Paneer butter masala`), then:

```
← 404 Not Found  (Content-Type: application/json)
  {"error":"No dish with id 42"}
```
