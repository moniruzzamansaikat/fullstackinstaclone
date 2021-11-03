import React from "react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import "./styles/UserCard.css";

function UserCard({ user }) {
  return (
    <div className="user_card">
      <div className="user_info">
        <img src={user?.photo?.url || ""} alt="" />
        <div>
          <Link to={`/profile/${user._id}`}>
            <small className="link">{user.name}</small>
          </Link>
        </div>
      </div>
      <div>
        <FollowButton user={user} />
      </div>
    </div>
  );
}

export default UserCard;
