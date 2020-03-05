import { Zoom } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/styles";
import FacebookProgress from "components/FacebookProgress";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { logLoginSuccess } from "../../actions/adminActions";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "../../css3/bouncingEffect.css";
import ResponsiveDialog from "../ResponsiveDialog";

const theme = createMuiTheme({
  spacing: 4
});

const styles = {
  root: {
    backgroundColor:
      localStorage.getItem("theme") === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[600],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      localStorage.getItem("theme") === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[600],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    padding: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  content: {
    padding: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
    position: "relative"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
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
    passwordErrorMsg: null
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    userLoaded: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired,
    isTFAing: PropTypes.bool,

    user: PropTypes.object,
    logLoginSuccess: PropTypes.func,

    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
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

  onSubmit = e => {
    e.preventDefault();

    const { email, password, emailErrorMsg, passwordErrorMsg } = this.state;
    this.validateEmail(email);
    this.validatePassword(password);
    if (emailErrorMsg || passwordErrorMsg) return;
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

  callback = isTFAVerified => {
    if (isTFAVerified) {
      this.setState({
        isLoading: false
      });
      this.handleLoginSuccess();
      this.props.history.push("/");
    }
  };

  handleLoginSuccess = () => {
    const { _id, name, email, role, company } = this.props.user;

    const logLoginSuccess = {
      name: name,
      email: email,
      role: role,
      company: company,
      explanation: "user logged in",
      type: "LOGIN"
    };

    this.props.logLoginSuccess(_id, logLoginSuccess);

    this.toggle();
  };
  validateEmail = email => {
    if (email === "")
      this.setState({ emailErrorMsg: "Email cannot be empty." });
    else if (!email.includes("@"))
      this.setState({ emailErrorMsg: "Incorrect format" });
    else this.setState({ emailErrorMsg: null });
  };
  validatePassword = password => {
    if (password === "")
      this.setState({ passwordErrorMsg: "Password cannot be empty." });
    else this.setState({ passwordErrorMsg: null });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "email") this.validateEmail(e.target.value);
    else if (e.target.name === "password")
      this.validatePassword(e.target.value);
  };
  render() {
    const { classes, userLoaded, error } = this.props;
    const { email, msg } = this.state;

    const responsiveDialogCallback = () => {
      this.setState({
        isLoading: false
      });
    };

    const handleSnackbarClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      this.setState({
        forgotPasswordClicked: false
      });
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
      <div>
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
        {userLoaded ? (
          <ResponsiveDialog
            alertMsg="Download google authenticator app from any app store, scan the QRCode, enter the code shown on the app and submit"
            title="Google Two-Factor Auth"
            email={email}
            cb={this.callback}
            selectedRole={this.state.selectedRole}
            responsiveDialogCallback={responsiveDialogCallback}
            loginSuccessCallback={this.callback}
          />
        ) : null}

        <Grid container className={classes.root}>
          <CssBaseline />

          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            style={{
              backgroundColor:
                localStorage.getItem("theme") === "dark"
                  ? theme.palette.grey[900]
                  : theme.palette.grey[600],
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Zoom in={true} timeout={500}>
              <Container className={classes.content}>
                <Paper className={classes.paper}>
                  <Tooltip title={i18n("clickme")}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon className="animation" />
                    </Avatar>
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

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={this.state.isLoading}
                      className={classes.submit}
                      onClick={this.onSubmit}
                    >
                      {this.state.isLoading ? (
                        <FacebookProgress />
                      ) : (
                        <Typography>{i18n("loginPage.signIn")}</Typography>
                      )}
                    </Button>

                    <Grid container>
                      <Grid item xs>
                        <NavLink
                          to="#"
                          onClick={() =>
                            this.setState({
                              forgotPasswordClicked: true
                            })
                          }
                          style={{
                            textDecoration: "none",
                            color:
                              localStorage.getItem("theme") === "dark"
                                ? "white"
                                : "black"
                          }}
                        >
                          {i18n("loginPage.forgotPassword")}
                        </NavLink>
                      </Grid>
                      <Grid item>
                        <NavLink
                          to="/signup"
                          variant="body2"
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
                  </form>
                </Paper>
              </Container>
            </Zoom>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  userLoaded: state.auth.userLoaded,
  isTFAing: state.auth.isTFAing,
  user: state.auth.user
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { login, clearErrors, logLoginSuccess })
)(withRouter(SignInSide));
