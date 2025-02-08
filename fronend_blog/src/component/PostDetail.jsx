import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MessageSquare, Share, Twitter, Facebook } from "lucide-react";
import axios from 'axios';

const PostDetail = ({ posts, setPosts, handleView }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);  // Store comments in localStorage
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Fetch post by ID when the component mounts
  useEffect(() => {
    const post = posts.find((post) => post._id === id);
    if (!post) {
      return;
    }

    // Update the view count in the database
    axios.put(`/api/posts/${id}/view`).then((response) => {
      const updatedPost = response.data;
      setPosts((prevPosts) => 
        prevPosts.map((p) => (p._id === id ? updatedPost : p))
      );
    }).catch((error) => {
      console.error('Error updating view count:', error);
    });

    // Load comments from localStorage
    const storedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
    setComments(storedComments);
  }, [id, posts, setPosts]);

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleCommentClick = () => {
    setShowCommentInput((prevState) => !prevState);
    setShowShareOptions(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment("");
      setShowCommentInput(false);

      // Save updated comments to localStorage
      localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    } else {
      alert("Please enter a comment.");
    }
  };

  const handleShareClick = () => {
    setShowShareOptions((prevState) => !prevState);
    setShowCommentInput(false);
  };

  const handleShareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${post.title1}&url=${window.location.href}`;
    window.open(twitterUrl, "_blank");
    setShowShareOptions(false);
  };

  const handleShareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(facebookUrl, "_blank");
    setShowShareOptions(false);
  };

  const post = posts.find((post) => post._id === id);
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="w-1/2 pr-6">
        <img
          src={post.imageURL}
          alt="Post"
          className="w-full h-100 object-cover rounded-lg"
        />
      </div>

      <div className="w-1/2">
        <h2 className="text-3xl font-semibold mb-4">{post.title1}</h2>
        <p className="text-lg text-gray-700 mb-4">{post.title2}</p>
        <div className="text-gray-800 mb-6">{post.title3}</div>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-rose-600 transition"
        >
          Back to Home
        </button>

        <button
          onClick={handleShareClick}
          className="relative mx-2 text-blue-500 p-2 rounded-full"
        >
          <Share size={24} />
          
          {showShareOptions && (
            <div className="absolute flex flex-col right-0 top-0 mt-2 p-2 bg-white shadow-lg rounded-lg">
              <button
                onClick={handleShareOnTwitter}
                className="text-blue-500 hover:text-blue-700 p-2 flex items-center mb-2"
              >
                <Twitter size={18} className="mr-2" />
                Twitter
              </button>

              <button
                onClick={handleShareOnFacebook}
                className="text-blue-500 hover:text-blue-700 p-2 flex items-center"
              >
                <Facebook size={18} className="mr-2" />
                Facebook
              </button>
            </div>
          )}
        </button>

        <button
          onClick={handleCommentClick}
          className="mx-2 text-blue-500 p-2 rounded-full"
        >
          <MessageSquare size={24} />
        </button>

        <button
          onClick={handleLikeClick}
          className="mx-2 text-red-500 p-2 rounded-full"
        >
          <Heart
            size={24}
            fill={liked ? "red" : "none"}
            stroke={liked ? "none" : "currentColor"}
          />
        </button>

        {showCommentInput && (
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-lg"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg mt-2 hover:bg-rose-600 transition"
            >
              Add Comment
            </button>
          </div>
        )}

        {comments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Comments:</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="text-gray-700 mt-2">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
