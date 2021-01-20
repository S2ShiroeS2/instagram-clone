import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/post/Post";
import { db } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);

  //UseEffect -> Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      //Every time a new post is added, this code fire...
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        })),
      );
    });
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
        />
      </div>
      <h1>Hello bro 😁 Let's build an Instagram clone with ReactJS 🚀</h1>
      {/* Post */}
      {posts.map(({ id, post }) => {
        return <Post data={post} key={id} />;
      })}
    </div>
  );
}

export default App;
