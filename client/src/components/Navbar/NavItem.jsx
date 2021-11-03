import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavItem.css";

function NavItem({ icon, link, isButton, ...props }) {
  return (
    <li className="nav_item" {...props}>
      {isButton ? (
        <span style={{ cursor: "pointer" }}>{icon}</span>
      ) : (
        <Link to={link}>{icon}</Link>
      )}
    </li>
  );
}

export default NavItem;
