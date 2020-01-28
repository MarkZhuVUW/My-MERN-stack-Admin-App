import React, { useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  TextField,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  FormControl,
  Grid,
  Button,
  Zoom,
  Slide,
  Box
} from "@material-ui/core";
import { BrowserRouter as Router, NavLink, withRouter } from "react-router-dom";

import { createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import compose from "recompose/compose";
import ReactPlayer from "react-player";

// import { logLoginSuccess } from "../../actions/adminActions";
const theme = createMuiTheme({
  spacing: 4
});
const styles = {
  paper: {
    marginTop: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "15%",
    paddingRight: "15%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.,
    marginTop: theme.spacing(1),
    flexDirection: "column"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  topBar: {
    backgroundColor: "white",
    justifyContent: "center"
  }
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
    history: PropTypes.object.isRequired
  };

  onGoToLogin = e => {
    this.props.history.push("/");
  };
  onGoBack = e => {
    this.props.history.goback();
  };

  handleCloseSnackbar = () => {
    this.setState({
      msg: null
    });
  };

  render() {
    const { classes } = this.props;
    const conditionalRendering = () => {
      switch (this.props.code) {
        case "404":
        case "400":
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
        case "401":
          return (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onGoToLogin}
            >
              Go to Login Page
            </Button>
          );
        default:
          return null;
      }
    };
    return (
      <div style={{ backgroundColor: "#E9EAED" }}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar className={classes.topBar}>
            <Slide direction="right" in={true} timeout={500}>
              <Typography style={{ color: "black" }} variant="h5" noWrap>
                {this.props.errorMsg +
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

const mapStateToProps = state => ({});
export default compose(
  withStyles(styles),
  connect(mapStateToProps, {})
)(withRouter(ErrorPage));
