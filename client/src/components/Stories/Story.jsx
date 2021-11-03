import React, { useState } from "react";
import "./styles/Story.css";
import image from "../../images/avatar.jpg";

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
