import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/users/users";
import MessageItem from "./MessageItem";
import audio from "../../images/alert.wav";

function Messages({ inboxUser }) {
  const { socket } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const audioRef = useRef();
  let cnt = 0;

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

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(addMessage(data));
      if (user?._id !== data.sender) {
        playAlert();
      }
    });
  }, [dispatch, socket, user]);

  return (
    <section>
      <audio ref={audioRef} src={audio}></audio>

      {messages
        .filter((msg) => msg.members.includes(inboxUser?._id))
        ?.map((message) => (
          <div ref={scrollRef} key={message._id}>
            <MessageItem inboxUser={inboxUser} message={message} user={user} />
          </div>
        ))}
    </section>
  );
}

export default Messages;
