import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/Shared/UserCard";
import {
  addMessage,
  fetchFollowing,
  fetchInboxUser,
  fetchMessages,
  setActiveUsers,
} from "../store/users/users";
import { useHistory, useParams } from "react-router-dom";
import Messages from "../components/Messages/Messages";
import SendMessage from "../components/Messages/SendMessage";
import MessageUserHeader from "../components/Messages/MessageUserHeader";
import Messenger from "../components/Messenger/Messenger";
import "./styles/MessagesPage.css";
import { socket } from "../App";

function MessagesPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [message, setMessage] = useState("");
  const { inboxUser, activeUsers, followers } = useSelector(
    (state) => state.users
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(addMessage(message));
    setMessage("");
  }, [message, dispatch]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessage(data);
    });
  }, []);

  useEffect(() => {
    socket.on("active_users", (users) => {
      dispatch(setActiveUsers(users));
    });
  });

  useEffect(() => {
    dispatch(fetchFollowing(user?._id));
  }, [dispatch, user, socket]);

  useEffect(() => {
    dispatch(fetchInboxUser(params.userId));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(fetchMessages({ userId: user?._id, receiverId: inboxUser?._id }));
  }, [dispatch, inboxUser, user]);

  const goForMessage = (id) => {
    history.push(`/messages/t/${id}`);
  };

  return (
    <MainLayout>
      <div className="messages_page">
        {/* <div className="users_list">
          <header style={{ borderBottom: "1px solid" }}>
            <UserCard inHeader={true} user={user} />
          </header>
          <section className="users">
            {activeUsers
              .filter((u) => u._id !== user?._id)
              .filter((u) => user?.following?.includes(u._id))
              .map((user) => (
                <UserCard
                  inHeader
                  isLink
                  key={user._id}
                  user={user}
                  goForMessage={() => goForMessage(user._id)}
                />
              ))}
          </section>
        </div>

        {params?.userId ? (
          <div className="message_container">
            <MessageUserHeader user={inboxUser} />
            <Messages inboxUser={inboxUser} />
            <SendMessage
              socket={socket}
              sender={user?._id}
              receiverId={inboxUser?._id}
            />
          </div>
        ) : (
          <div className="empty_chat">
            <h2>Select a conversation to chat...</h2>
          </div>
        )} */}

        <Messenger users={followers} inboxUser={inboxUser} />
      </div>
    </MainLayout>
  );
}

export default MessagesPage;
