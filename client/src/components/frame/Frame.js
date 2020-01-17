import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SelectedListItem from "./listItems";
import { logout } from "../../actions/authActions";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import UserMenu from "./UserMenu";
import Dashboard from "./pages/dashboard/Dashboard";
import Developer from "./pages/Developer";
import UserAdmin from "./pages/UserAdmin";
import EditableTable from "../EditableTable";
import MediaQuery from "react-responsive";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { clearErrors } from "../../actions/errorActions";
import Slide from "@material-ui/core/Slide";

const drawerWidth = 240;
const theme = createMuiTheme({
  spacing: 4
});
const styles = {
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(15),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(15)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflowX: "auto"
  },
  mobileContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  }
};

class Frame extends Component {
  state = {
    open: false,
    selectedIndex: 0
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    swaggerUIDocs: PropTypes.object
  };

  componentDidMount() {}
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const handleDrawerOpen = () => {
      this.setState({
        open: true
      });
    };
    const handleDrawerClose = () => {
      this.setState({
        open: false
      });
    };

    const FrameAppBar = (
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Admin
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
    const cb = selectedIndex => {
      this.setState({
        selectedIndex: selectedIndex
      });
    };
    const FrameDrawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <SelectedListItem callback={cb} />
      </Drawer>
    );
    return (
      <div className={classes.root}>
        <CssBaseline />
        {FrameAppBar}
        {FrameDrawer}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          {/* desktop */}
          <MediaQuery minDeviceWidth={701}>
            <Slide timeout={500} direction="left" in={true}>
              <Container maxWidth="lg" className={classes.container}>
                <Route path="/frame/dashboard" component={Dashboard} />
                <Route path="/frame/developer" component={Developer} />
                <Route path="/frame/useradmin" component={UserAdmin} />
              </Container>
            </Slide>
          </MediaQuery>
          {/* desktop */}

          {/* mobile */}
          <MediaQuery maxDeviceWidth={700}>
            <Slide timeout={500} direction="left" in={!this.state.open}>
              <Container maxWidth="lg" className={classes.mobileContainer}>
                <Route path="/frame/dashboard" component={Dashboard} />
                <Route path="/frame/developer" component={Developer} />
                <Route path="/frame/useradmin" component={UserAdmin} />
              </Container>
            </Slide>
          </MediaQuery>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { clearErrors })(
  withStyles(styles)(Frame)
);
