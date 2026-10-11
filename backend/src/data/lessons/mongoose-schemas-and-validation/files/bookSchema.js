// Lesson 66: the rules every book must follow before it's saved.
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // 1. title

  // 2. author

  // 3. isbn

  // 4. genre

  // 5. price

  // 6. pages

  // 7. publishedYear

  // 8. tags

  // 9. inStock
});

module.exports = mongoose.model("Book", bookSchema);
