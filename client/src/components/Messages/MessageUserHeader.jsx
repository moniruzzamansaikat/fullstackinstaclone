import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./styles/MessageUserHeader.css";

function MessageUserHeader({ user }) {
  return (
    <header className="message_user_header">
      <div className="user">
        <img src={user?.photo?.url} alt="" />
        <div className="active">
          <Link to={`/profile/${user?._id}`}>
            <h4>{user?.name}</h4>
          </Link>
          <span className="ac-icon">
            <BsDot className="icon" />
            <small>acitve</small>
          </span>
        </div>
      </div>
      <AiOutlineInfoCircle className="icon" />
    </header>
  );
}

export default MessageUserHeader;
