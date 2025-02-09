import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CircleX, CheckCircle } from 'lucide-react';

const CreatePost = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title1 || !title2 || !title3 || !imageURL) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      setShowMessage(true);
      return;
    }
    
    setMessage("");
    setShowMessage(false);

    const newPost = { title1, title2, title3, imageURL, views: 0 };

    try {
      await axios.post('http://localhost:5000/api/addblogs', newPost);
      setMessage("Post created successfully!");
      setMessageType("success");
      setShowMessage(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('Error creating post.');
      setMessageType("error");
      setShowMessage(true);
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2021/04/best-wordpress-blogs-featured-image.jpg" alt="Blog Header" />
      <h2 className="text-3xl font-semibold mb-4 text-center">Create a New Post</h2>

      {showMessage && (
        <div className={`fixed top-5 left-5 right-0 p-4 rounded-lg shadow-lg z-50 flex justify-between items-center w-2/3 ${messageType === "error" ? "bg-gradient-to-r from-red-500 to-red-700 text-white" : "bg-gradient-to-r from-green-500 to-green-700 text-white"}`}>
          <div className="flex items-center space-x-3">
            {messageType === "error" ? <CircleX className="text-white text-2xl" /> : <CheckCircle className="text-white text-2xl" />}
            <span className="text-lg font-semibold">{message}</span>
          </div>
          <button onClick={() => setShowMessage(false)} className="bg-transparent text-white text-2xl font-bold">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-16">
        <input type="text" value={title1} onChange={(e) => setTitle1(e.target.value)} className="p-3 border-2 border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter title" />
        <input type="text" value={title2} onChange={(e) => setTitle2(e.target.value)} className="p-3 border-2 border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Short description" />
        <textarea value={title3} onChange={(e) => setTitle3(e.target.value)} className="p-3 border-2 border-gray-300 rounded-md w-full h-30 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Blog content" />
        <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="p-3 border-2 border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Image URL" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
