import SignInSide from "./components/auth/SignInSide";

import SignUp from "./components/auth/SignUp";

import React, { Component } from "react";

import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "./actions/authActions";
import ErrorPage from "./error-pages/ErrorPage";
import Frame from "components/frame/Frame";
import ParticlesBg from "particles-bg";
import Particles from "react-particles-js";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  // conditionalRouting = () => {
  //   if (!this.props.user) return;
  //   const { role } = this.props.user;
  //   if (role === "admin") {
  //     return (
  //       <>

  //         <Route exact path="/admin">
  //           <AdminDashboard isAdmin={true} />
  //         </Route>

  //         <Route
  //           exact
  //           path="/"
  //           render={() => {
  //             return <Redirect to="/admin" />;
  //           }}
  //         />
  //         <Route
  //           exact
  //           path="/board"
  //           render={() => {
  //             return (
  //               <ErrorPage
  //                 errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //               />
  //             );
  //           }}
  //         />
  //       </>
  //     );
  //   } else if (role === "customer") {
  //     return (
  //       <>
  //         <Route exact path="/board">
  //           <CustomerDashboard />
  //         </Route>

  //         <Route
  //           exact
  //           path="*"
  //           render={() => {
  //             return (
  //               <ErrorPage
  //                 errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //               />
  //             );
  //           }}
  //         />
  //       </>
  //     );
  //   } else if (role === "user") {
  //     return (
  //       <>
  //         <Route exact path="/board">
  //           <CustomerDashboard isUser={true} />
  //         </Route>
  //         <Route
  //           exact
  //           path="/"
  //           render={() => {
  //             return <Redirect to="/board" />;
  //           }}
  //         />
  //         <Route
  //           exact
  //           path="*"
  //           render={() => {
  //             return (
  //               <ErrorPage
  //                 errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //               />
  //             );
  //           }}
  //         />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <ErrorPage
  //         errorMsg={`403 Unauthorized. ${role} is not permitted to access this route.`}
  //       />
  //     );
  //   }
  // };

  render() {
    const { isAuthenticated } = this.props;

    let config = {
      num: [4, 7],
      rps: 0.1,
      radius: [5, 40],
      life: [1.5, 3],
      v: [2, 3],
      tha: [-40, 40],
      body:
        "./icons/kisspng-portable-network-graphics-image-clip-art-color-exp-powder-burst-pow-explode-colors-3d-5b666b991c4a18.7897336315334388731159.png", // Whether to render pictures
      rotate: [0, 20],
      alpha: [0.6, 0],
      scale: [1, 0.1],
      position: "center", // all or center or {x:1,y:1,width:100,height:100}
      color: ["random", "#ff0000"],
      cross: "dead", // cross or bround
      random: 15, // or null,
      g: 5, // gravity
      // f: [2, -1], // force
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      }
    };

    return (
      // <Particles />
      <>
        {/* <ParticlesBg type="lines" bg={true} /> */}

        <HashRouter basename="/">
          <Switch>
            <Route exact path="/signin" component={SignInSide} />
            <Route exact path="/signup" component={SignUp} />
            {isAuthenticated ? (
              <>
                <Route path="/frame" component={Frame} />
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/frame" />;
                  }}
                />
              </>
            ) : (
              <>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to="/signin" />;
                  }}
                />
                <Route
                  render={() => {
                    return <ErrorPage code="401" />;
                  }}
                />
              </>
            )}
          </Switch>
        </HashRouter>
        {/* <Particles
          params={{
            particles: {
              shape: {
                type: "images",
                images: [
                  {
                    src: "./icons/32px-React-icon.png",
                    height: 100,
                    width: 100
                  }
                ]
              }
            }
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        /> */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps, { loadUser })(App);
