import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/users/users";
import MessageItem from "./MessageItem";
import audio from "../../images/alert.wav";
import { socket } from "../../App";

function Messages({ inboxUser }) {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const playAlert = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

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
