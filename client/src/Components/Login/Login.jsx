import React, { useState } from "react";
import "./Login.css";
import API from "../../api/Api";

/****************************************************** */
export default function Login({ setToken, setLoggedUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  /****************************************************** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });
      setToken(res.data.token);
      setLoggedUser(res.data);
    } catch (err) {
      setError(true);
    }
  };
  if (error) {
    return (
      <div>
        <p>Sorry, Sign in failed!</p>
        <button
          className="ui blue submit button"
          type="submit"
          onClick={() => window.location.reload()}
        >
          Back to Login
        </button>
      </div>
    );
  }
  return (
    <div className="login-wrapper">
      <div className="login-title">Sign in to My Online Doctor</div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
        </label>
        <div className="ui left icon input">
          <input type="text" placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
          <i className="user icon"></i>
        </div>

        <label>
          <p>Password</p>
        </label>
        <div className="ui left icon input">
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <i className="lock icon"></i>
        </div>
        <div>
          <button className="ui blue submit button" type="submit">
            Login
          </button>
        </div>
      </form>
      {error}
    </div>
  );
}
