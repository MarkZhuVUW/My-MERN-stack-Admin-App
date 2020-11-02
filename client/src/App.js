// import Particles from "react-particles-js";

import { enUS, zhCN } from "@material-ui/core/locale";
import { createMuiTheme } from "@material-ui/core/styles";
import { getGithubUser, loadUser } from "actions/authActions";
import PropTypes from "prop-types";
import { Component, default as React, default as React } from "react";
import { connect } from "react-redux";
import "./App.scss";

const darkOrLightTheme = createMuiTheme(
  {
    palette: {
      primary:
        localStorage.getItem("theme") === "dark"
          ? { main: "#303f9f" }
          : { main: "#1976d2" },
      type: localStorage.getItem("theme") === "dark" ? "dark" : "light"
    }
  },
  localStorage.getItem("language") === "en" ? enUS : zhCN
);

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
  getGithubUser: PropTypes.func.isRequired
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: darkOrLightTheme
    };
  }

  componentDidMount() {
    if (localStorage.getItem("githubAccessToken")) {
      this.props.getGithubUser();
    } else if (localStorage.getItem("token")) {
      this.props.loadUser();
    }
  }

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
              type: localStorage.getItem("theme") === "dark" ? "dark" : "light"
            }
          },
          localStorage.getItem("language") === "en" ? enUS : zhCN
        )
      });
    };

    return (
      <div>
        <ClearCache>
          {({ isLatestVersion, emptyCacheStorage }) => (
            <div >
              {!isLatestVersion && (
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
                          <ParticlesCustomized
                            numParticles={50}
                            size={3}
                            hoverMode="bubble"
                          />
                        </MediaQuery>
                        <MediaQuery query="(max-width: 1280px)">
                          <ParticlesCustomized
                            numParticles={15}
                            size={1}
                            hoverMode="bubble"
                          />
                        </MediaQuery>

                        <Switch>
                          <Route exact path="/signin" component={SignInSide} />
                          <Route exact path="/signup" component={SignUp} />
                          <Route
                            path="/frame"
                            render={() => {
                              return <ErrorPage code={401} />;
                            }}
                          />
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
                            return <Redirect to="/signin" />;
                          }}
                        />
                      </>
                    )}
                  </HashRouter>
                </ThemeProvider>
              )}
            </div>
          )}
        </ClearCache>
      </div>
    );
  }
}

App.propTypes = propTypes;
const mapStateToProps = (state) => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated
});
export default connect(mapStateToProps, { loadUser, getGithubUser })(App);
