import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

function Messages({ socket }) {
  const { messages } = useSelector((state) => state.users);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <section>
      {messages?.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </section>
  );
}

export default Messages;
