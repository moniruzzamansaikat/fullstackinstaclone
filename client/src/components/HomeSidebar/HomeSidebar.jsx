import React from "react";
import { Link } from "react-router-dom";
import image from "../../images/user_default.png";
import SuggestionsForYou from "./SuggestionsForYou";
import { useSelector } from "react-redux";
import "./styles/HomeSidebar.css";

function HomeSidebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home_sidebar">
      <div className="user_card">
        <div className="user_info">
          <img src={user.photo.url || image} alt="" />
          <div>
            <Link to="/profile">
              <small>{user.email.split("@")[0]}</small>
            </Link>
            <p>{user.name}</p>
          </div>
        </div>
        <div>{/* <span className="custom_link">Switch</span> */}</div>
      </div>

      <SuggestionsForYou />
    </div>
  );
}

export default HomeSidebar;
