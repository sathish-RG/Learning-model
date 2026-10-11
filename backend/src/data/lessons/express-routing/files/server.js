// Lesson 57: the menu API again, with Express (the receptionist) doing the paperwork.
const fs = require("fs");
const path = require("path");
const express = require("express");
const menu = require("./menu");
const testDrive = require("./requests");

const app = express();
const PAGE = path.join(__dirname, "public", "index.html");

// 1. GET /  → the menu page (public/index.html)
//    Real projects serve a folder of files with app.use(express.static("public")). This
//    sandbox can't stream files, so read the page instead: fs.readFileSync(PAGE, "utf8")

// 2. GET /api/menu  → every dish, filtered by ?category= and ?maxPrice= when they're given

// 3. GET /api/menu/specials  → only the specials (careful where you put this one!)

// 4. GET /api/menu/:id  → one dish, or 404

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
  testDrive(); // locked (requests.js): calls your API and prints each reply
});
