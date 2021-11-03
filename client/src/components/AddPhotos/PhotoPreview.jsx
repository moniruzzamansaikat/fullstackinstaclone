import React, { memo } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { removePhoto } from "../../store/photos/photos";
import "./styles/PhotoPreview.css";

function PhotoPreview({ photo }) {
  const dispatch = useDispatch();

  const src = URL.createObjectURL(photo);

  // remove photo
  const handleRemovePhoto = () => {
    dispatch(removePhoto(photo?.id));
  };

  return (
    <div className="photo_preview" style={{ backgroundImage: `url(${src})` }}>
      <div className="cross_button" onClick={handleRemovePhoto}>
        <ImCross />
      </div>
    </div>
  );
}

export default memo(PhotoPreview);
