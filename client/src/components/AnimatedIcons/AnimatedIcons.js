import { makeStyles } from "@material-ui/core";
import { Power3, TweenMax } from "gsap";
import React, { useEffect, useRef } from "react";
import expressjsLogo from "../../icons/expressjs-logo.svg";
import gitLogo from "../../icons/git-logo.svg";
import herokuLogo from "../../icons/heroku-logo.svg";
import materialuiLogo from "../../icons/materialui-logo.svg";
import nodejsLogo from "../../icons/nodejs-logo.svg";
import reactLogo from "../../icons/react-logo.svg";
import reduxLogo from "../../icons/redux-logo.svg";
import sassLogo from "../../icons/sass-logo.svg";
import sourcetreeLogo from "../../icons/sourcetree-logo.svg";
import "./AnimatedIcons.scss";

export default function AnimatedIcons(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#E9EAED",
      width: "100%",
      //   backgroundColor: "black"
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      backgroundColor: "white",
      padding: theme.spacing(1, 1),
      zIndex: 1,
      position: "relative",
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expansionPanelHeader: {
      backgroundColor: "#3F51B5",
      color: "white",
    },
  }));

  const classes = useStyles();
  let reactLogoItem = useRef(null);
  let reduxLogoItem = useRef(null);
  let nodejsLogoItem = useRef(null);
  let herokuLogoItem = useRef(null);
  let sassLogoItem = useRef(null);
  let expressjsLogoItem = useRef(null);
  let gitLogoItem = useRef(null);
  let sourcetreeLogoItem = useRef(null);
  let materialuiLogoItem = useRef(null);

  useEffect(() => {
    TweenMax.to(reactLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(reduxLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(nodejsLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(herokuLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(sassLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(expressjsLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(gitLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(sourcetreeLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });

    TweenMax.to(materialuiLogoItem, 2, {
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });
  });
  return (
    <>
      <img
        ref={(el) => {
          reactLogoItem = el;
        }}
        src={reactLogo}
        className="react-logo"
        alt="logo"
      />
      <img
        ref={(el) => {
          reduxLogoItem = el;
        }}
        src={reduxLogo}
        className="redux-logo"
        alt="logo"
      />
      <img
        ref={(el) => {
          nodejsLogoItem = el;
        }}
        src={nodejsLogo}
        className="nodejs-logo"
        alt="logo"
      />

      <img
        ref={(el) => {
          herokuLogoItem = el;
        }}
        src={herokuLogo}
        className="heroku-logo"
        alt="logo"
      />

      <img
        ref={(el) => {
          sassLogoItem = el;
        }}
        src={sassLogo}
        className="sass-logo"
        alt="logo"
      />

      <img
        ref={(el) => {
          expressjsLogoItem = el;
        }}
        src={expressjsLogo}
        className="expressjs-logo"
        alt="logo"
      />

      <img
        ref={(el) => {
          gitLogoItem = el;
        }}
        src={gitLogo}
        className="git-logo"
        alt="logo"
      />

      <img
        ref={(el) => {
          sourcetreeLogoItem = el;
        }}
        src={sourcetreeLogo}
        className="sourcetree-logo"
        alt="logo"
      />

      <img
        ref={(el) => {
          materialuiLogoItem = el;
        }}
        src={materialuiLogo}
        className="materialui-logo"
        alt="logo"
      />
    </>
  );
}
