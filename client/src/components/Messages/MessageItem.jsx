import React from "react";
import "./styles/MessageItem.css";

function MessageItem({ message, user, inboxUser }) {
  return (
    <div className={`message_item ${user?._id === message?.sender && "sent"}`}>
      {inboxUser?._id === message?.sender && (
        <img src={inboxUser?.photo?.url} alt="o" />
      )}
      <span className="text">{message.text}</span>
    </div>
  );
}

export default MessageItem;
