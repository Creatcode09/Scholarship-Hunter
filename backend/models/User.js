const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    category: {
      type: String,
      enum: ["General", "SC", "ST", "OBC"],
      required: [true, "Category is required"],
    },
    familyIncome: {
      type: Number,
      required: [true, "Family income is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    field: {
      type: String,
      required: [true, "Field of study is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
