// import Particles from "react-particles-js";
import { enUS, zhCN } from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Frame from "components/frame/Frame";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Particles from "react-particles-js";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import "./App.scss";
import SignInSide from "./components/auth/SignInSide";
import SignUp from "./components/auth/SignUp";
import ErrorPage from "./error-pages/ErrorPage";
const theme = createMuiTheme(
  {
    palette: {
      primary:
        localStorage.getItem("theme") === "dark"
          ? { main: "#303f9f" }
          : { main: "#1976d2" },
      type: localStorage.getItem("theme") === "dark" ? "dark" : "light",
    },
  },
  localStorage.getItem("language") === "en" ? enUS : zhCN
);

class App extends Component {
  state = {
    theme: theme,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
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
              type: localStorage.getItem("theme") === "dark" ? "dark" : "light",
            },
          },
          localStorage.getItem("language") == "en" ? enUS : zhCN
        ),
      });
    };
    const particlesBackground = (size, numParticles) => (
      <Particles
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        params={{
          particles: {
            number: {
              value: numParticles,
            },
            size: {
              value: size,
            },

            move: {
              enable: true,
              // speed: 6,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
            },
          },
        }}
      />
    );
    return (
      <div>
        <ThemeProvider theme={theme}>
          <HashRouter basename="/">
            {this.props.authenticated ? (
              <div>
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
              </div>
            ) : (
              <>
                <MediaQuery query="(min-width: 1280px)">
                  {particlesBackground(3, 120)}
                </MediaQuery>
                <MediaQuery query="(max-width: 1280px)">
                  {particlesBackground(3, 50)}
                </MediaQuery>

                <Switch>
                  <Route exact path="/signin" component={SignInSide} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route
                    path="/api/auth/github-signin-callback"
                    render={() => {
                      return <Redirect to="/frame" />;
                    }}
                  ></Route>
                  <Route
                    render={() => {
                      return <ErrorPage code={401} />;
                    }}
                  />
                </Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/signin" />;
                  }}
                />
              </>
            )}
          </HashRouter>
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated,
});
export default connect(mapStateToProps, { loadUser })(App);
