import React, { useEffect, useMemo, useState } from "react";
import NavItem from "./NavItem";
import { GrHome } from "react-icons/gr";
import { BsChat, BsGear, BsSuitHeart } from "react-icons/bs";
import {
  AiOutlineLogout,
  AiOutlinePlusSquare,
  AiOutlineSave,
} from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { Link, withRouter, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth/auth";
import "./styles/NavItems.css";

function NavItems() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { notifications } = useSelector((state) => state.auth);

  // profile icon click
  const handleClick = (e) => {
    e.preventDefault();
    setProfileMenuOpen(!profileMenuOpen);
  };

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [location]);

  // unseen notifs
  const unseenNotifs = useMemo(() => {
    return notifications?.filter((notif) => !notif.seen);
  }, [notifications]);

  return (
    <div>
      <ul className="nav_items">
        <NavItem link="/" icon={<GrHome className="icon" />} />
        <NavItem link="/messages" icon={<BsChat className="icon" />} />
        <NavItem link="/add" icon={<AiOutlinePlusSquare className="icon" />} />
        <NavItem
          link="/notifications"
          icon={
            <div className="has_overlay">
              <BsSuitHeart className="icon" />
              <sup>{unseenNotifs?.length}</sup>
            </div>
          }
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
          <Link to="/suggestions">
            <FiUsers />
            <span>Suggested Users</span>
          </Link>
          <Link to="/settings">
            <BsGear />
            <span>Settings</span>
          </Link>
          <Link to="#" onClick={() => dispatch(logoutUser())}>
            <AiOutlineLogout />
            <span>Logout</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default withRouter(NavItems);
