import React from "react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import "./styles/UserCard.css";

function UserCard({ user, inHeader, isLink, goForMessage }) {
  return (
    <div
      className={`user_card ${isLink && "link"}`}
      style={{ margin: inHeader && "0", boxShadow: inHeader && "0 0 0" }}
      onClick={isLink && goForMessage}
    >
      <div className="user_info">
        <img src={user?.photo?.url || ""} alt="" />
        <div>
          {isLink ? (
            <small className="link">{user.name}</small>
          ) : (
            <Link to={`/profile/${user._id}`}>
              <small className="link">{user.name}</small>
            </Link>
          )}
        </div>
      </div>
      {!isLink && (
        <div>
          <FollowButton user={user} />
        </div>
      )}
    </div>
  );
}

export default UserCard;
