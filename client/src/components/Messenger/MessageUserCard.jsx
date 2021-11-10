import React from "react";
import { Link, useHistory } from "react-router-dom";
import { authRequest } from "../../utils/xhr";
import { useSelector } from "react-redux";
import "./style/MessageUserCard.css";

function MessageUserCard({ user, activeUser }) {
  const { token } = useSelector((state) => state.auth);
  const history = useHistory();

  // create conversation first
  const createConv = () => {
    authRequest(token)("/conversations", {
      method: "POST",
      data: {
        senderId: user?._id,
        receiverId: activeUser?._id,
      },
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Link
      to={`/messages/t/${user?._id}`}
      onClick={createConv}
      className="message_user_card"
    >
      <img src={user?.photo?.url} alt={user?.name} />
      <div>
        <span>{user?.name}</span>
        {!activeUser && <small>active 10m ago</small>}
      </div>
    </Link>
  );
}

export default MessageUserCard;
