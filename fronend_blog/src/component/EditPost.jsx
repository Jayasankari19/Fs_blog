import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = ({ posts, updatePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const postToEdit = posts.find((post) => post.id === Number(id));

  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (postToEdit) {
      setTitle1(postToEdit.title1);
      setTitle2(postToEdit.title2);
      setTitle3(postToEdit.title3);
      setImageURL(postToEdit.imageURL);
    }
  }, [postToEdit]);

  if (!postToEdit) {
    return <p className="text-center text-red-500">Post not found! Try refreshing the page.</p>;
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedPost = { ...postToEdit, title1, title2, title3, imageURL };
    updatePost(updatedPost);
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold mb-4 text-center">Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" value={title1} onChange={(e) => setTitle1(e.target.value)} className="p-3 border border-gray-300 rounded-md w-full" placeholder="Enter title" />
        <input type="text" value={title2} onChange={(e) => setTitle2(e.target.value)} className="p-3 border border-gray-300 rounded-md w-full" placeholder="Short description" />
        <textarea value={title3} onChange={(e) => setTitle3(e.target.value)} className="p-3 border border-gray-300 rounded-md w-full" placeholder="Blog content" />
        <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="p-3 border border-gray-300 rounded-md w-full" placeholder="Image URL" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
