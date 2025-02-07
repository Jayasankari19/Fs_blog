import React, { useState, useEffect } from "react";
import { Trash2, BookOpenText, Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const Home = ({ posts, deletePost, editPost }) => {
  const [postViews, setPostViews] = useState({});

  useEffect(() => {
    const savedViews = JSON.parse(localStorage.getItem("postViews")) || {};
    setPostViews(savedViews);
  }, []);

  const handleView = (postId) => {
    setPostViews((prevViews) => {
      const newViews = { ...prevViews, [postId]: (prevViews[postId] || 0) + 1 };
      localStorage.setItem("postViews", JSON.stringify(newViews));

      return newViews;
    });
  };

  return (
    <div className="max-w-full mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.length === 0 ? (
      <div className="col-span-3 flex flex-col items-center justify-center space-y-4">
           <p className="text-3xl font-semibold text-center">
          No posts available. Create one!
        </p>
        <img
          src="https://c8.alamy.com/comp/RBEG4E/a-woman-is-shrugging-thinking-confused-with-a-curious-expression-i-don-t-know-a-woman-or-girl-with-a-sad-face-emotion-and-question-mark-hand-drawn-flat-style-illustration-with-cartoon-character-RBEG4E.jpg"
          alt="No Posts"
          className="w-90 h-94 object-cover" // You can adjust the width/height here as needed
        />
     
      </div>
    ) : (
        // If there are posts, render them
        posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-2xl font-semibold">{post.title1}</h3>
            <p className="text-gray-700 mb-4">{post.title2.slice(0, 100)}...</p>
            <img src={post.imageURL} alt="Post" className="w-full h-40 object-cover rounded-md mb-4" />

            {/* Buttons at the bottom */}
            <div className="mt-auto flex justify-between items-center">
              <button
                onClick={() => deletePost(post.id)} // Pass post id to delete it
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 size={24} />
              </button>

              <button
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <Eye size={24} />
                <span>{postViews[post.id] || 0}</span> {/* Display view count */}
              </button>

              <Link
                to={`/post/${post.id}`}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                onClick={() => handleView(post.id)} // Only update view count when "Read" is clicked
              >
                <BookOpenText size={24} />
              </Link>

              <Link
                to={`/edit/${post.id}`}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <Pencil size={24} />
              </Link>
            </div>

            {/* Display Comments */}
            {post.comments && post.comments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold">Comments:</h3>
                <ul>
                  {post.comments.map((comment, index) => (
                    <li key={index} className="text-gray-700 mt-2">{comment}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CreatePost from "./CreatePost"; // Import CreatePost component

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch posts on component mount
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/posts");
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   // Handle adding a new post
//   const addPost = (newPost) => {
//     setPosts((prevPosts) => [...prevPosts, newPost]);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <CreatePost addPost={addPost} />  {/* Pass addPost function as prop */}
      
//       {posts.map((post) => (
//         <div key={post.id}>{post.title1}</div>
//       ))}
//     </div>
//   );
// };

// export default Home;
