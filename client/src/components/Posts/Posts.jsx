import React from "react";
import { useSelector } from "react-redux";
import PostItem from "./PostItem";
import "./styles/Posts.css";

function Posts() {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div>
      {posts?.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
