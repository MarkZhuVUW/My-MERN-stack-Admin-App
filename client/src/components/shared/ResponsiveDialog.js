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
// redux
import {
  createOauthUser,
  getTFA,
  logout,
  skipTFA,
  TFASetup,
  TFAVerify
} from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import RoleCheckboxes from "../auth/RoleCheckboxes";

const theme = createMuiTheme({
  spacing: 4
});

const styles = {
  centerItemsContainer: {
    width: "100%",
    height: "80%",
    margin: "0"
  },
  centerItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "80%",
    margin: "0"
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2)
  }
};

/**
 * The ResponsiveDialog Component can be used in three ways;
 * 1. show verirication errors.
 * 2. do google two-factor authentication
 * 3. do github oauth authencation.
 */
class ResponsiveDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      code: ""
    };
  }

  componentDidMount() {
    const { TFA, isGithubUserLoaded, user } = this.props;
    if (this.props.title === i18n("loginPage.googleTFA")) {
      const obj = {
        email: user.email,
        domainName: window.location.hostname,
        isOauth: false
      };

      if (!TFA && !isGithubUserLoaded) {
        this.props.getTFA(obj).catch(() => {
          console.log(1);
          this.props.TFASetup(obj);
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevStates, snapshot) {
    const { error, type } = this.props;
    const isAuthenticated = localStorage.getItem("authenticated") === "true";

    if (isAuthenticated && type !== "User Admin Error Handling") {
      this.props.cb(true);
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
    // re-enable login button and hide the loading spinner
    this.props.responsiveDialogCallback();

    if (this.props.type !== "User Admin Error Handling") {
      this.props.logout();
    }

    this.setState({
      open: false
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { code } = this.state;
    // Attempt to login
    this.props.TFAVerify(this.props.email, code);

    // clear errors
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

    const oauthUser = {
      ...user,
      role,

      domainName: window.location.hostname,
      isOauth: false
    };

    const TFAObj = {
      email: user.email,
      domainName: window.location.hostname,
      isOauth: false,
      uniqueId: user.uniqueId
    };

    this.props.createOauthUser(oauthUser, "github").then(() => {
      if (!TFA) {
        this.props.getTFA(TFAObj).catch(() => {
          this.props.TFASetup(TFAObj);
        });
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
      TFAExistsForThisUser
    } = this.props;

    // get TFA object from props for dispalying qrcode
    const { open } = this.state;

    const TFAOrVerificationErrorContent = (
      <div
        style={{
          width: "100%"
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
            <DialogContentText>
              {TFAExistsForThisUser ? i18n("loginPage.tfaExists") : alertMsg}
            </DialogContentText>

            {TFA ? (
              <div className={classes.centerItems}>
                <Typography>
                  {i18n("responsiveDialog.hi") + user.email}
                </Typography>
                {!TFAExistsForThisUser && (
                  <img src={TFA.dataURL} alt="tfa qrcode" />
                )}
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
                        padding: theme.spacing(2)
                      }}
                      alt="user avatar"
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

ResponsiveDialog.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object]).isRequired,
  clearErrors: PropTypes.func.isRequired,
  TFAVerify: PropTypes.func.isRequired,
  TFASetup: PropTypes.func.isRequired,
  getTFA: PropTypes.func.isRequired,
  skipTFA: PropTypes.func.isRequired,
  TFA: PropTypes.oneOfType([PropTypes.object]),
  user: PropTypes.oneOfType([PropTypes.object]),
  logout: PropTypes.func.isRequired,
  isGithubUserLoaded: PropTypes.bool,
  title: PropTypes.string,
  loginSuccessCallback: PropTypes.func,
  responsiveDialogCallback: PropTypes.func,
  email: PropTypes.string,
  type: PropTypes.string,
  alertMsg: PropTypes.string.isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  createOauthUser: PropTypes.func,
  TFAExistsForThisUser: PropTypes.bool.isRequired,
  cb: PropTypes.func
};
ResponsiveDialog.defaultProps = {
  isGithubUserLoaded: null,
  title: null,
  loginSuccessCallback: null,
  responsiveDialogCallback: null,
  email: null,
  type: null,
  TFA: null,
  user: null,
  createOauthUser: null,
  cb: null
};
const mapStateToProps = (state) => ({
  error: state.error,
  TFA: state.auth.TFA,
  user: state.auth.user,
  TFAExistsForThisUser: state.auth.TFAExistsForThisUser
});
export default connect(mapStateToProps, {
  TFAVerify,
  TFASetup,
  getTFA,
  clearErrors,
  skipTFA,
  logout,
  createOauthUser
})(withStyles(styles)(ResponsiveDialog));
