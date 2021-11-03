import React from "react";
import image from "../../images/user_default.png";
import { Link } from "react-router-dom";
import "./styles/ProfileHeader.css";
import FollowButton from "../Shared/FollowButton";

function ProfileHeader({ user, mainUser }) {
  return (
    <div className="profile_header">
      <div className="profile_info">
        <div>
          <img src={user.photo.url || image} alt="" />
        </div>
        <div>
          <h2>{user.name}</h2>
          <p>
            <small>{user.email}</small>
          </p>
          <p>{user.bio || ""}</p>
          {mainUser ? (
            <Link className="btn" to="/settings">
              Setting
            </Link>
          ) : (
            <FollowButton user={user} />
          )}
          <p className="links">
            <Link to={`/profile/${user._id}/followers`}>
              {user.followers.length} followers
            </Link>
            <Link to={`/profile/${user._id}/following`}>
              {user.following.length} following
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
