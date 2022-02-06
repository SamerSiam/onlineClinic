import React from "react";
import { Link } from "react-router-dom";
import logo from "./doctor.jpg";
import "./Header.css";
import API from "../../api/Api";

const Header = ({ token }) => {
  const userLogOut = async () => {
    try {
      const auth = `Bearer ${token}`;
     
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
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <h2> My Online Doctor</h2>
      <Link to="/UserInfo" className="right item">
       
        My Medical File
      </Link>
      <Link to="/Chat" className="right item">
       
        Live Chat with your Doctor
      </Link>

      <Link to="/login" className="right item">
        <span onClick={userLogOut}>Log Out</span> <i className="user logout icon"></i>
      </Link>
    </div>
  );
};

export default Header;
