import React from "react";
import { Link } from "react-router-dom";
import "./styles/Logo.css";

function Logo() {
  return (
    <div className="main_logo">
      <Link to="/">
        <img src="/logo.png" alt="" />
      </Link>
    </div>
  );
}

export default Logo;
