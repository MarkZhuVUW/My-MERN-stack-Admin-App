// import Particles from "react-particles-js";
import { enUS, zhCN } from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Frame from "components/frame/Frame";
import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import "./App.css";
import SignInSide from "./components/auth/SignInSide";
import SignUp from "./components/auth/SignUp";
import ErrorPage from "./error-pages/ErrorPage";
import PropTypes from "prop-types";

const theme = createMuiTheme(
  {
    palette: {
      primary:
        localStorage.getItem("theme") === "dark"
          ? { main: "#303f9f" }
          : { main: "#1976d2" },
      type: localStorage.getItem("theme") == "dark" ? "dark" : "light"
    }
  },
  localStorage.getItem("language") === "en" ? enUS : zhCN
);

class App extends Component {
  state = {
    theme: theme
  };

  componentDidMount() {
    this.props.loadUser();
  }

  static propTypes = {
    authenticated: PropTypes.bool.isRequired
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
    const { theme } = this.state;

    const themeCallback = () => {
      this.setState({
        theme: createMuiTheme(
          {
            palette: {
              primary:
                localStorage.getItem("theme") === "dark"
                  ? { main: "#303f9f" }
                  : { main: "#1976d2" },
              type: localStorage.getItem("theme") == "dark" ? "dark" : "light"
            }
          },
          localStorage.getItem("language") == "en" ? enUS : zhCN
        )
      });
    };
    return (
      <>
        <ThemeProvider theme={theme}>
          <HashRouter basename="/">
            <Route exact path="/signin" component={SignInSide} />
            <Route exact path="/signup" component={SignUp} />

            {this.props.authenticated ? (
              <>
                <Switch>
                  <Route path="/frame">
                    <Frame themeCallback={themeCallback} />
                  </Route>
                  <Route
                    render={() => {
                      return <ErrorPage code="404" />;
                    }}
                  />
                </Switch>

                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/frame" />;
                  }}
                />
              </>
            ) : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/signin" />;
                  }}
                />

                <Route
                  render={() => {
                    return <ErrorPage code="401" />;
                  }}
                />
              </Switch>
            )}
          </HashRouter>
        </ThemeProvider>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated
});
export default connect(mapStateToProps, { loadUser })(App);
