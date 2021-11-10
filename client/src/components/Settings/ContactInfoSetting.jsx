import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateContactInfo } from "../../store/auth/auth";
import "./styles/ContactInfoSetting.css";

function ContactInfoSetting({ user }) {
  const { upupdatingContactInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(() => ({
    homeTown: user?.homeTown || "",
    currentCity: user?.currentCity || "",
    highSchool: user?.highSchool || "",
    relation: user?.relation || "",
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContactInfo(userData));
  };

  return (
    <div className="user_data_setting">
      {upupdatingContactInfo && <p className="success_msg">Saving your data</p>}

      <form onSubmit={handleSubmit}>
        <h2>Contact Info</h2>

        <div className="input_div">
          <label htmlFor="homeTown">Home Town</label>
          <input
            type="text"
            id="homeTown"
            value={userData.homeTown}
            onChange={(e) =>
              setUserData({ ...userData, homeTown: e.target.value })
            }
          />
        </div>
        <div className="input_div">
          <label htmlFor="currentCity">Current City</label>
          <input
            type="currentCity"
            id="currentCity"
            value={userData.currentCity}
            onChange={(e) =>
              setUserData({ ...userData, currentCity: e.target.value })
            }
          />
        </div>
        <div className="input_div">
          <label htmlFor="highSchool">High School</label>
          <input
            type="highSchool"
            id="highSchool"
            value={userData.highSchool}
            onChange={(e) =>
              setUserData({ ...userData, highSchool: e.target.value })
            }
          />
        </div>
        <div className="input_div">
          <label htmlFor="relation">Relationship Status</label>
          <select name="relation" id="relation">
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
