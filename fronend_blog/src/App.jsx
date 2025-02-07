import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogHeader from "./component/BlogHeader";
import CreatePost from "./component/CreatePost";
import Home from "./component/Home";
import PostDetail from "./component/PostDetail"; // Import the new component
import EditPost from "./component/EditPost";


const App = () => {
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on page load
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
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
        <Route path="/post/:id" element={<PostDetail posts={posts} />} />
         <Route path="/edit/:id" element={<EditPost posts={posts} updatePost={updatePost} />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;








// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BlogHeader from "./component/BlogHeader";
// import CreatePost from "./component/CreatePost";
// import Home from "./component/Home";
// import PostDetail from "./component/PostDetail";
// import EditPost from "./component/EditPost";
// import axios from "axios";

// const App = () => {
//   const [posts, setPosts] = useState([]);

//   // Fetch posts from the backend
//   useEffect(() => {
//     console.log("App loaded");

//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("/api/posts"); // Assuming API endpoint
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   // Add new post to state and backend
//   const addPost = async (newPost) => {
//     try {
//       const response = await axios.post("/api/posts", newPost);
//       setPosts([...posts, response.data]); // Update the state with the newly created post
//     } catch (error) {
//       console.error("Error adding post:", error);
//     }
//   };

//   // Delete post by ID from state and backend
//   const deletePost = async (id) => {
//     try {
//       await axios.delete(`/api/posts/${id}`);
//       setPosts(posts.filter((post) => post.id !== id)); // Remove the post from the state
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };

//   const updatePost = async (updatedPost) => {
//     try {
//       const response = await axios.put(`/api/posts/${updatedPost.id}`, updatedPost);
//       const updatedPosts = posts.map((post) =>
//         post.id === updatedPost.id ? response.data : post
//       );
//       setPosts(updatedPosts);
//     } catch (error) {
//       console.error("Error updating post:", error);
//     }
//   };

//   return (
//     <Router>
//       <BlogHeader />
//       <Routes>
//         <Route path="/" element={<Home posts={posts} deletePost={deletePost} />} />
//         <Route path="/createpost" element={<CreatePost addPost={addPost} />} />
//         <Route path="/post/:id" element={<PostDetail posts={posts} />} />
//         <Route path="/edit/:id" element={<EditPost posts={posts} updatePost={updatePost} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
