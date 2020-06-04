import { Slide, Zoom } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/styles";
import FacebookProgress from "components/FacebookProgress";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { clearSuccessMsg, register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import "../../css3/bouncingEffect.css";
import ResponsiveDialog from "../ResponsiveDialog";
import RoleCheckboxes from "./RoleCheckboxes";

const theme = createMuiTheme({
  spacing: 4,
});
const styles = {
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "relative",
  },
  root: {
    backgroundColor: theme.palette.grey[600],
  },
  paper: {
    padding: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
};
class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null,
    selectedRole: "",
    checked: false,
    company: "",
    isLoading: false,
    emailErrorMsg: null,
    passwordErrorMsg: null,
    nameErrorMsg: null,
  };

  static propTypes = {
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    userLoaded: PropTypes.bool,
    clearErrors: PropTypes.func.isRequired,
    successMsg: PropTypes.string,
    clearSuccessMsg: PropTypes.func.isRequired,

    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
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
  validateName = (name) => {
    if (name === "") this.setState({ nameErrorMsg: "Name cannot be empty." });
    else this.setState({ nameErrorMsg: null });
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
    if (e.target.name === "name") this.validateName(e.target.value);
    else if (e.target.name === "email") this.validateEmail(e.target.value);
    else if (e.target.name === "password")
      this.validatePassword(e.target.value);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      selectedRole,
      company,
      nameErrorMsg,
      emailErrorMsg,
      passwordErrorMsg,
    } = this.state;
    this.validateName(name);
    this.validateEmail(email);
    this.validatePassword(password);
    if (emailErrorMsg || passwordErrorMsg || nameErrorMsg) return;

    this.setState({
      isLoading: true,
    });
    // Create user object
    const newUser = {
      name,
      email,
      password,
      role: selectedRole,
      company: company,
    };

    // Attempt to register
    this.props.register(newUser).then();

    //clear errors.
    this.toggle();

    //clear success message
    this.props.clearSuccessMsg();
  };

  render() {
    const { classes, error} = this.props;
    const roleSelectedCallback = (selectedRole) => {
      this.setState({
        selectedRole: selectedRole,
      });
    };
    const responsiveDialogCallback = () => {
      this.setState({
        isLoading: false,
      });
      //clear success msg
      this.props.clearSuccessMsg();
    };
    return (
      <div className={classes.root}>
        {this.state.msg ? (
          <ResponsiveDialog
            alertMsg={this.state.msg}
            title={error.id}
            responsiveDialogCallback={responsiveDialogCallback}
          />
        ) : null}
        {!this.state.msg && this.props.successMsg ? (
          <ResponsiveDialog
            alertMsg={this.props.successMsg}
            title={"congrads!"}
            responsiveDialogCallback={responsiveDialogCallback}
          />
        ) : null}
        <Zoom in={true} timeout={500}>
          <Container maxWidth="sm" className={classes.content}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Tooltip title={i18n("clickme")}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon className="animation" />
                </Avatar>
              </Tooltip>

              <Typography component="h1" variant="h5">
                {i18n("registerPage.signUp")}
              </Typography>

              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label={i18n("registerPage.name")}
                      error={!!this.state.nameErrorMsg}
                      helperText={this.state.nameErrorMsg}
                      onChange={this.onChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label={i18n("registerPage.email")}
                      name="email"
                      error={!!this.state.emailErrorMsg}
                      helperText={this.state.emailErrorMsg}
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label={i18n("registerPage.password")}
                      type="password"
                      id="password"
                      error={!!this.state.passwordErrorMsg}
                      helperText={this.state.passwordErrorMsg}
                      onChange={this.onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {this.state.selectedRole === "employer" ? (
                      <Slide direction="left" in={true}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          name="company"
                          label={i18n("registerPage.company")}
                          type="company"
                          id="company"
                          onChange={this.onChange}
                        />
                      </Slide>
                    ) : null}
                  </Grid>

                  <RoleCheckboxes roleSelectedCallback={roleSelectedCallback} />
                  {this.state.selectedRole !== "admin" &&
                  this.state.selectedRole !== "" ? (
                    <Slide in={true} direction="right">
                      <Grid container>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={() => {
                                this.setState({
                                  checked: !this.state.checked,
                                });
                              }}
                              color="primary"
                            />
                          }
                          label={i18n("registerPage.warning")}
                        />
                      </Grid>
                    </Slide>
                  ) : null}
                </Grid>
                <Button
                  disabled={
                    (this.state.selectedRole === "employer" &&
                      !this.state.checked) ||
                    this.state.isLoading ||
                    this.state.selectedRole === "" ||
                    this.state.email === "" ||
                    this.state.password === "" ||
                    this.state.passwordErrorMsg !== null ||
                    this.state.emailErrorMsg !== null
                  }
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onSubmit}
                >
                  {this.state.isLoading ? (
                    <FacebookProgress />
                  ) : (
                    <Typography>{i18n("registerPage.signUp")}</Typography>
                  )}
                </Button>

                <Grid container justify="center">
                  <Grid item>
                    <NavLink
                      to="/signin"
                      variant="body2"
                      style={{
                        textDecoration: "none",
                        color:
                          localStorage.getItem("theme") === "dark"
                            ? "white"
                            : "black",
                      }}
                    >
                      {i18n("registerPage.goBack")}
                    </NavLink>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </Zoom>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  userLoaded: state.auth.userLoaded,
  successMsg: state.auth.successMsg,
});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { register, clearErrors, clearSuccessMsg })
)(withRouter(SignUp));
