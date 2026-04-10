const CommunityPost = require("../models/CommunityPost");

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { author, role, title, content, type } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: "Post content is required" });
    }

    const post = new CommunityPost({
      author: author || "Scholarship App User",
      role: role || "Applicant",
      title,
      content,
      type: type || "general",
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
};
