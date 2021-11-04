import React, { useState } from "react";
import "./styles/SendMessage.css";

function SendMessage({ socket, user, mainUser }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.length > 0) {
      socket?.emit("chat", {
        userId: mainUser?._id,
        to: user?._id,
        text,
      });
      setText("");
    }
  };

  return (
    <footer className="send_message">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Send</button>
      </form>
    </footer>
  );
}

export default SendMessage;
