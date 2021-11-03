import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenDropdownMenu,
  setDropdownedPost,
  deletePost,
} from "../../store/posts/posts";
import "./styles/DropDownMenu.css";

function DropDownMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { dropdownedPost } = useSelector((state) => state.posts);
  const handleCrossClick = () => {
    dispatch(setOpenDropdownMenu(false));
    dispatch(setDropdownedPost(null));
  };

  const hanldeDeletePost = () => {
    dispatch(deletePost(dropdownedPost._id));
    dispatch(setOpenDropdownMenu(false));
    dispatch(setDropdownedPost(null));
  };

  return (
    <div className="dropdown_menu">
      <div className="drop_down_items">
        {dropdownedPost.user?._id === user._id ? (
          <button onClick={hanldeDeletePost}>Delete Post</button>
        ) : null}
        <button>Unfollow</button>
        <button>Share</button>
        <button onClick={handleCrossClick}>Cancel</button>
      </div>
    </div>
  );
}

export default DropDownMenu;
