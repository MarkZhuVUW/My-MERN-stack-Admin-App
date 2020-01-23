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

import InvencoLogo from "../../images/invenco-logo.svg";

import { createMuiTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import compose from "recompose/compose";
import { Player } from "video-react";
import Video from "../../Invenco-Company-Overview.mp4";
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
  InvencoLogo: {
    width: "200px",
    padding: "10px",
    marginLeft: "20%"
    // marginRight: "10px",
    // display: "flex",
  },
  topBar: {
    backgroundColor: "white",
    justifyContent: "flex-start"
  }
};

/**
 * The login component.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
class ErrorPage extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
    isLogin: true
  };

  callback = (bool, msg) => {
    this.setState({
      isLogin: bool,
      msg: msg
    });
  };

  tfaCallback = () => {
    if (this.props.user.role === "admin") this.props.history.push("/admin");
    else this.props.history.push("/board");
  };

  static propTypes = {
    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    this.props.history.push("/");
  };

  handleCloseSnackbar = () => {
    this.setState({
      msg: null
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ backgroundColor: "#E9EAED" }}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar className={classes.topBar}>
            <Slide direction="right" in={true} timeout={500}>
              <img className={classes.InvencoLogo} src={InvencoLogo} />
            </Slide>

            <Typography
              style={{ color: "black" }}
              variant="h5"
              noWrap
            ></Typography>
          </Toolbar>
        </AppBar>
        <Box style={{ marginTop: "10%" }} />

        <Container maxWidth="lg" className={classes.content}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=zI_qBiXxSqU&t=16s"
            playing={false}
            width="100%"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.onSubmit}
          >
            Go back to Login Page
          </Button>
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
