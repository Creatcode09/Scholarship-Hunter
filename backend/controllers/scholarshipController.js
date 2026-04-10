const Scholarship = require("../models/Scholarship");

// @desc    Add a new scholarship
// @route   POST /api/scholarships
const addScholarship = async (req, res) => {
  try {
    const { title, provider, amount, category, maxIncome, state, field, deadline } = req.body;

    const scholarship = await Scholarship.create({
      title,
      provider,
      amount,
      category,
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

// @desc    Get single scholarship by ID
// @route   GET /api/scholarships/:id
const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }
    res.json(scholarship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addScholarship, getAllScholarships, getScholarshipById };
