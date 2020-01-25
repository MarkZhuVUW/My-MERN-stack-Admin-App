import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import ResponsiveDialog from "../ResponsiveDialog";
import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";

import SimpleBackdrop from "../MyBackdrop";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import RoleCheckboxes from "./RoleCheckboxes";

const theme = createMuiTheme({
  spacing: 4
});
const styles = {
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
};
class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    selectedRole: "admin",
    checked: false
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    userLoaded: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    successMsg: PropTypes.string,
    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // if (isAuthenticated) {
    //   this.toggle();
    // }
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

    const { name, email, password, selectedRole } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      password,
      role: selectedRole
    };

    // Attempt to register
    this.props.register(newUser);

    //clear errors.
    this.toggle();
  };

  render() {
    const { classes, error, isLoading } = this.props;
    const roleSelectedCallback = selectedRole => {
      this.setState({
        selectedRole: selectedRole
      });
    };
    return (
      <Container maxWidth="sm" className={classes.paper}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {this.state.msg ? (
            <ResponsiveDialog alertMsg={this.state.msg} title={error.id} />
          ) : null}
          {!this.state.msg && this.props.successMsg ? (
            <ResponsiveDialog
              alertMsg={this.props.successMsg}
              title={"congrads!"}
            />
          ) : null}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={this.onChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                {this.state.checked &&
                this.state.selectedRole === "employer" ? (
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="company"
                    label="company"
                    type="company"
                    id="company"
                    onChange={this.onChange}
                  />
                ) : null}
              </Grid>

              <RoleCheckboxes roleSelectedCallback={roleSelectedCallback} />
              {this.state.selectedRole !== "admin" ? (
                <Grid container>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          this.setState({
                            checked: !this.state.checked
                          });
                        }}
                        color="primary"
                      />
                    }
                    label="Is it ok if I store your login information to my mongodb database?"
                  />
                </Grid>
              ) : null}
            </Grid>
            <Button
              disabled={
                this.state.selectedRole === "employer" && !this.state.checked
              }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign Up
            </Button>

            <Grid container justify="center">
              <Grid item>
                <NavLink to="/signin" variant="body2">
                  go back
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  userLoaded: state.auth.userLoaded,
  isAuthenticated: state.auth.isAuthenticated,
  successMsg: state.auth.successMsg
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { register, clearErrors })
)(withRouter(SignUp));
