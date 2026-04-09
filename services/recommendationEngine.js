/**
 * AI-based Scholarship Recommendation Engine
 *
 * Scoring Breakdown:
 *   +40  →  user.marks >= scholarship.minMarks
 *   +30  →  user.income <= scholarship.maxIncome
 *   +20  →  user.state matches scholarship.state
 *   +10  →  user.field matches scholarship.field
 *   Max possible score: 100
 */

const calculateMatchScore = (user, scholarship) => {
  let score = 0;

  // Academic eligibility (40 points)
  if (user.marks >= scholarship.minMarks) {
    score += 40;
  }

  // Financial eligibility (30 points)
  if (user.income <= scholarship.maxIncome) {
    score += 30;
  }

  // State match (20 points)
  if (
    user.state.toLowerCase().trim() ===
    scholarship.state.toLowerCase().trim()
  ) {
    score += 20;
  }

  // Field of study match (10 points)
  if (
    user.field.toLowerCase().trim() ===
    scholarship.field.toLowerCase().trim()
  ) {
    score += 10;
  }

  return score;
};

const getRecommendations = (user, scholarships) => {
  const scored = scholarships.map((scholarship) => {
    const score = calculateMatchScore(user, scholarship);
    return {
      ...scholarship.toObject(),
      matchScore: score,
    };
  });

  // Sort descending by match score
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored;
};

module.exports = { calculateMatchScore, getRecommendations };
