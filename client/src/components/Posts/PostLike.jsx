import React, { useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { dislikePost, likePost } from "../../store/posts/posts";

function PostLike({ post, user, noText }) {
  const dispatch = useDispatch();

  const handlePostLike = () => dispatch(likePost(post._id));
  const handlePostDislike = () => dispatch(dislikePost(post._id));

  // check liked or not liked
  const likedPost = useMemo(() => {
    return post.likes.some((like) => like._id === user._id);
  }, [post, user._id]);

  return (
    <div style={{ display: noText ? "inline" : "flex", alignItems: "center" }}>
      {likedPost ? (
        <AiFillHeart id="icon" onClick={handlePostDislike} />
      ) : (
        <AiOutlineHeart id="icon" onClick={handlePostLike} />
      )}
      {!noText && <span>{post?.likes?.length} likes</span>}
    </div>
  );
}

export default PostLike;
