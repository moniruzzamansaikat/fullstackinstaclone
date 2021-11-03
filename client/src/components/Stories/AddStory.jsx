import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./styles/AddStory.css";

function AddStory() {
  const [uploadingStory, setUploadingStory] = useState(false);

  return (
    <div className="add_story" title="Add Story">
      <AiOutlinePlus />
    </div>
  );
}

export default AddStory;
