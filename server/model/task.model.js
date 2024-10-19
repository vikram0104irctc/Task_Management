const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Completed"],
      default: "Pending",
    },
    email: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const TASKMODEL = mongoose.model("tasks", taskSchema);

module.exports = { TASKMODEL };
