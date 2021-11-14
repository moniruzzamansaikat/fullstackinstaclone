import React, { useEffect, useState } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  fetchFollowing,
  fetchInboxUser,
  fetchMessages,
  setActiveUsers,
} from "../store/users/users";
import { useParams } from "react-router-dom";
import Messenger from "../components/Messenger/Messenger";
import { socket } from "../App";
import "./styles/messagesPage.css";

function MessagesPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const [message, setMessage] = useState("");
  const { inboxUser, followers } = useSelector((state) => state.users);
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
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchInboxUser(params.userId));
  }, [dispatch, params]);

  useEffect(() => {
    dispatch(fetchMessages({ userId: user?._id, receiverId: inboxUser?._id }));
  }, [dispatch, inboxUser, user]);

  return (
    <MainLayout>
      <div className="messages_page">
        <Messenger users={followers} inboxUser={inboxUser} />
      </div>
    </MainLayout>
  );
}

export default MessagesPage;
