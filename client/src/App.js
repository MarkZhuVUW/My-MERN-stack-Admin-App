import React, { Component } from "react";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignInSide from "./components/auth/SignInSide";
import SignUp from "./components/auth/SignUp";
import { createMuiTheme } from "@material-ui/core/styles";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/signin">
            <SignInSide />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;
