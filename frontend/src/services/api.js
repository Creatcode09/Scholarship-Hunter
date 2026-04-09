const MOCK_SCHOLARSHIPS = [
  {
    id: 1,
    title: "National Merit Scholarship",
    provider: "Ministry of Education",
    amount: "₹50,000 / year",
    deadline: "2024-08-15",
    education: "Graduate",
    state: "All India",
    category: "General",
    description: "Merit-based scholarship for outstanding undergraduate students across India."
  },
  {
    id: 2,
    title: "Post Matric Scholarship for SC/ST",
    provider: "State Government",
    amount: "₹30,000 / year",
    deadline: "2024-09-30",
    education: "12th",
    state: "Maharashtra",
    category: "SC",
    description: "Financial assistance for post-matriculation studies for SC/ST students."
  },
  {
    id: 3,
    title: "OBC Girls Education Fund",
    provider: "Women Welfare Department",
    amount: "₹25,000 / year",
    deadline: "2024-10-15",
    education: "10th",
    state: "Karnataka",
    category: "OBC",
    description: "Special fund supporting secondary education for girls from OBC categories."
  },
  {
    id: 4,
    title: "Tech Innovators Fellowship",
    provider: "Private Foundation",
    amount: "₹1,00,000 / year",
    deadline: "2024-07-20",
    education: "Post-Graduate",
    state: "Delhi",
    category: "General",
    description: "For post-graduate students pursuing innovative tech research."
  },
  {
    id: 5,
    title: "Chief Minister's Excellence Award",
    provider: "State Government",
    amount: "₹40,000 / year",
    deadline: "2024-11-01",
    education: "Graduate",
    state: "Tamil Nadu",
    category: "All",
    description: "Merit-cum-means scholarship for top-performing students."
  }
];

export const fetchScholarships = async (filters) => {
  try {
    // Attempt to hit the real backend if it exists
    const queryParams = new URLSearchParams(
      Object.entries(filters).filter(([_, v]) => v !== '')
    ).toString();
    
    // Using a very short timeout so it quickly falls back to mock data
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000);
    
    const response = await fetch(`http://localhost:5000/api/scholarships?${queryParams}`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Real backend not available');
  } catch (error) {
    console.log("Using Mock Data. Real API unavailable:", error.message);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Filter mock data
    let results = [...MOCK_SCHOLARSHIPS];
    
    if (filters.category && filters.category !== '') {
      results = results.filter(s => s.category === filters.category || s.category === 'All');
    }
    if (filters.state && filters.state !== '') {
      results = results.filter(s => s.state === filters.state || s.state === 'All India');
    }
    if (filters.education && filters.education !== '') {
      results = results.filter(s => s.education === filters.education);
    }
    
    return results;
  }
};
