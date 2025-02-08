import React, { useState, useEffect } from "react";
import { Trash2, BookOpenText, Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postViews, setPostViews] = useState({});

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getblogs");
        console.log("Fetched Posts:", response.data);
        setPosts(response.data);
        // Initialize the view count state with fetched posts
        const initialViews = response.data.reduce((acc, post) => {
          acc[post._id] = post.views;
          return acc;
        }, {});
        setPostViews(initialViews);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteblogs/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleView = async (id) => {
    setPostViews((prevViews) => {
      const newViewCount = (prevViews[id] || 0) + 1;
      axios.put(`http://localhost:5000/api/posts/${id}/view`) // Update view count on the backend
        .catch((error) => console.error("Error updating view count:", error));
      return { ...prevViews, [id]: newViewCount }; // Update view count locally
    });
  };

  return (
    <div className="relative max-w-full mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-2xl font-semibold">{post.title1}</h3>
            <p className="text-gray-700 mb-4">
              {post.title2 && typeof post.title2 === "string"
                ? post.title2.slice(0, 100)
                : "No description available..."}
            </p>
            <img
              src={post.imageURL}
              alt="Post"
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <div className="mt-auto flex justify-between items-center">
              <button
                onClick={() => handleDeletePost(post._id)}
                className="text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 size={24} />
              </button>

              {/* Eye Icon */}
              <button className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                <Eye size={24} />
                <span>{postViews[post._id] || post.views}</span> {/* Show view count */}
              </button>

              {/* Link to PostDetail page */}
              <Link
                to={`/post/${post._id}`}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                onClick={() => handleView(post._id)} // Update view count only when clicked
              >
                <BookOpenText size={24} />
              </Link>

              <Link
                to={`/edit/${post._id}`}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <Pencil size={24} />
              </Link>
            </div>

            {post.comments && post.comments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold">Comments:</h3>
                <ul>
                  {post.comments.map((comment, index) => (
                    <li key={index} className="text-gray-700 mt-2">
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="col-span-3 flex items-center justify-between">
          <div className="text-left w-full md:w-1/2">
            <p className="mx-15 text-3xl font-semibold text-black-500">
              No posts available. Create one!
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://c8.alamy.com/comp/RBEG4E/a-woman-is-shrugging-thinking-confused-with-a-curious-expression-i-don-t-know-a-woman-or-girl-with-a-sad-face-emotion-and-question-mark-hand-drawn-flat-style-illustration-with-cartoon-character-RBEG4E.jpg"
              alt="No Posts"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
