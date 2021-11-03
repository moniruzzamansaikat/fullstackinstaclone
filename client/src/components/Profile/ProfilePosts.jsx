import React from "react";
import PostSmallCard from "../Shared/PostSmallCard";
import "./styles/ProfilePosts.css";

function ProfilePosts({ posts }) {
  return (
    <div className="profile_posts">
      {posts.map((post) => (
        <PostSmallCard key={post?._id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePosts;
