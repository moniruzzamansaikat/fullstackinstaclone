import React from "react";
import "./styles/MessageItem.css";

function MessageItem({ message }) {
  return (
    <div className={`message_item ${message.sent && "sent"}`}>
      <span className="text">{message.text}</span>
    </div>
  );
}

export default MessageItem;
