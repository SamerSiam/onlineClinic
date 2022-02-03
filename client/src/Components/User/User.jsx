import React from "react";
import { useState, useEffect } from "react";
import API from "../../api/Api";
import Spinner from "../Spinner/Spinner";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const User = ({token}) => {
  
  const [user, setUser] = useState();

  const getUserInfo = async () => {
      
      try {
        const auth = `Bearer ${token}`;
        const data=await API.get("/users/me", { headers: { Authorization: auth } });
        console.log(data.data)
        setUser(data);
      } catch (err) {
        console.log(err);
      }
     
    
  };

  const deleteUser = async (item) => {
    const id = item._id;
    await API.delete(`/users/${id}`);
    window.location.reload();
  };
  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  if (!user) {
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
           <tr>
                <td className="name"> {user.data.name}</td>
                <td className="name">{user.data.email}</td>
                <td> {formatter.format(user.data.cash)}</td>
                <td> {formatter.format(user.data.credit)}</td>

                <td>
                  <button className="ui primary button" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
             
                </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default User;
