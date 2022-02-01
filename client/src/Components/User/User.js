import React from "react";
import { useState, useEffect } from "react";
import API from "../../api/Api";
import Spinner from "../Spinner/Spinner";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const User = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      let { data } = await API.get("users");
      setUsers(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteUser = async (item) => {
    const id = item._id;
    await API.delete(`/users/${id}`);
    window.location.reload();
  };
  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);

  if (!users) {
    return <Spinner />;
  } else {
    return (
      <div className="display-container">
        <table className="ui fixed table">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Cash Balance </th>
              <th> Credit Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item.id}>
                <td>{item._id}</td>
                <td className="name"> {item.name}</td>
                <td className="name">{item.email}</td>
                <td> {formatter.format(item.cash)}</td>
                <td> {formatter.format(item.credit)}</td>

                <td>
                  <button className="ui primary button" onClick={() => deleteUser(item)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default User;
