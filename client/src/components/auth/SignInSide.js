import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { logLoginSuccess } from "../../actions/adminActions";

import ResponsiveDialog from "../ResponsiveDialog";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import RoleCheckboxes from "./RoleCheckboxes";

const theme = createMuiTheme({
  spacing: 4
});

const styles = {
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    padding: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    msg: null
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    userLoaded: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired,
    isTFAing: PropTypes.bool,
    isAuthenticated: PropTypes.bool,

    user: PropTypes.object,
    logLoginSuccess: PropTypes.object,
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

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
      this.handleLoginSuccess();
      this.props.history.push("/frame/dashboard/");
    }
  };

  handleLoginSuccess = () => {
    const { _id, name, email, role, logs } = this.props.user;

    const logLoginSuccess = {
      name: name,
      email: email,
      role: role,
      explanation: "user logged in",
      type: "LOGIN"
    };

    this.props.logLoginSuccess(_id, logLoginSuccess);

    this.toggle();
  };

  render() {
    const { classes, isTFAing, userLoaded, error, isLoading } = this.props;
    const { email, msg } = this.state;

    return (
      <div>
        {/* if user credentials are correct. Do a google 2fa before login to dashboard */}
        {userLoaded ? (
          <ResponsiveDialog
            alertMsg="enter the code from google authenticator to log in."
            title="Google Two-Factor Auth"
            email={email}
            cb={this.callback}
          />
        ) : null}

        <Grid container component="main" className={classes.root}>
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
          >
            <Container className={classes.paper}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Welcome!
                </Typography>
                {this.state.msg ? (
                  <ResponsiveDialog alertMsg={msg} title={error.id} />
                ) : null}

                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.onChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.onChange}
                  />

                  <RoleCheckboxes />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.onSubmit}
                  >
                    Sign in
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <NavLink to="#" variant="body2">
                        Forgot password?
                      </NavLink>
                    </Grid>
                    <Grid item>
                      <NavLink to="./signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </NavLink>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Container>
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
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { login, clearErrors, logLoginSuccess })
)(withRouter(SignInSide));
