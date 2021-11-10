import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/users/users";
import "./styles/SendMessage.css";
import { socket } from "../../App";

function SendMessage({ sender, receiverId }) {
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(addMessage(data));
      if (user?._id !== data.sender) {
        // playAlert();
      }
    });
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.length > 0) {
      socket?.emit("chat", {
        sender,
        receiverId,
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
