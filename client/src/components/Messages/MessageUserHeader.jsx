import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import "./styles/MessageUserHeader.css";

function MessageUserHeader({ user }) {
  return (
    <header className="message_user_header">
      <div className="user">
        <img src={user?.photo?.url} alt="" />
        <div className="active">
          <h4>{user?.name}</h4>
          <span className="ac-icon">
            <BsDot className="icon" />
            <small>{user?.active ? "acitve" : "not active"}</small>
          </span>
        </div>
      </div>
      <AiOutlineInfoCircle className="icon" />
    </header>
  );
}

export default MessageUserHeader;
