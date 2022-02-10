import React, { useState } from "react";
import API from "../../api/Api";

import "./Update.css";

function UpdateUser({ user, setUpdate }) {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /****************************************************** */
  const handleSubmit = (event) => {
    event.preventDefault();
    const updateObject = {
      fname,
      lname,
      email,
      phone,
    };
    const update = async () => {
      try {
        const auth = `Bearer ${userToken}`;
        await API.patch("/users/me", updateObject, {
          headers: { Authorization: auth },
        });
      } catch (err) {
        console.log(err);
      }
    };
    update();
    setUpdate(false);
    window.location.reload();
  };

  /********************************************************** */
  return (
    <div className="form-container">
      <form className="form-update" onSubmit={handleSubmit}>
        <div className="welcome">Update User Info</div>
        <div className="form-row1"></div>
        <div className="form-row2">
          <span className=".input-label">First Name:</span>
          <input
            className="input-field"
            type="text"
            defaultValue={user.data.fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>{" "}
        <span className=".input-label">Last Name:</span>
        <input
          className="input-field"
          type="text"
          defaultValue={user.data.lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <div>
          <span className=".input-label">Email:</span>

          <input
            className="input-field"
            type="text"
            defaultValue={user.data.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <span className=".input-label">Phone Number:</span>

          <input className="input-field" type="text" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-row3">
          <button className="ui primary button">Update</button>
          <button className="ui  button" onClick={(e) => setUpdate(false)}>
            Cancel
          </button>
        </div>
      </form>
      {/* <div className="error">{message}</div> */}
    </div>
  );
}

export default UpdateUser;
