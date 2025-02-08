import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreatePost = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!title1 || !title2 || !title3 || !imageURL) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setErrorMessage(""); // Reset error message

    const newPost = {
      title1,
      title2,
      title3,
      imageURL,
      views: 0,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/addblogs', newPost);
      alert('Post created successfully!');
      navigate('/'); // Redirect to home page after adding the post
    } catch (error) {
      setErrorMessage('Error creating post.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2021/04/best-wordpress-blogs-featured-image.jpg" alt="Blog Header" />
      <h2 className="text-3xl font-semibold mb-4 text-center">Create a New Post</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="p-3 border border-gray-300 rounded-md w-full h-30"
          placeholder="Blog content"
        />
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full"
          placeholder="Image URL"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
