import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import audio from "../../images/alert.wav";

function Messages({ inboxUser }) {
  const { messages } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section style={{ display: "block" }}>
      <audio ref={audioRef} src={audio}></audio>

      {messages.map((message, index) => (
        <div ref={scrollRef} index={index}>
          <MessageItem inboxUser={inboxUser} message={message} user={user} />
        </div>
      ))}
    </section>
  );
}

export default Messages;
