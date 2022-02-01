import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../api/Api";
import "./Display.css";

import Spinner from "../Spinner/Spinner";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function Display({ users }) {
  console.log("inside display", users);
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Loading");
  console.log("inside didplay", users);
  useEffect(() => {
    try {
      setResults(users);
      setLoading(false);
      console.log("data is", users);
    } catch (err) {
      setErrorMsg(err.message);
    }
    // const fetch = async () => {
    //   setErrorMsg("");
    //   setLoading(true);
    //   try {
    //     const { data } = await getAllUsers();
    //     setResults(data);
    //     setLoading(false);
    //     console.log("data is", data);
    //   } catch (err) {
    //     setErrorMsg(err.message);
    //   }
    // };
    // fetch();
  }, []);

  if (isLoading === true) {
    return <Spinner message={errorMsg} />;
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
                <td>{item.market_cap_rank}</td>
                <td className="name"> {item.id}</td>
                <td className="name">{item.name}</td>
                <td> {formatter.format(item.cash)}</td>
                <td> {formatter.format(item.credit)}</td>

                <td>
                  <button className="ui primary button">Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Display;
