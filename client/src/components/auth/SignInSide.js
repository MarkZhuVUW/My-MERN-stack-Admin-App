import { Tooltip, Zoom } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/styles";
import { logLoginSuccess } from "actions/adminActions";
import {
  getGithubAccessToken,
  getGithubUser,
  login,
} from "actions/authActions";
import { clearErrors } from "actions/errorActions";
import AnimatedIcons from "components/AnimatedIcons/AnimatedIcons";
import FacebookProgress from "components/FacebookProgress";
import ImageRevealEffect from "components/ImageRevealEffect/ImageRevealEffect";
import confidentials from "confidentials/confidentials.json";
import "css3/bouncingEffect.css";
import { i18n } from "i18n";
import image from "images/404.png";
import PropTypes from "prop-types";
import React, { Component } from "react";
import GitHubLogin from "react-github-login";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { NavLink, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import ResponsiveDialog from "../ResponsiveDialog";
const theme = createMuiTheme({
  spacing: 4,
});

const styles = {
  root: {
    backgroundColor: theme.palette.grey[600],
    flexGrow: 1,
    // height: "100vh",
    overflow: "auto",
    position: "relative",
    minHeight: "100vh",
  },

  paper: {
    padding: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    position: "relative",
  },
  content: {
    padding: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  githubSignIn: {
    margin: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  animatedIcons: {
    zIndex: 2,
    position: "relative",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    // position: "relative",
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 5,
  },

  header: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    // position: "relative",
    position: "absolute",
    width: "100%",
    top: 0,

    zIndex: 5,
  },
};

class SignInSide extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
    selectedRole: "",
    forgotPasswordClicked: false,
    checked: false,
    isLoading: false,
    emailErrorMsg: null,
    passwordErrorMsg: null,
    copyRightOpened: false,
    copyRightText: i18n("loginPage.licenseText"),
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    userLoaded: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired,
    isTFAing: PropTypes.bool,

    user: PropTypes.object,
    logLoginSuccess: PropTypes.func.isRequired,
    getGithubAccessToken: PropTypes.func.isRequired,
    getGithubUser: PropTypes.func.isRequired,

    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error

      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
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
      isLoading: true,
    });

    const user = {
      email,
      password,
    };
    console.log(user);

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
        isLoading: false,
      });
      this.handleLoginSuccess();
      this.props.history.push("/");
    }
  };

  handleLoginSuccess = () => {
    const { _id, name, email, role, company, uniqueId } = this.props.user;

    const logLoginSuccess = {
      name: name,
      email: email,
      role: role,
      company: company,
      explanation: "user logged in",
      type: "LOGIN",
    };

    // uniqueId is used to distinguish each oauth user. It exists when it is an oauth user object.
    if (uniqueId) this.props.logLoginSuccess(uniqueId, logLoginSuccess, true);
    // if user is not oauth user, we can use _id to distinguish users.
    else this.props.logLoginSuccess(_id, logLoginSuccess, false);

    this.toggle();
  };
  validateEmail = (email) => {
    if (email === "")
      this.setState({ emailErrorMsg: "Email cannot be empty." });
    else if (!email.includes("@"))
      this.setState({ emailErrorMsg: "Incorrect format" });
    else this.setState({ emailErrorMsg: null });
  };
  validatePassword = (password) => {
    if (password === "")
      this.setState({ passwordErrorMsg: "Password cannot be empty." });
    else this.setState({ passwordErrorMsg: null });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "email") this.validateEmail(e.target.value);
    else if (e.target.name === "password")
      this.validatePassword(e.target.value);
  };
  render() {
    const { classes, userLoaded, error, user } = this.props;
    const { email, msg } = this.state;

    const responsiveDialogCallback = () => {
      this.setState({
        isLoading: false,
        copyRightOpened: false,
      });
    };

    const handleSnackbarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      this.setState({
        forgotPasswordClicked: false,
      });
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
      <div>
        <MediaQuery query="(max-width: 1280px)">
          <header className={classes.header}>
            <Container>
              <Typography variant="body1" style={{ color: "white" }}>
                {i18n("loginPage.cookie")}
              </Typography>
            </Container>
          </header>
        </MediaQuery>
        {/* if user credentials are correct. Do a google 2fa before login to dashboard */}
        <Snackbar
          open={this.state.forgotPasswordClicked}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {i18n("loginPage.registerANewOne")}
          </Alert>
        </Snackbar>
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
            isGithubUserLoaded={true}
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
              flexDirection: "column",
            }}
          >
            <Zoom in={true} timeout={500}>
              <Container className={classes.content}>
                <Paper className={classes.paper}>
                  <Tooltip
                    title={i18n("loginPage.loginAsDifferentUser")}
                    aria-label={i18n("loginPage.loginAsDifferentUser")}
                  >
                    <span>
                      <GitHubLogin
                        buttonText={i18n("loginPage.signInWithGithub")}
                        clientId={confidentials.client_id}
                        redirectUri=""
                        onSuccess={(res) => this.onGithubSignIn(res.code)}
                        onFailure={(res) => console.error(res)}
                      />
                    </span>
                  </Tooltip>

                  <Typography component="h1" variant="h5">
                    {i18n("loginPage.welcome")}
                  </Typography>
                  {this.state.msg ? (
                    <ResponsiveDialog
                      alertMsg={msg}
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
                      error={this.state.emailErrorMsg ? true : false}
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
                      error={this.state.passwordErrorMsg ? true : false}
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
                        <NavLink
                          to="#"
                          onClick={() =>
                            this.setState({
                              forgotPasswordClicked: true,
                            })
                          }
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black",
                          }}
                        >
                          {i18n("loginPage.forgotPassword")}
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to="/signup"
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black",
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
                    <Grid container style={{ marginTop: 15 }}>
                      <Grid item xs>
                        <Typography
                          component="a"
                          href="#"
                          variant="caption"
                          onClick={() => {
                            this.setState({ copyRightOpened: true });
                          }}
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black",
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
                                : "black",
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
                  localStorage.getItem("theme") === "dark" ? "white" : "black",
              }}
            >
              {i18n("loginPage.inspiredBy")}
            </Typography>
          </Grid>
          <MediaQuery query="(min-width: 1280px)">
            <footer className={classes.footer}>
              <Container>
                <Typography variant="body1" style={{ color: "white" }}>
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
  isTFAing: state.auth.isTFAing,
  user: state.auth.user,
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, {
    login,
    clearErrors,
    logLoginSuccess,
    getGithubAccessToken,
    getGithubUser,
  })
)(withRouter(SignInSide));
