const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for reference
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for reference
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for reference
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model for reference
      required: true,
    },
    task_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
