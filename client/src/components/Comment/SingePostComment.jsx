import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "../Shared/TimeAgo";
import LikeComment from "./LikeComment";
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
        <div className="comment_actions">
          <small>
            <TimeAgo time={comment?.createdAt || Date.now()} />
          </small>
          <small>{comment.likes} likes</small>
          <LikeComment />
        </div>
      </div>
    </div>
  );
}

export default SingePostComment;
