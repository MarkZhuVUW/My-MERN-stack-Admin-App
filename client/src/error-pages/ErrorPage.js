import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Slide,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import ReactPlayer from 'react-player';

// import { logLoginSuccess } from "../../actions/adminActions";
const theme = createMuiTheme({
  spacing: 4,
});
const styles = {
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.,
    marginTop: theme.spacing(1),
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  topBar: {
    justifyContent: "center",
  },
};

/**
 * The login component.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
class ErrorPage extends Component {
  static propTypes = {
    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  onGoToLogin = (e) => {
    this.props.history.push("/");
  };
  onGoBack = (e) => {
    this.props.history.goBack();
  };

  handleCloseSnackbar = () => {
    this.setState({
      msg: null,
    });
  };

  render() {
    const { classes, code } = this.props;

    const conditionalRendering = () => {
      switch (code) {
        case 404:
        case 403:
          return (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onGoBack}
            >
              Go back
            </Button>
          );
        case 401:
          return (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onGoToLogin}
            >
              {i18n("errors.401")}
            </Button>
          );
        default:
          return null;
      }
    };
    return (
      <div
        style={{
          zIndex: 1,
          position: "relative",
        }}
      >
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar className={classes.topBar}>
            <Slide direction="right" in={true} timeout={500}>
              <Typography style={{ color: "white" }} variant="h5" noWrap>
                {code +
                  " " +
                  i18n("errors." + code) +
                  ': "' +
                  this.props.location.pathname +
                  '"   :('}
              </Typography>
            </Slide>
          </Toolbar>
        </AppBar>
        <Box style={{ marginTop: "5%" }} />

        <Container maxWidth="lg" className={classes.content}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=6dNho0h_yQQ"
            playing={false}
            width="100%"
          />

          {conditionalRendering()}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, {})
)(withRouter(ErrorPage));
