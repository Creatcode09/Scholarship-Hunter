const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    minMarks: {
      type: Number,
      required: [true, "Minimum marks are required"],
    },
    maxIncome: {
      type: Number,
      required: [true, "Maximum income is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    field: {
      type: String,
      required: [true, "Field of study is required"],
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scholarship", scholarshipSchema);
