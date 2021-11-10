import React, { useEffect, useMemo, useState } from "react";
import ContactSearch from "./ContactSearch";
import MessageUserCard from "./MessageUserCard";
import { RiMessage2Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import ActiveUsers from "./ActiveUsers";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowers, fetchFollowing } from "../../store/users/users";
import Messages from "../Messages/Messages";
import SendMessage from "../Messages/SendMessage";
import MessageUserHeader from "../Messages/MessageUserHeader";
import { authRequest } from "../../utils/xhr";
import "./style/Messenger.css";

function Messenger({ inboxUser }) {
  const { user, token } = useSelector((state) => state.auth);
  const { followers, following, socket } = useSelector((state) => state.users);
  const [conversation, setConversation] = useState(null);

  const dispatch = useDispatch();

  // fetch conversation
  useEffect((token) => {
    authRequest()("/conversations/get", {
      method: "POST",
      data: {
        members: [inboxUser?._id, user?._id],
      },
    })
      .then(({ data }) => {
        console.log(data);
        setConversation(data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  // fetch followers  & followings
  useEffect(() => {
    dispatch(fetchFollowers(user?._id));
    dispatch(fetchFollowing(user?._id));
  }, [dispatch, user]);

  const conversations = useMemo(() => {
    return followers?.concat(following);
  }, [followers, following]);

  return (
    <div className="messenger">
      <header>
        <button>
          <RiMessage2Line />
        </button>
        <button>
          <FiUsers />
        </button>
      </header>
      <section>
        <div className="box">
          <ContactSearch />
          <div>
            {conversations?.map((user, index) => (
              <MessageUserCard key={index} user={user} />
            ))}
          </div>
        </div>

        {inboxUser ? (
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
          <ActiveUsers />
        )}
      </section>
    </div>
  );
}

export default Messenger;
