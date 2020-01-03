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
import SelectedListItem, {
  mainListItems,
  secondaryListItems
} from "./listItems";

import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import UserMenu from "./UserMenu";

//redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResponsiveDialog from "../ResponsiveDialog";

import { getAllUsers } from "../../actions/authActions";
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
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
};

class Frame extends Component {
  state = {
    open: false,
    selectedIndex: 0
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getAllUsers: PropTypes.func.isRequired
  };

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
            My MERN stack Admin App
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}></Grid>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  allUsers: state.auth
});

export default connect(mapStateToProps, { getAllUsers })(
  withStyles(styles)(Frame)
);