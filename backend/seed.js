const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Scholarship = require("./models/Scholarship");
const Mentor = require("./models/Mentor");
const CommunityPost = require("./models/CommunityPost");
dotenv.config();

const scholarships = [
  {
    title: "Post-Matric Scholarship for SC/ST Students",
    provider: "Ministry of Social Justice & Empowerment",
    amount: "₹50,000/year",
    category: "SC",
    maxIncome: 250000,
    state: "All India",
    field: "All",
    deadline: new Date("2026-08-15"),
  },
  {
    title: "OBC Pre-Matric Scholarship",
    provider: "Ministry of Social Justice & Empowerment",
    amount: "₹25,000/year",
    category: "OBC",
    maxIncome: 300000,
    state: "All India",
    field: "All",
    deadline: new Date("2026-07-31"),
  },
  {
    title: "AICTE Pragati Scholarship for Girls",
    provider: "AICTE",
    amount: "₹50,000/year",
    category: "All",
    maxIncome: 800000,
    state: "All India",
    field: "Engineering",
    deadline: new Date("2026-09-30"),
  },
  {
    title: "National Means Cum Merit Scholarship",
    provider: "Department of School Education",
    amount: "₹12,000/year",
    category: "All",
    maxIncome: 350000,
    state: "All India",
    field: "All",
    deadline: new Date("2026-06-30"),
  },
  {
    title: "Reliance Foundation Undergraduate Scholarship",
    provider: "Reliance Foundation",
    amount: "₹2,00,000/year",
    category: "All",
    maxIncome: 1500000,
    state: "All India",
    field: "Engineering",
    deadline: new Date("2026-10-01"),
  },
  {
    title: "HDFC Badhte Kadam Scholarship",
    provider: "HDFC Bank",
    amount: "₹1,00,000/year",
    category: "All",
    maxIncome: 600000,
    state: "All India",
    field: "All",
    deadline: new Date("2026-08-31"),
  },
  {
    title: "Maharashtra State SC Scholarship",
    provider: "Government of Maharashtra",
    amount: "₹40,000/year",
    category: "SC",
    maxIncome: 200000,
    state: "Maharashtra",
    field: "All",
    deadline: new Date("2026-07-15"),
  },
  {
    title: "Karnataka Vidyasiri Scholarship",
    provider: "Government of Karnataka",
    amount: "₹30,000/year",
    category: "OBC",
    maxIncome: 400000,
    state: "Karnataka",
    field: "All",
    deadline: new Date("2026-09-15"),
  },
  {
    title: "Chief Minister's Merit Scholarship – Tamil Nadu",
    provider: "Government of Tamil Nadu",
    amount: "₹60,000/year",
    category: "All",
    maxIncome: 500000,
    state: "Tamil Nadu",
    field: "Medical",
    deadline: new Date("2026-11-01"),
  },
  {
    title: "ST Fellowship for Higher Education",
    provider: "Ministry of Tribal Affairs",
    amount: "₹75,000/year",
    category: "ST",
    maxIncome: 300000,
    state: "All India",
    field: "All",
    deadline: new Date("2026-12-31"),
  },
];

const mentors = [
  {
    name: "Amit S.",
    avatar: "Amit",
    role: "2025 Scholarship Winner",
    rating: 4.9,
    sessions: 42,
    bio: "I navigated the complex application process last year and secured full funding. Let me help you review your application!",
    availability: ['Sat 10:00 AM', 'Sat 11:30 AM', 'Sat 4:00 PM', 'Sun 10:00 AM', 'Sun 2:00 PM', 'Sun 4:30 PM']
  },
  {
    name: "Dr. Kavita M.",
    avatar: "Kavita",
    role: "Admissions Consultant",
    rating: 4.8,
    sessions: 124,
    bio: "Guiding students towards financial independence through scholarships is my passion.",
    availability: ['Fri 5:00 PM', 'Sat 9:00 AM', 'Mon 6:00 PM']
  }
];

const posts = [
  {
    author: 'Priya K.',
    role: 'Student',
    title: 'Success Story: How I cleared the Reliance Foundation Interview!',
    content: 'Just wanted to share that I finally got the confirmation email today. The key was to focus on community impact during the interview. Happy to answer any questions!',
    type: 'success',
    likes: 124,
    comments: 32
  },
  {
    author: 'Rahul M.',
    role: 'Applicant',
    title: 'Income Certificate mismatch issue',
    content: 'My income certificate has a spelling mistake in my father\'s name. Will this cause an issue for the National Means Cum Merit scholarship? Has anyone faced this?',
    type: 'question',
    likes: 15,
    comments: 8
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    await Scholarship.deleteMany({});
    await Mentor.deleteMany({});
    await CommunityPost.deleteMany({});
    console.log("Cleared old data.");

    await Scholarship.insertMany(scholarships);
    await Mentor.insertMany(mentors);
    await CommunityPost.insertMany(posts);
    console.log(`Seeded ${scholarships.length} scholarships, ${mentors.length} mentors, and ${posts.length} posts successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
