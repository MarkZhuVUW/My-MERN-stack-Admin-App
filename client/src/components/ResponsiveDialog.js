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
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
//redux
import {
  createOauthUser,
  getTFA,
  logout,
  skipTFA,
  TFASetup,
  TFAVerify,
} from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import RoleCheckboxes from "./auth/RoleCheckboxes";

const theme = createMuiTheme({
  spacing: 4,
});

const styles = {
  centerItemsContainer: {
    width: "100%",
    height: "80%",
    margin: "0",
  },
  centerItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "80%",
    margin: "0",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
};

/**
 * The ResponsiveDialog Component can be used in three ways;
 * 1. show verirication errors.
 * 2. do google two-factor authentication
 * 3. do github oauth authencation.
 */
class ResponsiveDialog extends Component {
  state = {
    open: true,
    code: "",
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
    isGithubUserLoaded: PropTypes.bool,
  };
  componentDidMount() {
    const { TFA, isGithubUserLoaded, user } = this.props;
    if (this.props.title === i18n("loginPage.googleTFA")) {
      const obj = {
        email: user.email,
        domainName: window.location.hostname,
        isOauth: false,
      };

      console.log(user.email);
      if (!TFA && !isGithubUserLoaded) {
        this.props.TFASetup(obj);
        this.props.getTFA(obj);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { error, type } = this.props;
    const isAuthenticated =
      localStorage.getItem("authenticated") === "true" ? true : false;

    if (isAuthenticated && type !== "User Admin Error Handling") {
      this.props.cb(true);
    }
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "TFA_VERIFY_FAIL") {
        // re-enable login button and hide the loading spinner

        // this.props.responsiveDialogCallback();

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
    this.props.logout();
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

  handleGithubTFA = (role) => {
    // e.preventDefault();
    const { TFA, user } = this.props;

    // console.log(user);
    const oauthUser = {
      ...user,
      role: role,

      domainName: window.location.hostname,
      isOauth: false,
    };

    const TFAObj = {
      email: user.email,
      domainName: window.location.hostname,
      isOauth: false,
      uniqueId: user.uniqueId,
    };

    this.props.createOauthUser(oauthUser, "github").then(() => {
      if (!TFA) {
        this.props.TFASetup(TFAObj);
        this.props.getTFA(TFAObj);
      }
    });
  };

  roleSelectedCallback = (role) => {
    this.handleGithubTFA(role);
  };

  render() {
    const {
      classes,
      title,
      alertMsg,
      TFA,
      isGithubUserLoaded,
      user,
    } = this.props;

    // get TFA object from props for dispalying qrcode
    const { open } = this.state;

    const TFAOrVerificationErrorContent = (
      <div
        style={{
          width: "100%",
        }}
      >
        <DialogActions>
          <TextField
            autoFocus
            variant="outlined"
            label={i18n("responsiveDialog.enterCode")}
            fullWidth
            onChange={this.onChange}
          />
          <Button
            onClick={this.onSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            {i18n("responsiveDialog.submit")}
          </Button>

          <Button variant="contained" color="secondary" onClick={this.skipTFA}>
            {i18n("responsiveDialog.skipTFA")}
          </Button>
        </DialogActions>
      </div>
    );

    const dialog = (isFullScreen) => {
      return (
        <Dialog
          open={open}
          fullScreen={isFullScreen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          onBackdropClick={() => {
            this.props.responsiveDialogCallback();
          }}
        >
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{alertMsg}</DialogContentText>

            {TFA ? (
              <div className={classes.centerItems}>
                <Typography>
                  {i18n("responsiveDialog.hi") + user.email}
                </Typography>
                <img src={TFA.dataURL} />
              </div>
            ) : (
              <div className={classes.centerItemsContainer}>
                {isGithubUserLoaded ? (
                  <div className={classes.centerItems}>
                    <Typography>
                      {i18n("responsiveDialog.hi") + user.email}
                    </Typography>
                    <img
                      src={user.avatar_url}
                      style={{
                        padding: theme.spacing(2),
                      }}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </DialogContent>
          {TFA ? (
            <div>
              <div>{TFAOrVerificationErrorContent}</div>
            </div>
          ) : (
            <div>
              {isGithubUserLoaded ? (
                <div className={classes.buttons}>
                  <RoleCheckboxes
                    roleSelectedCallback={this.roleSelectedCallback}
                  />
                </div>
              ) : (
                <DialogActions>
                  <Button
                    onClick={this.handleClose}
                    variant="contained"
                    color="secondary"
                    autoFocus
                  >
                    {i18n("responsiveDialog.cancel")}
                  </Button>
                </DialogActions>
              )}
            </div>
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
  createOauthUser,
})(withStyles(styles)(ResponsiveDialog));
