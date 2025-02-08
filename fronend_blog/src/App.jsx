import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogHeader from "./component/BlogHeader";
import CreatePost from "./component/CreatePost";
import Home from "./component/Home";
import PostDetail from "./component/PostDetail"; // Import the new component
import EditPost from "./component/EditPost";
import axios from 'axios';


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getblogs");
        console.log("Fetched Posts:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchPosts();
  }, []);
  
  
  // Add new post to state and localStorage
  const addPost = (newPost) => {
    const newPostWithId = { ...newPost, id: Date.now() }; // Add unique ID to each post
    const updatedPosts = [...posts, newPostWithId];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Delete post by ID from state and localStorage
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const updatePost = (updatedPost) => {
    const updatedPosts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };
  

  return (
    <Router>
      <BlogHeader />
      <Routes>
  <Route path="/" element={<Home posts={posts} deletePost={deletePost} />} />
  <Route path="/createpost" element={<CreatePost addPost={addPost} />} />
  <Route path="/post/:id" element={<PostDetail posts={posts} setPosts={setPosts}/>} />
  <Route path="/edit/:id" element={<EditPost posts={posts} updatePost={updatePost} />} />
</Routes>

    </Router>
  );
};

export default App;