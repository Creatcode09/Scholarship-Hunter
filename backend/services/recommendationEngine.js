/**
 * AI-based Scholarship Recommendation Engine
 *
 * Scoring Breakdown (marks removed, category-based):
 *   +30  →  user.category matches scholarship.category (or scholarship is "All")
 *   +30  →  user.familyIncome <= scholarship.maxIncome
 *   +20  →  user.state matches scholarship.state (or scholarship is "All India")
 *   +20  →  user.field matches scholarship.field (or scholarship is "All")
 *   Max possible score: 100
 */

const calculateMatchScore = (user, scholarship) => {
  let score = 0;

  // Category eligibility (30 points)
  if (
    scholarship.category.toLowerCase() === "all" ||
    user.category.toLowerCase().trim() ===
      scholarship.category.toLowerCase().trim()
  ) {
    score += 30;
  }

  // Financial eligibility (30 points)
  if (user.familyIncome <= scholarship.maxIncome) {
    score += 30;
  }

  // State match (20 points)
  const userState = user.state.toLowerCase().trim();
  const scholarshipState = scholarship.state.toLowerCase().trim();
  if (scholarshipState === "all india" || userState === scholarshipState) {
    score += 20;
  }

  // Field of study match (20 points)
  const userField = user.field.toLowerCase().trim();
  const scholarshipField = scholarship.field.toLowerCase().trim();
  if (scholarshipField === "all" || userField === scholarshipField) {
    score += 20;
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
