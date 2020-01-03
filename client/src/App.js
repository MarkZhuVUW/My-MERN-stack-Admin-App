import React, { Component } from "react";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Frame from "./components/frame/Frame";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
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
          <Switch>
            <Route exact path="/" component={Frame}></Route>
            <Route path="/signin" component={SignInSide}></Route>
            <Route path="/signup" component={SignUp}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
