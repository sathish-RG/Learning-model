// Locked: your test drive. Each request is sent to your server for real, and the console
// shows what went out (→) and what came back (←): the status code, key headers and body.
const { request } = require("./api-client");

module.exports = async function testDrive() {
  console.log("--- Test drive ---");
  await request("GET", "/api/menu"); //                                         expect 200
  await request("POST", "/api/orders", { body: { dishId: 1, quantity: 2 } }); // expect 201 + Location
  await request("POST", "/api/orders", { raw: "{ this is not JSON" }); //      expect 400
  await request("POST", "/api/orders", { body: { dishId: 99 } }); //            expect 400
  await request("DELETE", "/api/menu"); //                                      expect 405 + Allow
  await request("GET", "/api/drinks"); //                                       expect 404
};
