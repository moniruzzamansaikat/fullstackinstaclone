import React from "react";
import { useSelector } from "react-redux";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
import "./styles/Posts.css";

function Posts() {
  const { posts, fetchingPosts } = useSelector((state) => state.posts);

  if (fetchingPosts) {
    return <h3>Loading posts...</h3>;
  }

  return (
    <div>
      {posts?.length > 0 ? (
        posts?.map((post) => <PostItem key={post._id} post={post} />)
      ) : (
        <div>
          <p>
            Start <Link to="/suggestions">following</Link> people to see their
            posts.
          </p>
        </div>
      )}
    </div>
  );
}

export default Posts;
