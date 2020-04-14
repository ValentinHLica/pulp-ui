import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Provider from "./components/Context";

// Dummy
import Header from "./components/dummy/Header";
import NotFound from "./components/dummy/NotFound";

// Main
import Search from "./components/Search";
import Movie from "./components/Movie";

// User
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Bookmark from "./components/User/Bookmark";

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
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}
