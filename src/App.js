import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Provider from "./components/Context";

// Dummy
import Header from "./components/Other/Header";
import NotFound from "./components/Other/NotFound";

// Main
import Search from "./components/Search/Main";
import Movie from "./components/Movie/Main";

// User
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Bookmark from "./components/User/Bookmark";
import UserDetail from "./components/User/UserDetail";
import ChangePassword from "./components/User/ChangePassword";

// Forgot Password
import ForgotPassword from "./components/Other/ForgotPassword";

// Reset Password
import ResetPassword from "./components/Other/ResetPassword";

export default function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/movie/:id" component={Movie} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/bookmark" component={Bookmark} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword/:token" component={ResetPassword} />
          <Route exact path="/user" component={UserDetail} />
          <Route exact path="/user/password" component={ChangePassword} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}
