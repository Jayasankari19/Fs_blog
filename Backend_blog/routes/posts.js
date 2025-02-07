const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post("/", async (req, res) => {
  const { title1, title2, title3, imageURL } = req.body;
  const newPost = new Post({
    title1,
    title2,
    title3,
    imageURL,
    views: 0,
  });
  try {
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.title1 = req.body.title1 || post.title1;
      post.title2 = req.body.title2 || post.title2;
      post.title3 = req.body.title3 || post.title3;
      post.imageURL = req.body.imageURL || post.imageURL;
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.remove();
      res.json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Increment views for a post
router.patch("/:id/views", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.views += 1;
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
