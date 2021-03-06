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
import { logPageView } from "actions/adminActions";
import { clearErrors } from "actions/errorActions";
import clsx from "clsx";
import FacebookProgress from "components/shared/FacebookProgress";
import ErrorPage from "error-pages/ErrorPage";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
// redux
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import ParticlesCustomized from "../shared/ParticlesCustomized";
import HeaderMenu from "./HeaderMenu";
import SelectedListItem from "./listItems";
import CV from "./pages/CV/CV";
import Dashboard from "./pages/dashboard/Dashboard";
import Developer from "./pages/Developer";
import Portfolio from "./pages/Portfolio/Portfolio";
import UserAdmin from "./pages/UserAdmin";
import WelcomePage from "./pages/WelcomePage";

class Frame extends Component {
  componentDidMount() {
    // if (this.props.user) this.handlePageView();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user !== this.props.user) this.handlePageView();
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      this.props.user
    )
      this.handlePageView();
  }

  /**
   * Log employer page view and make api call to update corresponding documents in my mongodb database
   */
  logPageView = (page) => {
    // Using my own REST API to log page views.
    // Ideally I will implement google analytics in the future.
    // I am only interested in logging employer page views

    const { _id, name, email, role, company } = this.props.user;

    const pageViewObj = {
      name,
      email,
      role,
      company,
      explanation: page,
      type: "PAGE VIEW"
    };

    this.props.logPageView(_id, pageViewObj);

    // TODO: implement google analytics.
    // ReactGA.initialize("G-0LQBCYS7PM");

    // if (this.props.user && this.props.user.role === "employer")
    //   this.props.history.listen(location => {
    //     ReactGA.set({ page: location.pathname });
    //     ReactGA.pageview(location.pathname);
    //   });

    this.toggle();
  };

  handlePageView = () => {
    if (this.props.user.role !== "employer") return;
    const { pathname } = this.props.location;

    const splitPathname = pathname.split("/");

    while (splitPathname[splitPathname.length - 1] === "") {
      if (splitPathname.length - 1 === 0) break;
      splitPathname.splice(splitPathname.length - 1, 1);
    }

    const path = splitPathname[splitPathname.length - 1];
    if (path === "cv" || path === "portfolio" || path === "welcomepage")
      this.logPageView(path);
    else if (
      path === "dashboard" ||
      path === "useradmin" ||
      path === "developer"
    )
      this.logPageView(403);
    else this.logPageView(404);
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  render() {
    if (!this.props.user)
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh"
          }}
        >
          <FacebookProgress />
        </div>
      );

    return (
      <FrameView
        location={this.props.location}
        themeCallback={this.props.themeCallback}
        user={this.props.user}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user
});

export default compose(connect(mapStateToProps, { clearErrors, logPageView }))(
  withRouter(Frame)
);

Frame.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  themeCallback: PropTypes.oneOfType([PropTypes.object]).isRequired,
  logPageView: PropTypes.func.isRequired,
  // withRouter
  location: PropTypes.oneOfType([PropTypes.object]).isRequired
};
const drawerWidth = 240;

const FrameView = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      backgroundColor:
        localStorage.getItem("theme") === "dark"
          ? theme.palette.background.paper
          : "#F2F2F2"
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
      }),
      backgroundColor:
        localStorage.getItem("theme") === "dark"
          ? theme.palette.background.paper
          : "#F2F2F2"
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
    const { pathname } = props.location;
    // trim out the "" in the last index of the array
    const splitPathname = pathname.split("/");

    while (splitPathname[splitPathname.length - 1] === "") {
      if (splitPathname.length - 1 === 0) break;
      splitPathname.splice(splitPathname.length - 1, 1);
    }

    switch (splitPathname[splitPathname.length - 1]) {
      case "dashboard":
        return props.user.role === "admin" ? 0 : 403;
      case "developer":
        return props.user.role === "admin" ? 1 : 403;
      case "useradmin":
        return props.user.role === "admin" ? 2 : 403;
      case "welcomepage":
        return 3;
      case "portfolio":
        return 4;
      case "cv":
        return 5;
      case "frame":
        return props.user.role === "admin" ? 0 : 3;

      default:
        return 404; // Page Not Found
    }
  };

  const [selectedIndex, setSelectedIndex] = React.useState(
    translatePageToIndex()
  );
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const themeCallback = (theme) => {
    props.themeCallback(theme);
  };

  const FrameAppBar = (
    // <ElevationScroll {...props}>

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
            {props.user.role === "admin"
              ? i18n("frame.adminApp")
              : i18n("frame.welcome")}
          </Typography>
        )}

        {(isSmallScreen && !open) || !isSmallScreen ? (
          <Slide
            timeout={600}
            direction="left"
            in={(isSmallScreen && !open) || !isSmallScreen}
          >
            <div>
              <HeaderMenu
                themeCallback={themeCallback}
                oauthUser={props.user.uniqueId ? props.user : null}
              />
            </div>
          </Slide>
        ) : null}
      </Toolbar>
    </AppBar>
  );
  const cb = (index) => {
    setSelectedIndex(index);
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
        currentIndex={translatePageToIndex()}
        role={props.user.role}
      />
    </Drawer>
  );
  const index = translatePageToIndex();
  const isIndexInvalid = index === 403 || index === 404;
  return (
    <>
      {localStorage.getItem("theme") === "dark" ? (
        <ParticlesCustomized numParticles={30} size={2} hoverMode="grab" />
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
                      return props.user.role === "admin" ? (
                        <Redirect to="/frame/dashboard" />
                      ) : (
                        <Redirect to="/frame/welcomepage" />
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
                      <Route exact path="/frame/welcomepage">
                        <WelcomePage isSmallScreen={isSmallScreen} />
                      </Route>
                      <Route exact path="/frame/portfolio">
                        <Portfolio isSmallScreen={isSmallScreen} />
                      </Route>
                      <Route exact path="/frame/cv">
                        <CV isSmallScreen={isSmallScreen} />
                      </Route>
                    </Switch>
                  ) : (
                    <Switch>
                      <Route exact path="/frame/welcomepage">
                        <WelcomePage isSmallScreen={isSmallScreen} />
                      </Route>
                      <Route exact path="/frame/portfolio">
                        <Portfolio isSmallScreen={isSmallScreen} />
                      </Route>
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
};

FrameView.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  themeCallback: PropTypes.oneOfType([PropTypes.object]).isRequired,
  // withRouter
  location: PropTypes.oneOfType([PropTypes.object]).isRequired
};
