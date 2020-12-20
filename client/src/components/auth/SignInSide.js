import {
  Button,
  Container,
  CssBaseline,
  Tooltip,
  Zoom,
  Paper,
  Grid,
  createMuiTheme,
  TextField,
  Typography
} from "@material-ui/core";

import { withStyles } from "@material-ui/styles";
import { logLoginSuccess } from "actions/adminActions";
import {
  getGithubAccessToken,
  getGithubUser,
  login
} from "actions/authActions";
import { clearErrors } from "actions/errorActions";
import AnimatedIcons from "components/AnimatedIcons/AnimatedIcons";
import ImageRevealEffect from "components/ImageRevealEffect/ImageRevealEffect";
import FacebookProgress from "components/shared/FacebookProgress";
import confidentials from "confidentials/confidentials";
import "css3/bouncingEffect.css";
import { i18n } from "i18n";
import image from "images/404.png";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { NavLink, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import GitHubLogin from "../oauth/GitHubLogin";
import ResponsiveDialog from "../shared/ResponsiveDialog";

const theme = createMuiTheme({
  spacing: 4
});

const styles = {
  root: {
    backgroundColor: theme.palette.grey[600],
    flexGrow: 1,
    // height: "100vh",
    overflow: "auto",
    position: "relative",
    minHeight: "100vh"
  },
  paper: {
    padding: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    position: "relative"
  },
  content: {
    padding: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  githubSignIn: {
    margin: theme.spacing(2)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  animatedIcons: {
    zIndex: 2,
    position: "relative"
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    // position: "relative",
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 5
  },

  header: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    // position: "relative",

    width: "100%",
    top: 0,

    zIndex: 5
  }
};

class SignInSide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      selectedRole: "",
      forgotPasswordClicked: false,
      isLoading: false,
      emailErrorMsg: null,
      passwordErrorMsg: null,
      copyRightOpened: false,
      copyRightText: i18n("loginPage.licenseText")
    };
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    this.validateEmail(email);
    this.validatePassword(password);
    this.setState({
      isLoading: true
    });

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
    this.toggle();
  };

  onGithubSignIn = (code) => {
    this.props.getGithubAccessToken(code).then(() => {
      this.props.getGithubUser();
    });

    this.toggle();
  };

  callback = (isTFAVerified) => {
    if (isTFAVerified) {
      this.setState({
        isLoading: false
      });
      this.handleLoginSuccess();
      this.props.history.push("/");
    }
  };

  handleLoginSuccess = () => {
    const { _id, name, email, role, company, uniqueId } = this.props.user;

    const logLoginSuccessObj = {
      name,
      email,
      role,
      company,
      explanation: "user logged in",
      type: "LOGIN"
    };

    // uniqueId is used to distinguish each oauth user. It exists when it is an oauth user object.
    if (uniqueId)
      this.props.logLoginSuccess(uniqueId, logLoginSuccessObj, true);
    // if user is not oauth user, we can use _id to distinguish users.
    else this.props.logLoginSuccess(_id, logLoginSuccessObj, false);

    this.toggle();
  };

  validateEmail = (email) => {
    if (email === "")
      this.setState({
        emailErrorMsg: "Email cannot be empty."
      });
    else if (!email.includes("@"))
      this.setState({
        emailErrorMsg: "Incorrect format"
      });
    else
      this.setState({
        emailErrorMsg: null
      });
  };

  validatePassword = (password) => {
    if (password === "")
      this.setState({
        passwordErrorMsg: "Password cannot be empty."
      });
    else
      this.setState({
        passwordErrorMsg: null
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.name === "email") this.validateEmail(e.target.value);
    else if (e.target.name === "password")
      this.validatePassword(e.target.value);
  };

  render() {
    const { classes, userLoaded, error, user } = this.props;

    const responsiveDialogCallback = () => {
      this.setState({
        isLoading: false,
        copyRightOpened: false,
        forgotPasswordClicked: false
      });
    };

    return (
      <div>
        <MediaQuery query="(max-width: 1280px)">
          <header className={classes.header}>
            <Container>
              <Typography
                variant="body1"
                style={{
                  color: "white"
                }}
              >
                {i18n("loginPage.cookie")}
              </Typography>
            </Container>
          </header>
        </MediaQuery>
        {/* if user credentials are correct. Do a google 2fa before login to dashboard */}

        {this.state.forgotPasswordClicked && (
          <ResponsiveDialog
            title="Forgot password?"
            alertMsg={i18n("loginPage.registerANewOne")}
            responsiveDialogCallback={responsiveDialogCallback}
          />
        )}
        {userLoaded && !user.id ? (
          <ResponsiveDialog
            alertMsg={i18n("loginPage.downloadTFAApp")}
            title={i18n("loginPage.googleTFA")}
            cb={this.callback}
            selectedRole={this.state.selectedRole}
            responsiveDialogCallback={responsiveDialogCallback}
            loginSuccessCallback={this.callback}
            isGithubUserLoaded={false}
          />
        ) : null}
        {userLoaded && user.id ? (
          <ResponsiveDialog
            alertMsg={i18n("loginPage.chooseRole")}
            title={i18n("loginPage.githubOauth")}
            cb={this.callback}
            selectedRole={this.state.selectedRole}
            responsiveDialogCallback={responsiveDialogCallback}
            loginSuccessCallback={this.callback}
            isGithubUserLoaded
          />
        ) : null}

        <Grid container className={classes.root}>
          <CssBaseline />

          <MediaQuery query="(min-width: 1280px)">
            <Grid item lg={7}>
              <ImageRevealEffect image={image} />
            </Grid>
          </MediaQuery>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={5}
            component={Paper}
            elevation={6}
            square
            style={{
              backgroundColor: theme.palette.grey[600],
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Zoom in timeout={500}>
              <Container className={classes.content}>
                <Paper className={classes.paper}>
                  <Tooltip
                    title={i18n("loginPage.loginAsDifferentUser")}
                    aria-label={i18n("loginPage.loginAsDifferentUser")}
                  >
                    <span
                      onKeyDown={() => {}}
                      onClick={() => {
                        this.setState({
                          isLoading: true
                        });
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <GitHubLogin
                        buttonText={i18n("loginPage.signInWithGithub")}
                        clientId={confidentials.github_client_id}
                        redirectUri=""
                        onSuccessCallback={(res) => this.onGithubSignIn(res)}
                        onFailureCallback={(res) => {
                          console.error(res);
                          this.setState({ isLoading: false });
                        }}
                      />
                    </span>
                  </Tooltip>

                  <Typography component="h1" variant="h5">
                    {i18n("loginPage.welcome")}
                  </Typography>
                  {error.msg ? (
                    <ResponsiveDialog
                      alertMsg={error.msg}
                      title={error.id}
                      responsiveDialogCallback={responsiveDialogCallback}
                    />
                  ) : null}

                  <form className={classes.form}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      id="email"
                      label={i18n("loginPage.email")}
                      name="email"
                      error={!!this.state.emailErrorMsg}
                      helperText={this.state.emailErrorMsg}
                      onChange={this.onChange}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label={i18n("loginPage.password")}
                      type="password"
                      id="password"
                      error={!!this.state.passwordErrorMsg}
                      helperText={this.state.passwordErrorMsg}
                      onChange={this.onChange}
                    />
                    <Tooltip
                      title={i18n("loginPage.loginAsDifferentUser")}
                      aria-label={i18n("loginPage.loginAsDifferentUser")}
                    >
                      <span>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={
                            this.state.isLoading ||
                            this.state.email === "" ||
                            this.state.password === "" ||
                            this.state.passwordErrorMsg !== null ||
                            this.state.emailErrorMsg !== null
                          }
                          className={classes.submit}
                          onClick={this.onSubmit}
                        >
                          {this.state.isLoading ? (
                            <FacebookProgress />
                          ) : (
                            <Typography>{i18n("loginPage.signIn")}</Typography>
                          )}
                        </Button>
                      </span>
                    </Tooltip>

                    <Grid container>
                      <Grid item xs>
                        <Typography
                          component="a"
                          href="#"
                          variant="caption"
                          onClick={() => {
                            this.setState({
                              forgotPasswordClicked: true
                            });
                          }}
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black"
                          }}
                        >
                          {i18n("loginPage.forgotPassword")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to="/signup"
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black"
                          }}
                        >
                          {i18n("loginPage.noAccount")}
                        </NavLink>
                      </Grid>
                    </Grid>
                    {/* open the copyright dialog if the "MIT" license link is clicked */}
                    {this.state.copyRightOpened ? (
                      <ResponsiveDialog
                        title="MIT License"
                        alertMsg={this.state.copyRightText}
                        responsiveDialogCallback={responsiveDialogCallback}
                      />
                    ) : null}
                    <Grid
                      container
                      style={{
                        marginTop: 15
                      }}
                    >
                      <Grid item xs>
                        <Typography
                          component="a"
                          href="#"
                          variant="caption"
                          onClick={() => {
                            this.setState({
                              copyRightOpened: true
                            });
                          }}
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black"
                          }}
                        >
                          {i18n("loginPage.mit")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          component="a"
                          href="#"
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black"
                          }}
                          onClick={() => {
                            window.location.href = `mailto:zdy120939259@outlook.com?subject=interview invitation`;
                          }}
                        >
                          {i18n("loginPage.contactDeveloper")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Container>
            </Zoom>
            <Container className={classes.animatedIcons}>
              <AnimatedIcons className="animated-icons" />
            </Container>
            <Typography
              style={{
                width: "100%",
                textAlign: "center",
                position: "relative",
                zIndex: 2,
                color:
                  localStorage.getItem("theme") === "dark" ? "white" : "black"
              }}
            >
              {i18n("loginPage.inspiredBy")}
            </Typography>
          </Grid>
          <MediaQuery query="(min-width: 1280px)">
            <footer className={classes.footer}>
              <Container>
                <Typography
                  variant="body1"
                  style={{
                    color: "white"
                  }}
                >
                  {i18n("loginPage.cookie")}
                </Typography>
              </Container>
            </footer>
          </MediaQuery>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  userLoaded: state.auth.userLoaded,
  user: state.auth.user
});
SignInSide.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object]).isRequired,
  login: PropTypes.func.isRequired,
  userLoaded: PropTypes.bool,
  clearErrors: PropTypes.func.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]),
  logLoginSuccess: PropTypes.func.isRequired,
  getGithubAccessToken: PropTypes.func.isRequired,
  getGithubUser: PropTypes.func.isRequired,

  // withRouter
  history: PropTypes.oneOfType([PropTypes.object]).isRequired
};
SignInSide.defaultProps = {
  userLoaded: false,
  user: undefined
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    login,
    clearErrors,
    logLoginSuccess,
    getGithubAccessToken,
    getGithubUser
  })
)(withRouter(SignInSide));
