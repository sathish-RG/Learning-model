// Locked: your test drive. Each request is sent to your server for real, and the console
// shows what went out (→) and what came back (←): the status code, key headers and body.
const { request } = require("./api-client");

module.exports = async function testDrive() {
  console.log("--- Test drive ---");
  await request("GET", "/api/menu?category=drinks"); //               expect 200: 2 drinks
  await request("GET", "/api/menu?maxPrice=80"); //                    expect 200: 3 dishes
  await request("GET", "/api/menu?category=desserts&maxPrice=85"); //  expect 200: 1 dessert
  await request("GET", "/api/menu/specials"); //                       expect 200: 2 specials
  await request("GET", "/api/menu/2"); //                              expect 200: one dish
  await request("GET", "/api/menu/42"); //                             expect 404
};
