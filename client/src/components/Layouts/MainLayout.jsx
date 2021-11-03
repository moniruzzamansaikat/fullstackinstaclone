import React from "react";
import "./styles/MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="main_layout">
      <div className="main_container">{children}</div>
    </div>
  );
}

export default MainLayout;
