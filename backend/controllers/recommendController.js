const User = require("../models/User");
const Scholarship = require("../models/Scholarship");
const { getRecommendations } = require("../services/recommendationEngine");

// @desc    Get personalized scholarship recommendations for a user
// @route   GET /api/recommend/:userId
const getRecommendationsForUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const scholarships = await Scholarship.find();
    if (scholarships.length === 0) {
      return res.json({ message: "No scholarships available", recommendations: [] });
    }

    const recommendations = getRecommendations(user, scholarships);

    res.json({
      user: user.name,
      totalScholarships: scholarships.length,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecommendationsForUser };
