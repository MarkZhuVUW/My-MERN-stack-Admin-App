import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "./App.css";
import Frame from "./components/frame/Frame";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import SignInSide from "./components/auth/SignInSide";
import SignUp from "./components/auth/SignUp";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={Frame}></Route>
          {/* <Switch> */}
            <Route path="/signin" component={SignInSide}></Route>
            <Route path="/signup" component={SignUp}></Route>
          {/* </Switch> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
