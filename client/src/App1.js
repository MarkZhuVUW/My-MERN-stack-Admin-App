import React, { Component } from "react";
import Login from "./pages/auth/login.js";
import Register from "./pages/auth/register.js";

import CustomerDashboard from "./pages/UserDashboard/dashboard";
import AdminDashboard from "./pages/admin/dashboard.js";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "./actions/authActions";
import ErrorPage from "pages/errorPages/errorPage";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  render() {
    const { user, isAuthenticated } = this.props;
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {isAuthenticated && user ? (
            <>
              {user.role === "admin" ? (
                <>
                  <Route exact path="/admin">
                    <AdminDashboard />
                  </Route>
                  <Route
                    exact
                    path="/"
                    render={() => {
                      return <Redirect to="/admin" />;
                    }}
                  />
                </>
              ) : (
                <>
                  <Route exact path="/board">
                    <CustomerDashboard
                      isUser={user.role === "user" ? true : false}
                    />
                  </Route>
                  <Route
                    exact
                    path="/"
                    render={() => {
                      return <Redirect to="/board" />;
                    }}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/login" />;
                }}
              />
              <Route
                path="*"
                render={() => {
                  return <ErrorPage></ErrorPage>;
                }}
              />
            </>
          )}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, { loadUser })(App);
