import React, { useState } from "react";
import API from "../../api/Api";
import "./Signup.css";

function Signup({ setNewUser, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [currentToken, setCurrentToken] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserObject = {
      fname,
      lname,
      email,
      password,
    };
    try {
      const res = await API.post("/users", newUserObject);
      setToken(res.data.token);
      setCurrentToken(res.data.token);
      localStorage.setItem("token", JSON.stringify(currentToken));
    } catch (err) {
      setError(true);
    }
    window.location.reload();
  };

  /****************************************** */
  return (
    <div className="form-container">
      <form className="form-update" onSubmit={handleSubmit}>
        <div className="welcome">Create a New Account</div>
        <div className="form-row1"></div>
        <div className="form-row2">
          <span className=".input-label">First Name:</span>
          <input className="input-field" type="text" onChange={(e) => setFname(e.target.value)} />
        </div>{" "}
        <span className=".input-label">Last Name:</span>
        <input className="input-field" type="text" onChange={(e) => setLname(e.target.value)} />
        <div>
          <span className=".input-label">Email:</span>

          <input className="input-field" type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <span className=".input-label">Password:</span>

          <input
            className="input-field"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row3">
          <button className="ui primary button" onClick={(e) => handleSubmit(e)}>
            Save
          </button>
          <button className="ui  button" onClick={(e) => setNewUser(false)}>
            Cancel
          </button>
        </div>
      </form>
      {error}
    </div>
  );
}
export default Signup;
