import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import PostImage from "./PostImage";
import PostItemHeader from "./PostItemHeader";
import PostLike from "./PostLike";
import PostSave from "./PostSave";
import { Link } from "react-router-dom";
import TimeAgo from "../Shared/TimeAgo";
import "./styles/PostItem.css";

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

  const likeText = useMemo(() => {
    return post?.likes?.length > 1 ? (
      <span>
        liked by{" "}
        <Link className="custom_link" to={`/profile/${post?.likes[0]._id}`}>
          {post?.likes[0].name}
        </Link>{" "}
        and {post?.likes?.length - 1} others
      </span>
    ) : (
      `${post?.likes?.length} like`
    );
  }, [post]);

  return (
    <div className="post_item">
      <PostItemHeader post={post} />
      <PostImage src={srcs[index]} />

      {/* post actions */}
      <div className="post_actions">
        <div className="icons">
          <PostLike post={post} user={user} />
          <PostSave post={post} />
        </div>

        {likeText}
      </div>

      <div style={{ padding: "1rem" }}>
        <p>
          <Link to={`/profile/${post?.user?._id}`} className="custom_link">
            {post?.user?.name}
          </Link>{" "}
          {post?.text}
        </p>
        <TimeAgo time={post?.createdAt} />
      </div>

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
