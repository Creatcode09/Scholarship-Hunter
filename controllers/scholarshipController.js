const Scholarship = require("../models/Scholarship");

// @desc    Add a new scholarship
// @route   POST /api/scholarships
const addScholarship = async (req, res) => {
  try {
    const { title, minMarks, maxIncome, state, field, deadline } = req.body;

    const scholarship = await Scholarship.create({
      title,
      minMarks,
      maxIncome,
      state,
      field,
      deadline,
    });

    res.status(201).json(scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all scholarships
// @route   GET /api/scholarships
const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addScholarship, getAllScholarships };
