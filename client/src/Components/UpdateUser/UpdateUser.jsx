import React, { useState } from "react";
// import API from "../../api/Api";

import './Update.css'


function UpdateUser({ user, setUpdate }) {
  const [name, setName] = useState(0);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState({});
  
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
        <h1>Update User Info</h1>
        <div className="form-coin">
          <div>
            <h3> </h3>
          </div>
         
        </div>
        <div className="form-row1">

          <div className="input-field">
           {name}
            <input type="text"  onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className="form-row2">
        
        </div>

        <div className="form-row3">
          
        </div>
        <button className="ui primary button" >
          Update
        </button>
        <button className="ui primary button" onClick={(e)=>setUpdate(false)}>
          Cancel
        </button>
      </form>
      {/* <div className="error">{message}</div> */}
    </div>
  );
}

export default UpdateUser;