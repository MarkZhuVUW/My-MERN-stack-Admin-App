import SignInSide from "./components/auth/SignInSide";

import SignUp from "./components/auth/SignUp";

import React, { Component } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete"; //test i18n

import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "./actions/authActions";
import ErrorPage from "./error-pages/ErrorPage";
import Frame from "components/frame/Frame";
// import Particles from "react-particles-js";
import { zhCN, enUS } from "@material-ui/core/locale";

const chineseTheme = createMuiTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
      type: localStorage.getItem("theme") == "dark" ? "dark" : "light"
    }
  },
  zhCN
);
const englishTheme = createMuiTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
      type: localStorage.getItem("theme") == "dark" ? "dark" : "light"
    }
  },
  zhCN
);
console.log(123);

const themeChooser = (language = localStorage.getItem("language")) => {
  switch (language) {
    case "en":
      return englishTheme;
    case "chinese":
      return chineseTheme;
    default:
      return englishTheme;
  }
};

class App extends Component {
  state = {
    theme: themeChooser()
  };

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
    const { theme } = this.state;
    return (
      <>
        <ThemeProvider theme={theme}>
          <HashRouter basename="/">
            <Switch>
              <Route exact path="/signin" component={SignInSide} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
            {isAuthenticated ? (
              <>
                <Route path="/frame" component={Frame} />
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
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, { loadUser })(App);
