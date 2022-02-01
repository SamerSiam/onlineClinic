import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header/Header";
import User from "./Components/User/User";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  console.log(process.env.NODE_ENV);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={User} />
          {/* <Route path="/deposit" exact component={Deposit} />
      <Route path="/withdraw" exact component={Withdraw} /> */}
          <Route Path="/users" exact component={User} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
