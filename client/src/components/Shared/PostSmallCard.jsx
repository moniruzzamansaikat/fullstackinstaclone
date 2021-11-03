import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./styles/PostSmallCard.css";

function PostSmallCard({ post }) {
  return (
    <Link
      to={`/posts/${post._id}`}
      className="post_small_card"
      style={{ backgroundImage: `url(${post.photos[0].url})` }}
    >
      <div className="overlay">
        <div>
          <p>
            <AiFillHeart id="icon" />
            <span>{post.likes.length}</span>
          </p>
          <p>
            <FaComment id="icon" />
            <span>{post.comments.length}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostSmallCard;
