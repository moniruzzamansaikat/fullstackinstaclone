import React from "react";
import Logo from "./Logo";
import NavItems from "./NavItems";
import "./styles/Navbar.css";

function Navbar() {
  return (
    <nav className="main_nav">
      <div className="main_container">
        <Logo />
        <NavItems />
      </div>
    </nav>
  );
}

export default Navbar;
