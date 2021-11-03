import React from "react";
import { Link } from "react-router-dom";
import "./styles/SinglePostComment.css";

function SingePostComment({ comment }) {
  return (
    <div className="comment_item">
      <img src={comment.user.photo.url} alt="" />
      <div className="comment_details">
        <div className="d-flex">
          <Link to={`/profile/${comment.user._id}`}>{comment.user.name}</Link>
          <p>{comment.text} </p>
        </div>
        <div>
          <small>11h</small>
          <small>{comment.likes} likes</small>
        </div>
      </div>
    </div>
  );
}

export default SingePostComment;
