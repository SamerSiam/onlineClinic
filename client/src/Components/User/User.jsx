import React from "react";
import { useState, useEffect } from "react";
import API from "../../api/Api";
import Spinner from "../Spinner/Spinner";
import UpdateUser from "../UpdateUser/UpdateUser";
import "./User.css";
import userIcon from "./user.png";

// const formatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   maximumFractionDigits: 2,
// });
const User = ({ token }) => {
  const [user, setUser] = useState();
  const [update, setUpdate] = useState(false);

  //get the logged in patient info
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const auth = `Bearer ${token}`;
        const data = await API.get("/users/me", { headers: { Authorization: auth } });
        console.log(data.data);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [token]);

  // update patient info
  const updateUser = async (user) => {
    // const id = item._id;
    // await API.delete(`/users/${id}`);
    // window.location.reload();
    setUpdate(true);
  };

  if (!user) {
    return <Spinner />;
  } else {
    return (
      <div className="page-container">
        <div className="display-container">
          <div className="table-container">
            <table className="ui fixed table">
              <thead>
                <tr>
                  <td className="welcome"> Welcome, {user.data.fname}</td>
                  <td>
                    {" "}
                    <img src={userIcon} alt="user" />
                  </td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name"> {user.data.fname}</td>
                  <td className="name"> {user.data.lname}</td>
                  <td className="name">
                    <a href={"mailto:" + user.data.email}>{user.data.email}</a>
                  </td>
                  <td>
                    <i onClick={() => updateUser(user)} className="edit outline icon"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div> {update ? <UpdateUser user={user} setUpdate={setUpdate} /> : ""}</div>
      </div>
    );
  }
};

export default User;
