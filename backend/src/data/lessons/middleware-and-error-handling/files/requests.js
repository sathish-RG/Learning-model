// Locked: your test drive. Each request is sent to your server for real, and the console
// shows what went out (→) and what came back (←): the status code, key headers and body.
const { request } = require("./api-client");

module.exports = async function testDrive() {
  console.log("--- Test drive ---");
  await request("GET", "/api/orders"); //                                                expect 200
  await request("POST", "/api/orders", { body: { item: "Filter coffee", quantity: 1 } }); // expect 201
  await request("POST", "/api/orders", { body: { item: " ", quantity: 50 } }); //         expect 400 (2 details)
  await request("POST", "/api/orders", { raw: '{ "item": "Idli", ' }); //                 expect 400 (bad JSON)
  await request("GET", "/api/orders/99"); //                                             expect 404
  await request("GET", "/api/crash"); //                                                 expect 500
  await request("GET", "/api/nothing"); //                                               expect 404
};
