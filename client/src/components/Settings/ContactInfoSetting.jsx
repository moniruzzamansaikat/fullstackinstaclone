import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../../store/auth/auth";
import "./styles/ContactInfoSetting.css";

function ContactInfoSetting({ user }) {
  const { updatingUserData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [file, setFile] = useState({ url: "", file: null });
  const [userData, setUserData] = useState(() => ({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
  }));

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
      file
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
          })
    );
  };

  return (
    <div className="user_data_setting">
      {updatingUserData && <p className="success_msg">Saving your data</p>}

      <form onSubmit={handleSubmit}>
        <h2>Contact Info</h2>

        <div className="input_div">
          <label htmlFor="name">Home Town</label>
          <input
            type="text"
            id="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className="input_div">
          <label htmlFor="email">Current City</label>
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
          <label htmlFor="bio">High School</label>
          <input
            type="bio"
            id="bio"
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
        </div>
        <div className="input_div">
          <label htmlFor="bio">Relationship Status</label>
          <select name="relationship" id="">
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>

        <div>
          <button className="btn">Update</button>
        </div>
      </form>
    </div>
  );
}

export default ContactInfoSetting;
