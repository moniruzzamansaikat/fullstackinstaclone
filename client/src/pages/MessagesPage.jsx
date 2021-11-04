import React, { useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/Shared/UserCard";
import { fetchFollowing, fetchInboxUser } from "../store/users/users";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Messages from "../components/Messages/Messages";
import SendMessage from "../components/Messages/SendMessage";
import MessageUserHeader from "../components/Messages/MessageUserHeader";
import "./styles/MessagesPage.css";

function MessagesPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { following, inboxUser, socket } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchFollowing(user?._id));
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchInboxUser(params.userId));
  }, [dispatch, params]);

  const goForMessage = (id) => {
    history.push(`/messages/t/${id}`);
  };

  return (
    <MainLayout>
      <div className="messages_page">
        <div className="users_list">
          <header>
            <UserCard inHeader={true} user={user} />
          </header>
          <section className="users">
            {following?.map((followingUser) =>
              followingUser?.active ? (
                <UserCard
                  inHeader
                  isLink
                  key={followingUser._id}
                  user={followingUser}
                  goForMessage={() => goForMessage(followingUser._id)}
                />
              ) : null
            )}
          </section>
        </div>

        <div className="message_container">
          <MessageUserHeader user={inboxUser} />
          <Messages socket={socket} />
          <SendMessage socket={socket} user={inboxUser} mainUser={user} />
        </div>
      </div>
    </MainLayout>
  );
}

export default MessagesPage;
