const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // Whose task this is: a reference to a document in the users collection
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [120, "Title must be at most 120 characters"],
    },
    priority: {
      type: String,
      enum: { values: ["low", "medium", "high"], message: "Priority must be low, medium or high" },
      default: "medium",
    },
    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Every list query is "this user's tasks, oldest first": equality field, then the sort field
taskSchema.index({ user: 1, createdAt: 1 });

module.exports = mongoose.model("Task", taskSchema);
