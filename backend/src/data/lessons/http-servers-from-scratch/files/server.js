// Lesson 56: a restaurant API with only Node's built-in http module.
const http = require("http");
const testDrive = require("./requests");

const menu = [
  { id: 1, name: "Masala dosa", price: 120 },
  { id: 2, name: "Idli (2 pcs)", price: 60 },
  { id: 3, name: "Filter coffee", price: 40 },
];
let nextOrderId = 1;

// 1. sendJson(res, status, data, headers = {})

const server = http.createServer((req, res) => {
  // 2. GET /             → 200, an HTML welcome page

  // 3. GET /api/menu     → 200, the menu as JSON

  // 4. POST /api/orders  → read the body, then 201 Created (or 400 Bad Request)

  // 5. Any other method on /api/menu → 405, with an Allow header

  // 6. Anything else     → 404
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
  testDrive(); // locked (requests.js): calls your API and prints each reply
});
