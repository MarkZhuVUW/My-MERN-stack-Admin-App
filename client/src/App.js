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
                      return <ErrorPage code={404} />;
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
                    return <ErrorPage code={401} />;
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
