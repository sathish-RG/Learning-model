// Locked: your test drive. Each request is sent to your server for real, and the console
// shows what went out (→) and what came back (←): the status code, key headers and body.
const { request } = require("./api-client");

const asha = { email: "asha@example.com", password: "supersecret1" };

module.exports = async function testDrive() {
  console.log("--- Test drive ---");
  await request("POST", "/api/register", { body: asha }); //                                          201
  await request("POST", "/api/register", { body: asha }); //                                          409: taken
  await request("POST", "/api/register", { body: { email: "ravi@example.com", password: "short" } }); // 400
  await request("POST", "/api/login", { body: { email: asha.email, password: "wrong-password" } }); //  401
  const login = await request("POST", "/api/login", { body: asha }); //                               200 + token
  const token = login.body && login.body.token;

  await request("GET", "/api/me"); //                                                                 401: no token
  await request("GET", "/api/me", { headers: { Authorization: "Bearer not-a-real-token" } }); //       401
  if (!token) return console.log("(No token from /api/login yet, so the last tests are skipped.)");

  // A forged wristband: same signature, but the payload is changed to claim to be someone else
  const [header, , signature] = token.split(".");
  const fakePayload = Buffer.from(JSON.stringify({ sub: 999, email: "hacker@example.com" })).toString("base64").replace(/=+$/, "");
  await request("GET", "/api/me", { headers: { Authorization: `Bearer ${header}.${fakePayload}.${signature}` } }); // 401

  await request("GET", "/api/me", { headers: { Authorization: `Bearer ${token}` } }); //               200
  const payload = Buffer.from(token.split(".")[1], "base64").toString();
  console.log(`Inside your token (anyone can READ this, so never put secrets in it): ${payload}`);
};
