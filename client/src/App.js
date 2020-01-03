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

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    // this.props.loadUser();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  render() {
    return (
      <Router>
        <Route path="/" component={Frame} />
        <Switch>
          
          <Route path="/signin" component={SignInSide} />
          <Route path="/signup" component={SignUp} />

          {/* <Route
              exact
              path="/"
              render={() => {
                return (
                  <>
                  {console.log(this.props.isAuthenticated)}
                    {this.props.isAuthenticated ? (
                      <Frame />
                    ) : (
                      <Redirect to="/signin" />
                    )}
                  </>
                );
              }}
            /> */}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { loadUser })(App);
