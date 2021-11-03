import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { GrHome } from "react-icons/gr";
import { BsChat, BsGear, BsSuitHeart } from "react-icons/bs";
import {
  AiOutlineLogout,
  AiOutlinePlusSquare,
  AiOutlineSave,
} from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import "./styles/NavItems.css";
import { Link, withRouter, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/auth";

function NavItems() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // profile icon click
  const handleClick = (e) => {
    e.preventDefault();
    setProfileMenuOpen(!profileMenuOpen);
  };

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location]);

  return (
    <div>
      <ul className="nav_items">
        <NavItem link="/" icon={<GrHome className="icon" />} />
        <NavItem link="/messages" icon={<BsChat className="icon" />} />
        <NavItem link="/add" icon={<AiOutlinePlusSquare className="icon" />} />
        <NavItem
          link="/notifications"
          icon={<BsSuitHeart className="icon" />}
        />
        <NavItem
          isButton={true}
          onClick={handleClick}
          icon={<FaRegUserCircle className="icon" />}
        />
      </ul>

      {profileMenuOpen && (
        <div className="profile_menu">
          <Link to="/profile">
            <FaRegUserCircle />
            <span>Profile</span>
          </Link>
          <Link to="/saved">
            <AiOutlineSave />
            <span>Saved</span>
          </Link>
          <Link to="/settings">
            <BsGear />
            <span>Settings</span>
          </Link>
          <Link to="/settings" onClick={() => dispatch(logoutUser())}>
            <AiOutlineLogout />
            <span>Logout</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default withRouter(NavItems);
