const API_BASE = "/api";

// Create or update user profile
export const createUserProfile = async (profileData) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to save profile");
  }

  return response.json();
};

// Get personalized recommendations for a user
export const getRecommendations = async (userId) => {
  const response = await fetch(`${API_BASE}/recommend/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch recommendations");
  }

  return response.json();
};

// Get all scholarships (for manual browsing)
export const fetchAllScholarships = async () => {
  const response = await fetch(`${API_BASE}/scholarships`);

  if (!response.ok) {
    throw new Error("Failed to fetch scholarships");
  }

  return response.json();
};
