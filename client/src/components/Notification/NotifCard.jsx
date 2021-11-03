import React from "react";
import { Link } from "react-router-dom";
import image from "../../images/user_default.png";
import "./styles/NotifCard.css";

function NotifCard({ notif }) {
  return (
    <div className="notif_card">
      <Link to={`/posts/${notif.post}`}>
        <div>
          <div>
            <img src={notif?.user?.photo?.url || image} alt="notif" />
            <span>{notif.text}</span>
          </div>
          <time>10 minutes ago</time>
        </div>
      </Link>
    </div>
  );
}

export default NotifCard;
