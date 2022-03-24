import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Register from "./Register";
import Login from "./Login";
import Mypage from "./Mypage";
import Google from "./Google";
// import Fileupload from "./Fileupload";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/homepage">
        <App />
      </Route>
      <Route path="/google">
        <Google />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/mypage">
        <Mypage />
      </Route>
      <Route path="/">
        <Register />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
