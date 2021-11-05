import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import image from "../../images/user_default.png";
import TimeAgo from "../Shared/TimeAgo";
import { useDispatch } from "react-redux";
import { seenNotification } from "../../store/auth/auth";
import "./styles/NotifCard.css";

function NotifCard({ notif }) {
  const dispatch = useDispatch();
  const link = useMemo(() => {
    return notif?.type === "follow"
      ? `/profile/${notif?.notifUser?._id}`
      : `/posts/${notif?.post}`;
  }, [notif]);

  const makeSeenNotif = () => {
    dispatch(seenNotification(notif?._id));
  };

  return (
    <div className={`notif_card ${!notif.seen && "seen"}`}>
      <Link to={link} onClick={makeSeenNotif}>
        <div>
          <div>
            <img src={notif?.notifUser?.photo?.url || image} alt="notif" />
            <span>{notif.text}</span>
          </div>
          <TimeAgo time={notif?.createdAt} />
        </div>
      </Link>
    </div>
  );
}

export default NotifCard;
