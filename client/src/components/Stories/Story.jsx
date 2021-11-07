import React, { useState } from "react";
import image from "../../images/avatar.jpg";
import "./styles/Story.css";

function Story() {
  const [username] = useState("saikat");

  return (
    <div>
      <div className="story" style={{ backgroundImage: `url(${image})` }}></div>
      <small>
        {username.length > 12 ? `${username.slice(0, 10)}...` : username}
      </small>
    </div>
  );
}

export default Story;
