const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title1: {
      type: String,
      required: true,
      trim: true,
    },
    title2: {
      type: String,
      required: true,
      trim: true,
    },
    title3: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Creating the Post model from the schema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
