const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title1: { type: String, required: true },
  title2: { type: String, required: true },
  title3: { type: String, required: true },
  imageURL: { type: String, required: true },
  views: { type: Number, default: 0 },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
