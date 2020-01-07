import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Box from "@material-ui/core/Box";

import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//redux
import { TFAVerify } from "../actions/authActions";
import { TFASetup } from "../actions/authActions";
import { getTFA } from "../actions/authActions";

import { clearErrors } from "../actions/errorActions";

import MediaQuery from "react-responsive";
import Logout from "../components/auth/Logout";
const theme = createMuiTheme({
  spacing: 4
});

const styles = {
  centerItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
    margin: "0"
  }
};

class ResponsiveDialog extends Component {
  state = {
    open: true,
    QRCode: "",
    code: "",
    domainName: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,

    clearErrors: PropTypes.func.isRequired,
    TFAVerify: PropTypes.func.isRequired,
    TFASetup: PropTypes.func.isRequired,
    getTFA: PropTypes.func.isRequired,

    TFA: PropTypes.object
  };
  componentDidMount() {
    const { email, TFA } = this.props;
    const { domainName } = this.state;
    if (this.props.title === "Google Two-Factor Auth") {
      const obj = {
        email,
        domainName
      };
      if (!this.props.TFA) {
        this.props.TFASetup(obj);
        this.props.getTFA(obj);
      }
    }
  }
  componentDidUpdate(prevProps) {
    const { error, email, TFA, isAuthenticated } = this.props;
    const { domainName } = this.state;

    if (isAuthenticated) {
      this.props.cb(true);
    }
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
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const { code } = this.state;
    const { alertMsg } = this.props;

    // Attempt to login
    this.props.TFAVerify(this.props.email, code);

    //clear errors
    this.toggle();
  };
  onChange = e => {
    this.setState({ code: e.target.value });
  };

  render() {
    const { classes, title, alertMsg, TFA } = this.props;

    // get TFA object from props for dispalying qrcode
    const { open } = this.state;

    //stop this from getting lost in lambda expressions.
    const dialog = isFullScreen => {
      return (
        <Dialog
          open={open}
          fullScreen={isFullScreen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
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
                width: "100%"
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
                  <Button onClick={this.onSubmit} color="primary">
                    submit
                  </Button>
                </DialogActions>
              ) : (
                <Logout />
              )}
            </div>
          ) : (
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          )}
        </Dialog>
      );
    };

    return (
      <div>
        <MediaQuery query="(max-device-width: 1224px)">
          {dialog(true)}
        </MediaQuery>

        <MediaQuery query="(min-device-width: 1224px)">
          {dialog(false)}
        </MediaQuery>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  TFA: state.auth.TFA
});
export default connect(mapStateToProps, {
  TFAVerify,
  TFASetup,
  getTFA,
  clearErrors
})(withStyles(styles)(ResponsiveDialog));
