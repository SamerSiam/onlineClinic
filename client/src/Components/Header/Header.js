import React from "react";
import { Link } from "react-router-dom";
import logo from "./bank.jpg";
import "./Header.css";
import API from "../../api/Api";

const Header = ({ token }) => {
  const userLogOut = async () => {
    try {
      const auth = `Bearer ${token}`;
      console.log("header is", auth);
      await API.post("/users/logout", {}, { headers: { Authorization: auth } });
    } catch (err) {
      console.log(err);
    }
    window.localStorage.removeItem("token");
    window.location.reload(false);
  };
  return (
    <div className="ui secondary pointing menu">
      <div>
        {" "}
        <img className="logo" src={logo} alt="logo" />
      </div>
      <h2> Bank API Interface</h2>
      <Link to="/users" className="right item">
        {" "}
        User Actions
      </Link>
      <Link to="/Account" className="right item">
        {" "}
        Account Actions{" "}
      </Link>

      <Link to="/login" className="right item">
        <spanc onClick={userLogOut}>Log Out</spanc> <i class="user logout icon"></i>
      </Link>
    </div>
  );
};

export default Header;
