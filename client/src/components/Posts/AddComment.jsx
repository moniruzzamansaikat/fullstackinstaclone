import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/posts/comment";
import "./styles/AddComment.css";

function AddComment({ postId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ postId, text }));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="add_comment">
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button>Add Comment</button>
    </form>
  );
}

export default AddComment;
