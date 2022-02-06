import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import User from "./Components/User/User";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import Chat from "./Components/Chat/Chat";
import Homepage from "./Components/Homepage/Homepage";



function App() {
  // console.log(process.env.NODE_ENV);
  const [token, setToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    setToken(userToken);
  }, [token]);

  if (!token) {
    return( 
    <div>
      <Login setToken={setToken} setLoggedUser={setLoggedUser}/>
      <Chat/>
      </div>
    
    )
  }

  return (
  
    
    <div className="App">
      
      <BrowserRouter>
        <Route render={(props) => <Header token={token} {...props} />}></Route>

        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/UserInfo" render={(props) => <User token={token} {...props} />}></Route>
          <Route exact path="/Chat" component={Chat}/>
          
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
