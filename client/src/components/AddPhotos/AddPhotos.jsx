import React from "react";
import { useSelector } from "react-redux";
import AddIcon from "./AddIcon";
import PhotoPreview from "./PhotoPreview";
import "./styles/AddPhotos.css";

function AddPhotos() {
  const { photos } = useSelector((state) => state.photos);

  return (
    <div className="add_photos">
      <AddIcon />
      {photos?.map((photo) => {
        return <PhotoPreview key={photo.id} photo={photo} />;
      })}
    </div>
  );
}

export default AddPhotos;
