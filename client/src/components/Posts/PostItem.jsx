import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import PostImage from "./PostImage";
import PostItemHeader from "./PostItemHeader";
import PostLike from "./PostLike";
import "./styles/PostItem.css";
import PostSave from "./PostSave";

function PostItem({ post }) {
  const { user } = useSelector((state) => state.auth);
  const [srcs] = useState(post.photos.map((pho) => pho.url));
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < srcs.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="post_item">
      <PostItemHeader post={post} />
      <PostImage src={srcs[index]} />

      {/* post actions */}
      <div className="post_actions">
        <PostLike post={post} user={user} />
        <PostSave post={post} />
      </div>

      <div style={{ padding: "1rem" }}>{post?.text}</div>

      {index > 0 ? (
        <div className="trigger left" onClick={handlePrev}>
          <BsChevronLeft />
        </div>
      ) : null}

      {index < srcs.length - 1 ? (
        <div className="trigger " onClick={handleNext}>
          <BsChevronRight />
        </div>
      ) : null}
    </div>
  );
}

export default PostItem;
