// Locked: your test drive. Each request is sent to your server for real, and the console
// shows what went out (→) and what came back (←): the status code, key headers and body.
const { request } = require("./api-client");

module.exports = async function testDrive() {
  console.log("--- Test drive ---");
  await request("GET", "/api/tasks"); //                                   200: page 1 of 7 tasks
  await request("GET", "/api/tasks?done=false&sort=title"); //             200: 4 tasks, A→Z
  await request("GET", "/api/tasks?page=2&limit=3"); //                    200: tasks 4, 5 and 6
  await request("POST", "/api/tasks", { body: { title: "Learn REST" } }); // 201 + Location
  await request("POST", "/api/tasks", { body: { title: "   " } }); //       400
  await request("GET", "/api/tasks/8"); //                                 200
  await request("PATCH", "/api/tasks/8", { body: { done: true } }); //      200: done, same title
  await request("PUT", "/api/tasks/8", { body: { title: "Master REST" } }); // 400: done is missing
  await request("PUT", "/api/tasks/8", { body: { title: "Master REST", done: false } }); // 200
  await request("DELETE", "/api/tasks/8"); //                              204, no body
  await request("GET", "/api/tasks/8"); //                                 404
  await request("DELETE", "/api/tasks/8"); //                              404
};
