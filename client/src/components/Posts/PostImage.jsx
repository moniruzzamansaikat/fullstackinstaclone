import React from "react";
import "./styles/PostImage.css";

function PostImage({ src }) {
  return (
    <div
      className="post_image"
      style={{ backgroundImage: `url(${src})` }}
    ></div>
  );
}

export default PostImage;
