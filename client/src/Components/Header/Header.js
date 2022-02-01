import React from "react";
import { Link } from "react-router-dom";
import logo from "./bank.jpg";
import "./Header.css";

const Header = () => {
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

      <Link to="/login" className="right item"></Link>
    </div>
  );
};

export default Header;
