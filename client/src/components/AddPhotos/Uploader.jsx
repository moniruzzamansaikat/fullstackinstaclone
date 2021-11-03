import React, { useCallback, useEffect, useState } from "react";
import { ImCross, ImWikipedia } from "react-icons/im";
import { BsUpload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setPhotos, setUploadingPhotos } from "../../store/photos/photos";
import "./styles/Uploader.css";

function Uploader({ isStory }) {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const handleCrossClick = useCallback(() => {
    dispatch(setUploadingPhotos(false));
    dispatch(setPhotos([]));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        handleCrossClick();
      }
    });
  }, [handleCrossClick]);

  const handleFileChange = (e) => {
    for (let i = 0; i < e.target.files.length && i < 5; i++) {
      const newImageFile = e.target.files[i];
      newImageFile["id"] = Math.random();
      setFiles((prevState) => [...prevState, newImageFile]);
    }
  };

  const handleUploadButton = () => {
    dispatch(setPhotos(files));
    dispatch(setUploadingPhotos(false));
  };

  return (
    <div className="photo_uploader">
      <div className="cross_button" onClick={handleCrossClick}>
        <ImCross />
      </div>

      <div className="file_uploader">
        <label htmlFor="file">
          <BsUpload />
          <span>Upload</span>
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          multiple={true}
          id="file"
        />
      </div>

      {files.length ? (
        <button className="submit_button" onClick={handleUploadButton}>
          Uplaod
        </button>
      ) : null}
    </div>
  );
}

export default Uploader;
