import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

function LikeComment({ liked = false }) {
  return <small>{liked ? <AiFillLike /> : <AiOutlineLike />}</small>;
}

export default LikeComment;
