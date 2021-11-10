import React from "react";
import "./styles/GenderSelection.css";

function GenderSelection({ gender, setGender }) {
  const handleChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <h4>Gender</h4>

      <div className="gender_selection">
        <div>
          <input
            name="gender"
            onChange={handleChange}
            checked={gender === "Male"}
            type="radio"
            id="male"
            value="Male"
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            onChange={handleChange}
            type="radio"
            checked={gender === "Female"}
            id="female"
            value="Female"
            name="gender"
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <input
            name="gender"
            onChange={handleChange}
            checked={gender === "Other"}
            type="radio"
            id="other"
            value="Other"
          />
          <label htmlFor="other">Other</label>
        </div>
      </div>
    </div>
  );
}

export default GenderSelection;
