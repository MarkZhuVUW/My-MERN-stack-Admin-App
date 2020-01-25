import React, { Component } from "react";

// import { Provider } from "react-redux";
// import store from "./store";

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

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "./actions/authActions";
import withTracker from "./components/withTracker";
class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/signin" component={SignInSide} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
        {!this.props.isAuthenticated ? (
          <Redirect to="/signin" />
        ) : (
          <>
            <Route path="/frame" component={withTracker(Frame)} />

            <Route exact path="/" render={() => <Redirect to="/frame" />} />
          </>
        )}
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { loadUser })(App);
