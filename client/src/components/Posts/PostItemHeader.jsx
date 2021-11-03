import React from "react";
import { Link } from "react-router-dom";
import image from "../../images/avatar.jpg";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  setDropdownedPost,
  setOpenDropdownMenu,
} from "../../store/posts/posts";
import "./styles/PostItemHeader.css";

function PostItemHeader({ post }) {
  const dispatch = useDispatch();

  const handleDropdown = () => {
    dispatch(setOpenDropdownMenu(true));
    dispatch(setDropdownedPost(post));
  };

  return (
    <div className="post_item_header">
      <div>
        <img src={post?.user?.photo.url || image} alt="" />
        <Link to={`/profile/${post?.user?._id || ""}`}>
          <span className="link">{post?.user?.name || "demo user"}</span>
        </Link>
      </div>

      <div
        onClick={handleDropdown}
        style={{ padding: "2px", cursor: "pointer" }}
      >
        <BsThreeDots />
      </div>
    </div>
  );
}

export default PostItemHeader;
