const express = require('express');
const Post = require('../models/Schema'); // Import the Post model

const router = express.Router();

// Create a new post
router.post('/addblogs', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

// Get all posts
router.get('/getblogs', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Update a post
router.put('/updateblogs/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

// Increment the view count for a post
router.put('/posts/:id/view', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment the view count by 1
    post.views += 1;
    await post.save();  // Save the updated post

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating view count', error });
  }
});




// Delete a post
router.delete('/deleteblogs/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

module.exports = router;
