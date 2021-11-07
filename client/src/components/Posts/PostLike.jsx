import React, { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { dislikePost, likePost } from "../../store/posts/likes";

function PostLike({ post, user, noText }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePostLike = () => dispatch(likePost(post._id));
  const handlePostDislike = () => dispatch(dislikePost(post._id));

  // check liked or not liked
  const likedPost = useMemo(() => {
    return post.likes.some((like) => like?._id === user?._id);
  }, [post, user]);

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

  const goToPost = useCallback(() => {
    history.push(`/posts/${post?._id}`);
  }, [history, post]);

  return (
    <div style={{ display: noText ? "inline" : "flex", alignItems: "center" }}>
      {likedPost ? (
        <div>
          <AiFillHeart id="icon" onClick={handlePostDislike} />
          <FaRegComment id="icon" onClick={goToPost} />
        </div>
      ) : (
        <div>
          <AiOutlineHeart id="icon" onClick={handlePostLike} />
          <FaRegComment id="icon" onClick={goToPost} />
        </div>
      )}
      {!noText && <span>{likeText}</span>}
    </div>
  );
}

export default PostLike;
