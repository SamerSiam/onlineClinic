import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import User from "./Components/User/User";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import Chat from "./Components/Chat/Chat";
import Homepage from "./Components/Homepage/Homepage";
import "./App.css";

function App() {
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
    return (
      <div>
        <Login setToken={setToken} setLoggedUser={setLoggedUser} />
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="display-header">
          <Route render={(props) => <Header token={token} {...props} />}></Route>
        </div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <div className="display-user">
            <Route
              exact
              path="/UserInfo"
              render={(props) => <User token={token} {...props} />}
            ></Route>

            <Route
              exact
              path="/Chat"
              render={(props) => <Chat user={loggedUser} {...props} />}
            ></Route>
          </div>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
