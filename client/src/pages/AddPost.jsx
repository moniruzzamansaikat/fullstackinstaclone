import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddPhotos from "../components/AddPhotos/AddPhotos";
import Uploader from "../components/AddPhotos/Uploader";
import MainLayout from "../components/Layouts/MainLayout";
import { setPhotos } from "../store/photos/photos";
import { createNewPost } from "../store/posts/posts";
import "./styles/addPost.css";

function AddPost() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { uploadingPhotos, photos } = useSelector((state) => state.photos);
  const { creatingPost } = useSelector((state) => state.posts);

  const handleSubmit = () => {
    dispatch(
      createNewPost({
        photos,
        text,
      })
    );
    dispatch(setPhotos([]));
    setText("");
  };

  return (
    <MainLayout>
      <h3>Upload your photos</h3>
      <p>You can upload at most 5 photos 😟</p>
      <AddPhotos />
      {creatingPost && (
        <p className="success_msg">
          <span>Your post is uploading....</span>
        </p>
      )}
      {uploadingPhotos && <Uploader />}
      {photos.length > 0 ? (
        <div className="write_desc">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            rows="10"
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="btn loading_btn" onClick={handleSubmit}>
            Create Post
          </button>
        </div>
      ) : null}
    </MainLayout>
  );
}

export default AddPost;
