// The filing cabinet: one connection to MongoDB, shared by every request.
const mongoose = require("mongoose");

async function connectDB() {
  // Fail after 10 seconds instead of waiting forever (e.g. when Atlas blocks your IP address)
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

module.exports = connectDB;
