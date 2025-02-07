import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MessageSquare, Share, Twitter, Facebook } from "lucide-react"; // Importing the necessary icons

const PostDetail = ({ posts, setPosts }) => {
  const { id } = useParams(); // Get the post id from the URL
  const navigate = useNavigate();

  // Find the post based on the id
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <p>Post not found!</p>;
  }

  const [liked, setLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Retrieve comments from localStorage when the component mounts
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments_${post.id}`));
    if (storedComments) {
      setComments(storedComments);
    }
  }, [post.id]);

  // Store the comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments_${post.id}`, JSON.stringify(comments));
    }
  }, [comments, post.id]);

  // Toggle the like status
  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  // Toggle the comment input visibility
  const handleCommentClick = () => {
    setShowCommentInput((prevState) => !prevState);
    setShowShareOptions(false); // Close share options when comment is clicked
  };

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment("");
      setShowCommentInput(false);
    } else {
      alert("Please enter a comment.");
    }
  };

  // Handle Share button click
  const handleShareClick = useCallback(() => {
    setShowShareOptions((prevState) => !prevState);
    setShowCommentInput(false); // Close comment input if open
  }, []);

  // Share on Twitter
  const handleShareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${post.title1}&url=${window.location.href}`;
    window.open(twitterUrl, "_blank");
    setShowShareOptions(false); // Close the share options after sharing
  };

  // Share on Facebook
  const handleShareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
    window.open(facebookUrl, "_blank");
    setShowShareOptions(false); // Close the share options after sharing
  };

  return (
    <div className="flex max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Left Image */}
      <div className="w-1/2 pr-6">
        <img
          src={post.imageURL}
          alt="Post"
          className="w-full h-100 object-cover rounded-lg"
        />
      </div>

      {/* Right Text */}
      <div className="w-1/2">
        <h2 className="text-3xl font-semibold mb-4">{post.title1}</h2>
        <p className="text-lg text-gray-700 mb-4">{post.title2}</p>
        <div className="text-gray-800 mb-6">{post.title3}</div>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-rose-600 transition"
        >
          Back to Home
        </button>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="relative mx-2 text-blue-500 p-2 rounded-full"
        >
          <Share size={24} />
          
          {/* Share Options Container */}
          {showShareOptions && (
            <div className="absolute flex flex-col right-0 top-0 mt-2 p-2 bg-white shadow-lg rounded-lg">
              {/* Share on Twitter */}
              <button
                onClick={handleShareOnTwitter}
                className="text-blue-500 hover:text-blue-700 p-2 flex items-center mb-2"
              >
                <Twitter size={18} className="mr-2" />
                Twitter
              </button>

              {/* Share on Facebook */}
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

        {/* Comment Button */}
        <button
          onClick={handleCommentClick}
          className="mx-2 text-blue-500 p-2 rounded-full"
        >
          <MessageSquare size={24} />
        </button>

        {/* Heart Icon - Like Button */}
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

        {/* Comment Input */}
        {showCommentInput && (
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-2 border rounded-lg"
              rows="3"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Add Comment
            </button>
          </div>
        )}

        {/* Display Comments Below Image Only If There Are Comments */}
        {comments && comments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Comments:</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="text-gray-700 mt-2">{comment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;


// import React, { useState, useEffect } from "react";
// import { Heart, MessageSquare, Share, Twitter, Facebook } from "lucide-react";
// import axios from "axios";

// const PostDetail = ({ posts }) => {
//   const { id } = useParams();
//   const post = posts.find((post) => post.id === parseInt(id));

//   if (!post) {
//     return <p>Post not found!</p>;
//   }

//   const [liked, setLiked] = useState(false);
//   const [showCommentInput, setShowCommentInput] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [showShareOptions, setShowShareOptions] = useState(false);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`/api/posts/${post.id}/comments`);
//         setComments(response.data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };
//     fetchComments();
//   }, [post.id]);

//   const handleLikeClick = async () => {
//     setLiked((prevLiked) => !prevLiked);
//     try {
//       await axios.put(`/api/posts/${post.id}/like`);
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleCommentClick = () => {
//     setShowCommentInput((prevState) => !prevState);
//   };

//   const handleAddComment = async () => {
//     if (newComment.trim()) {
//       const updatedComments = [...comments, newComment];
//       setComments(updatedComments);
//       setNewComment("");
//       setShowCommentInput(false);

//       try {
//         await axios.post(`/api/posts/${post.id}/comments`, { comment: newComment });
//       } catch (error) {
//         console.error("Error adding comment:", error);
//       }
//     } else {
//       alert("Please enter a comment.");
//     }
//   };

//   return (
//     <div className="flex max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <div className="w-1/2 pr-6">
//         <img src={post.imageURL} alt="Post" className="w-full h-100 object-cover rounded-lg" />
//       </div>
//       <div className="w-1/2">
//         <h2 className="text-3xl font-semibold mb-4">{post.title1}</h2>
//         <p className="text-lg text-gray-700 mb-4">{post.title2}</p>
//         <div className="text-gray-800 mb-6">{post.title3}</div>

//         <button onClick={() => navigate("/")} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-rose-600 transition">
//           Back to Home
//         </button>

//         <button onClick={handleLikeClick} className="mx-2 text-red-500 p-2 rounded-full">
//           <Heart size={24} fill={liked ? "red" : "none"} stroke={liked ? "none" : "currentColor"} />
//         </button>

//         <button onClick={handleCommentClick} className="mx-2 text-blue-500 p-2 rounded-full">
//           <MessageSquare size={24} />
//         </button>

//         <button onClick={() => setShowShareOptions(!showShareOptions)} className="relative mx-2 text-blue-500 p-2 rounded-full">
//           <Share size={24} />
//         </button>

//         {showShareOptions && (
//           <div className="absolute flex flex-col right-0 top-0 mt-2 p-2 bg-white shadow-lg rounded-lg">
//             <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${post.title1}&url=${window.location.href}`, "_blank")} className="text-blue-500">
//               <Twitter size={24} />
//             </button>
//             <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, "_blank")} className="text-blue-500">
//               <Facebook size={24} />
//             </button>
//           </div>
//         )}

//         {showCommentInput && (
//           <div className="mt-6 space-y-2">
//             <textarea
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md"
//               rows="3"
//               placeholder="Add a comment..."
//             />
//             <button onClick={handleAddComment} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
//               Add Comment
//             </button>
//           </div>
//         )}

//         {comments.length > 0 && (
//           <div className="mt-6">
//             <h3 className="text-xl font-semibold mb-4">Comments</h3>
//             {comments.map((comment, index) => (
//               <p key={index} className="border-b py-2">{comment}</p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostDetail;
