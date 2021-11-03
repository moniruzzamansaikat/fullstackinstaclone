import React from "react";
import { HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setUploadingPhotos } from "../../store/photos/photos";
import "./styles/AddIcon.css";

function AddIcon() {
  const dispatch = useDispatch();

  return (
    <div
      className="image_add_icon"
      onClick={() => dispatch(setUploadingPhotos(true))}
      title="Click to upload photo"
    >
      <HiPlus />
    </div>
  );
}

export default AddIcon;
