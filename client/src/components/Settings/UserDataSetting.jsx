import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../store/auth/auth";
import GenderSelection from "../Shared/GenderSelection";
import "./styles/UserDataSetting.css";

function UserDataSetting({ user }) {
  const { updatingUserData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [file, setFile] = useState({ url: "", file: null });
  const [userData, setUserData] = useState(() => ({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
    gender: user?.gender || "",
  }));

  // set user gender
  const setGender = (genderValue) => {
    setUserData((data) => ({ ...data, gender: genderValue }));
  };

  // handle profile photo upload
  const handleFileChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setFile({
      url,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      file?.file
        ? updateUserData({
            name: userData.name,
            email: userData.email,
            bio: userData.bio,
            photo: file.file,
          })
        : updateUserData({
            name: userData.name,
            email: userData.email,
            bio: userData.bio,
            gender: userData.gender,
          })
    );
  };

  return (
    <div className="user_data_setting">
      {updatingUserData && <p className="success_msg">Saving your data</p>}

      <form onSubmit={handleSubmit}>
        <h2>Basic Info</h2>

        <div className="input_div">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className="input_div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div className="input_div">
          <label htmlFor="bio">Bio</label>
          <input
            type="bio"
            id="bio"
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
        </div>
        <div className="input_div">
          <GenderSelection gender={userData.gender} setGender={setGender} />
        </div>
        <div className="input_div">
          <label>Profile Photo</label>
          <div>
            <label htmlFor="photo" id="photo_up_design">
              <MdOutlineFileUpload />
            </label>
            <input onChange={handleFileChange} type="file" id="photo" />
          </div>

          {file.url && <img className="img_preview" src={file.url} alt="" />}
        </div>

        <div>
          <button className="btn">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UserDataSetting;
