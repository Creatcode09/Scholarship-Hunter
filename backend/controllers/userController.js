const User = require("../models/User");

// @desc    Create or update a user profile
// @route   POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, category, familyIncome, state, field } = req.body;

    // Upsert: update if email exists, create if not
    const user = await User.findOneAndUpdate(
      { email },
      { name, email, category, familyIncome, state, field },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a user by ID
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getUserById };
