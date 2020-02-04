import SignInSide from "./components/auth/SignInSide";

import SignUp from "./components/auth/SignUp";

import React, { Component } from "react";

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
import ErrorPage from "./error-pages/ErrorPage";
import Frame from "components/frame/Frame";
import ParticlesBg from "particles-bg";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  // conditionalRouting = () => {
  //   if (!this.props.user) return;
  //   const { role } = this.props.user;
  //   if (role === "admin") {
  //     return (
  //       <>

  //         <Route exact path="/admin">
  //           <AdminDashboard isAdmin={true} />
  //         </Route>

  //         <Route
  //           exact
  //           path="/"
  //           render={() => {
  //             return <Redirect to="/admin" />;
  //           }}
  //         />
  //         <Route
  //           exact
  //           path="/board"
  //           render={() => {
  //             return (
  //               <ErrorPage
  //                 errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //               />
  //             );
  //           }}
  //         />
  //       </>
  //     );
  //   } else if (role === "customer") {
  //     return (
  //       <>
  //         <Route exact path="/board">
  //           <CustomerDashboard />
  //         </Route>

  //         <Route
  //           exact
  //           path="*"
  //           render={() => {
  //             return (
  //               <ErrorPage
  //                 errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //               />
  //             );
  //           }}
  //         />
  //       </>
  //     );
  //   } else if (role === "user") {
  //     return (
  //       <>
  //         <Route exact path="/board">
  //           <CustomerDashboard isUser={true} />
  //         </Route>
  //         <Route
  //           exact
  //           path="/"
  //           render={() => {
  //             return <Redirect to="/board" />;
  //           }}
  //         />
  //         <Route
  //           exact
  //           path="*"
  //           render={() => {
  //             return (
  //               <ErrorPage
  //                 errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //               />
  //             );
  //           }}
  //         />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <ErrorPage
  //         errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //       />
  //     );
  //   }
  // };
  render() {
    const { isAuthenticated } = this.props;
    return (
      <>
        {/* <Router>
          <Switch>
            <Route exact path="/signin" component={SignInSide} />
            <Route exact path="/signup" component={SignUp} />
            {isAuthenticated ? (
              <>
                <Route exact path="/frame" component={Frame} />
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/frame" />;
                  }}
                />
              </>
            ) : (
              <>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/signin" />;
                  }}
                />
                <Route
                  path="*"
                  render={() => {
                    return <ErrorPage code="401" />;
                  }}
                />
              </>
            )}
          </Switch>
        </Router> */}
        <ParticlesBg type="circle" bg={true} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, { loadUser })(App);
