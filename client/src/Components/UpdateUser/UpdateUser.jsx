import React, { useState } from "react";
// import API from "../../api/Api";

import "./Update.css";

function UpdateUser({ user, setUpdate }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  console.log("inside update user", user);

  /** Loading current customer account from API *****/
  //   useEffect(() => {
  //     const fetch = async () => {
  //         try {
  //             const auth = `Bearer ${token}`;
  //             const data=await API.get("/users/me", { headers: { Authorization: auth } });
  //             console.log(data.data)
  //             setUser(data);
  //           } catch (err) {
  //             console.log(err);
  //           }
  //     };
  //     fetch();
  //   }, [currentCustomer.id]);
  /***************************************************************** */

  /****************************************************** */
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  /****************************************************** */

  // // check if user has enough money to buy
  // if (account.balance >= totalPrice) {
  //   setFunds(true);

  //   //if user has the coin in their account, need to update the amount
  //   if (coinExists) {
  //     coinExists.amount = parseFloat(coinExists.amount) + parseFloat(amount);
  //   }
  //   //add the coin object to the account
  //   else {
  //     let newCoin = {
  //       coin: currentCoin.symbol,
  //       amount: parseFloat(amount),
  //       image: currentCoin.image,
  //       price: currentCoin.current_price,
  //       name: currentCoin.name,
  //     };
  //     tempCoins.push(newCoin);
  //   }

  //   /**  update account object */
  //   setAccount((prevState) => {
  //     return {
  //       ...prevState,
  //       balance: prevState.balance - totalPrice,
  //       cryptoCoins: [...tempCoins],
  //     };
  //   });

  //       // need to update coin array
  //     } else {
  //       setFunds(false);
  //       setMessage("You do not Have Enough Funds in Your Account");
  //     }
  //   };

  /**********************************************************************************
   * Update API
   */
  // useEffect(() => {
  //   const update = async () => {

  //       try {
  //         const updatedUser = await API.post();

  //       } catch (err) {
  //         console.log(err.message);
  //       }

  //   };
  //   update();
  // }, []);
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
            placeholder={user.data.fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>{" "}
        <span className=".input-label">Last Name:</span>
        <input
          className="input-field"
          type="text"
          placeholder={user.data.lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <div>
          <span className=".input-label">Email:</span>

          <input
            className="input-field"
            type="text"
            placeholder={user.data.email}
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
