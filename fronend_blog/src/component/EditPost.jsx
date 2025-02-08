import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = ({ posts, updatePost }) => {
  const { id } = useParams(); // Get the ID from URL params
  const navigate = useNavigate();

  // Find the post to edit based on the ID from posts passed as props
  const postToEdit = posts.find((post) => post._id === id);

  // If the post isn't found, display an error message
  if (!postToEdit) {
    return <div>Post not found!</div>;
  }

  // Use the data from the post to set initial state for the form
  const [title1, setTitle1] = useState(postToEdit.title1);
  const [title2, setTitle2] = useState(postToEdit.title2);
  const [title3, setTitle3] = useState(postToEdit.title3);
  const [imageURL, setImageURL] = useState(postToEdit.imageURL);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedPost = { title1, title2, title3, imageURL };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/updateblogs/${id}`,
        updatedPost
      );

      updatePost((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id
            ? { ...post, title1, title2, title3, imageURL }
            : post
        )
      );

      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold mb-4 text-center">Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title1}
          onChange={(e) => setTitle1(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full"
          placeholder="Enter title"
        />
        <input
          type="text"
          value={title2}
          onChange={(e) => setTitle2(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full"
          placeholder="Short description"
        />
        <textarea
          value={title3}
          onChange={(e) => setTitle3(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full"
          placeholder="Blog content"
        />
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full"
          placeholder="Image URL"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
