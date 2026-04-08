const express = require("express");
const router = express.Router();
const { addScholarship, getAllScholarships } = require("../controllers/scholarshipController");

// POST /api/scholarships  → Add a new scholarship
router.post("/", addScholarship);

// GET  /api/scholarships  → Get all scholarships
router.get("/", getAllScholarships);

module.exports = router;
