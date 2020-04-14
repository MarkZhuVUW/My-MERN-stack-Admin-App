import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
//redux
import {
  getTFA,
  logout,
  skipTFA,
  TFASetup,
  TFAVerify,
} from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

const theme = createMuiTheme({
  spacing: 4,
});

const styles = {
  centerItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    margin: "0",
  },
};

class ResponsiveDialog extends Component {
  state = {
    open: true,
    QRCode: "",
    code: "",
    domainName: "",
  };

  static propTypes = {
    error: PropTypes.object.isRequired,

    clearErrors: PropTypes.func.isRequired,
    TFAVerify: PropTypes.func.isRequired,
    TFASetup: PropTypes.func.isRequired,
    getTFA: PropTypes.func.isRequired,
    skipTFA: PropTypes.func.isRequired,
    TFA: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
  };
  componentDidMount() {
    const { email, TFA } = this.props;
    const { domainName } = this.state;
    if (this.props.title === "Google Two-Factor Auth") {
      const obj = {
        email,
        domainName,
      };
      if (!this.props.TFA) {
        this.props.TFASetup(obj);
        this.props.getTFA(obj);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { error, type } = this.props;
    const { domainName } = this.state;
    const isAuthenticated =
      localStorage.getItem("authenticated") == "true" ? true : false;

    if (isAuthenticated && type !== "User Admin Error Handling") {
      this.props.cb(true);
    }
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "TFA_VERIFY_FAIL") {
        // re-enable login button and hide the loading spinner

        // this.props.ResponsiveDialogCallback();

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

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    //re-enable login button and hide the loading spinner
    this.props.responsiveDialogCallback();

    this.setState({
      open: false,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { code } = this.state;
    const { alertMsg } = this.props;

    // Attempt to login
    this.props.TFAVerify(this.props.email, code);

    //clear errors
    this.toggle();
  };
  onChange = (e) => {
    this.setState({ code: e.target.value });
  };

  skipTFA = () => {
    this.props.skipTFA();
    this.props.loginSuccessCallback(true);
  };

  render() {
    const { classes, title, alertMsg, TFA } = this.props;

    // get TFA object from props for dispalying qrcode
    const { open } = this.state;

    //stop this from getting lost in lambda expressions.
    const dialog = (isFullScreen) => {
      return (
        <Dialog
          open={open}
          fullScreen={isFullScreen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          onBackdropClick={() => {
            this.props.logout();
          }}
        >
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{alertMsg}</DialogContentText>

            {TFA ? (
              <div className={classes.centerItems}>
                <img src={TFA.dataURL} />
              </div>
            ) : null}
          </DialogContent>
          {title === "Google Two-Factor Auth" ? (
            <div
              style={{
                width: "100%",
              }}
            >
              {TFA ? (
                <DialogActions>
                  <TextField
                    autoFocus
                    variant="outlined"
                    label="enter code"
                    fullWidth
                    onChange={this.onChange}
                  />
                  <Button
                    onClick={this.onSubmit}
                    type="submit"
                    color={
                      localStorage.getItem("theme") === "dark"
                        ? "default"
                        : "primary"
                    }
                  >
                    submit
                  </Button>

                  <Button onClick={this.skipTFA}>skip TFA</Button>
                </DialogActions>
              ) : (
                <>
                  <Typography>
                    Please click on the backdrop to close this dialog or click
                    the button
                  </Typography>
                  <Button
                    onClick={() => {
                      this.props.logout();
                    }}
                  >
                    logout
                  </Button>
                </>
              )}
            </div>
          ) : (
            <DialogActions>
              <Button
                onClick={this.handleClose}
                color={
                  localStorage.getItem("theme") === "dark"
                    ? "default"
                    : "primary"
                }
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          )}
        </Dialog>
      );
    };

    return (
      <div>
        <MediaQuery query="(max-width: 1224px)">{dialog(true)}</MediaQuery>

        <MediaQuery query="(min-width: 1224px)">{dialog(false)}</MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  TFA: state.auth.TFA,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  TFAVerify,
  TFASetup,
  getTFA,
  clearErrors,
  skipTFA,
  logout,
})(withStyles(styles)(ResponsiveDialog));
