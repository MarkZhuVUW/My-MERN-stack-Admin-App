import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import ErrorPage from "error-pages/ErrorPage";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactGA from "react-ga";
import Particles from "react-particles-js";
//redux
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { clearErrors } from "../../actions/errorActions";
import HeaderMenu from "./HeaderMenu";
import SelectedListItem from "./listItems";
import CV from "./pages/CV/CV";
import Dashboard from "./pages/dashboard/Dashboard";
import Developer from "./pages/Developer";
import UserAdmin from "./pages/UserAdmin";

const styles = {
  root: {
    display: "flex"
  }
};

class Frame extends Component {
  state = {};
  static propTypes = {
    auth: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    swaggerUIDocs: PropTypes.object,
    user: PropTypes.object,
    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    ReactGA.initialize("G-0LQBCYS7PM");

    this.props.history.listen(location => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });
  }
  render() {
    const { classes } = this.props;
    if (!this.props.user) return null;
    return (
      <FrameContent
        location={this.props.location}
        themeCallback={this.props.themeCallback}
        user={this.props.user}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { clearErrors })
)(withRouter(Frame));

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    // paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
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
    // marginRight: 36
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
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
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
  },
  mobileContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  developer: {
    backgroundColor: "white"
  }
}));

function FrameContent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  /**
   * translate the name of the page to its corresponding index. Used in the listitems.js file
   * to keep track of what the current page is
   * so it knows which page should be highlighted in the drawer
   *
   * returns
   *  0: Home Page (if pathname is "/frame" it will redirect to Home Page),
   *  1: Developer Page,
   *  2: Developer Page,
   * -1: Page Not Found
   */
  const translatePageToIndex = () => {
    if (!props.user) return -1;
    const { pathname } = props.location;
    //trim out the "" in the last index of the array
    var splittedPathname = pathname.split("/");

    while (splittedPathname[splittedPathname.length - 1] === "") {
      if (splittedPathname.length - 1 === 0) break;
      splittedPathname.splice(splittedPathname.length - 1, 1);
    }

    switch (splittedPathname[splittedPathname.length - 1]) {
      case "dashboard":
        return props.user.role === "admin" ? 0 : 403;
      case "developer":
        return props.user.role === "admin" ? 1 : 403;
      case "useradmin":
        return props.user.role === "admin" ? 2 : 403;
      case "cv":
        return 3;
      case "selfIntroduction":
        return 4;
      case "frame":
        return props.user.role === "admin" ? 0 : 3;
      default:
        return 404; // Page Not Found
    }
  };
  const [selectedIndex, setSelectedIndex] = React.useState(
    translatePageToIndex()
  );
  const isSmallScreen = useMediaQuery({ query: "(max-device-width: 700px)" });

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const themeCallback = theme => {
    props.themeCallback(theme);
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
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        {isSmallScreen ? null : (
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {i18n("frame.adminApp")}
          </Typography>
        )}

        {(isSmallScreen && !open) || !isSmallScreen ? (
          <Slide
            timeout={600}
            direction="left"
            in={(isSmallScreen && !open) || !isSmallScreen}
          >
            <div>
              <HeaderMenu themeCallback={themeCallback} />
            </div>
          </Slide>
        ) : null}
      </Toolbar>
    </AppBar>
  );
  const cb = selectedIndex => {
    setSelectedIndex(selectedIndex);
    if (isSmallScreen) setOpen(false);
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
      <SelectedListItem
        callback={cb}
        currentIndex={translatePageToIndex}
        role={props.user.role}
      />
    </Drawer>
  );
  // if user is not loaded yet, return.

  const index = translatePageToIndex();
  const isIndexInvalid = index === 403 || index === 404;
  return (
    <>
      {localStorage.getItem("theme") == "dark" ? (
        <Particles
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          params={{
            particles: {
              number: {
                value: 50
              },
              size: {
                value: 3
              }
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse"
                }
              }
            }
          }}
        />
      ) : null}
      <div>
        {isIndexInvalid ? (
          <ErrorPage code={index} />
        ) : (
          <div className={classes.root}>
            <CssBaseline />
            {FrameAppBar}
            {FrameDrawer}

            <main className={classes.content}>
              <div className={classes.appBarSpacer} />

              <Slide
                timeout={500}
                direction="left"
                in={!open || !isSmallScreen}
              >
                <Container
                  maxWidth="xl"
                  className={
                    isSmallScreen ? classes.mobileContainer : classes.container
                  }
                >
                  <Route
                    exact
                    path="/frame"
                    render={() => {
                      console.log(props.user.role);

                      return props.user.role === "admin" ? (
                        <Redirect to="/frame/dashboard" />
                      ) : (
                        <Redirect to="/frame/cv" />
                      );
                    }}
                  />

                  {props.user.role === "admin" ? (
                    <Switch>
                      <Route exact path="/frame/dashboard">
                        <Dashboard isSmallScreen={isSmallScreen} />
                      </Route>
                      <Route exact path="/frame/developer">
                        <Developer
                          isSmallScreen={isSmallScreen}
                          className={classes.developer}
                        />
                      </Route>
                      <Route exact path="/frame/useradmin">
                        <UserAdmin isSmallScreen={isSmallScreen} />
                      </Route>
                      <Route exact path="/frame/cv">
                        <CV isSmallScreen={isSmallScreen} />
                      </Route>
                    </Switch>
                  ) : (
                    <Switch>
                      <Route exact path="/frame/cv">
                        <CV isSmallScreen={isSmallScreen} />
                      </Route>
                    </Switch>
                  )}
                </Container>
              </Slide>
            </main>
          </div>
        )}
      </div>
    </>
  );
}
