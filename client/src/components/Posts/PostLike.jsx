import React, { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { dislikePost, likePost } from "../../store/posts/likes";
import "./styles/PostLike.css";

function PostLike({ post, user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePostLike = () => dispatch(likePost(post._id));
  const handlePostDislike = () => dispatch(dislikePost(post._id));

  // check liked or not liked
  const likedPost = useMemo(() => {
    return post.likes.some((like) => like?._id === user?._id);
  }, [post, user]);

  const goToPost = useCallback(() => {
    history.push(`/posts/${post?._id}`);
  }, [history, post]);

  return (
    <div className="post_like">
      {likedPost ? (
        <div style={{ display: "flex" }}>
          <AiFillHeart id="icon" onClick={handlePostDislike} />
          <FaRegComment id="icon" className="comment_icon" onClick={goToPost} />
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <AiOutlineHeart id="icon" onClick={handlePostLike} />
          <FaRegComment id="icon" className="comment_icon" onClick={goToPost} />
        </div>
      )}
    </div>
  );
}

export default PostLike;
