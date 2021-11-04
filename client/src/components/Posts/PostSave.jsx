import React, { useMemo } from "react";
import { BsSave, BsSave2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSaved, savePost } from "../../store/posts/posts";
import "./styles/PostSave.css";

function PostSave({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { savedPosts } = useSelector((state) => state.posts);

  const handleSave = () => {
    dispatch(savePost(post._id));
  };

  const handleRemoveSave = () => {
    dispatch(removeFromSaved(post._id));
  };

  const savedPost = useMemo(() => {
    return user?.saved?.includes(post?._id);
  }, [user, post]);

  return (
    <div className="post_save">
      {savedPost ? (
        <BsSave2Fill id="icon" onClick={handleRemoveSave} />
      ) : (
        <BsSave id="icon" onClick={handleSave} />
      )}
    </div>
  );
}

export default PostSave;
