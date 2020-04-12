import { Box, makeStyles } from "@material-ui/core";
import { Power3, TweenMax } from "gsap";
import React, { useEffect, useRef, useState } from "react";
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
  let animatedIcons,
    reactLogoItem,
    reduxLogoItem,
    nodejsLogoItem = useRef(null);

  let herokuLogoItem = useRef(null);
  let sassLogoItem = useRef(null);
  let expressjsLogoItem = useRef(null);
  let gitLogoItem = useRef(null);
  let sourcetreeLogoItem = useRef(null);
  let materialuiLogoItem = useRef(null);

  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    TweenMax.to(animatedIcons, 0, { css: { visibility: "visible" } });

    TweenMax.staggerFrom(
      [
        reactLogoItem,
        reduxLogoItem,
        nodejsLogoItem,
        herokuLogoItem,
        sassLogoItem,
        expressjsLogoItem,
        gitLogoItem,
        sourcetreeLogoItem,
        materialuiLogoItem,
      ],
      0.8,
      { opacity: 0, y: 100, ease: Power3.easeOut },
      0.4
    );
  }, []);

  const handleExpand = (logoItem) => {
    TweenMax.to(logoItem, 0.8, {
      width: "100px",
      height: "100px",
      ease: Power3.easeOut,
    });
    setExpanded(true);
  };

  const handleShrink = (logoItem) => {
    TweenMax.to(logoItem, 0.8, {
      width: "50px",
      height: "50px",
      ease: Power3.easeOut,
    });
    setExpanded(false);
  };
  return (
    <Box
      style={{
        width: "100%",
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center",
      }}
      className="animated-icons"
    >
      <Box
        onMouseEnter={() => handleExpand(reactLogoItem)}
        onMouseOut={() => handleShrink(reactLogoItem)}
        style={{ width: "33%", alignSelf: "center" }}
      >
        <img
          ref={(el) => {
            reactLogoItem = el;
          }}
          src={reactLogo}
          className="react-logo"
          alt="logo"
        />
      </Box>
      <Box
        onMouseEnter={() => handleExpand(reduxLogoItem)}
        onMouseOut={() => handleShrink(reduxLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            reduxLogoItem = el;
          }}
          src={reduxLogo}
          className="redux-logo"
          alt="logo"
        />
      </Box>

      <Box
        onMouseEnter={() => handleExpand(nodejsLogoItem)}
        onMouseOut={() => handleShrink(nodejsLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            nodejsLogoItem = el;
          }}
          src={nodejsLogo}
          className="nodejs-logo"
          alt="logo"
        />
      </Box>

      <Box
        onMouseEnter={() => handleExpand(herokuLogoItem)}
        onMouseOut={() => handleShrink(herokuLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            herokuLogoItem = el;
          }}
          src={herokuLogo}
          className="heroku-logo"
          alt="logo"
        />
      </Box>

      <Box
        onMouseEnter={() => handleExpand(sassLogoItem)}
        onMouseOut={() => handleShrink(sassLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            sassLogoItem = el;
          }}
          src={sassLogo}
          className="sass-logo"
          alt="logo"
        />
      </Box>

      <Box
        p={1}
        onMouseEnter={() => handleExpand(expressjsLogoItem)}
        onMouseOut={() => handleShrink(expressjsLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            expressjsLogoItem = el;
          }}
          src={expressjsLogo}
          className="expressjs-logo"
          alt="logo"
        />
      </Box>

      <Box
        onMouseEnter={() => handleExpand(gitLogoItem)}
        onMouseOut={() => handleShrink(gitLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            gitLogoItem = el;
          }}
          src={gitLogo}
          className="git-logo"
          alt="logo"
        />
      </Box>

      <Box
        onMouseEnter={() => handleExpand(sourcetreeLogoItem)}
        onMouseOut={() => handleShrink(sourcetreeLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            sourcetreeLogoItem = el;
          }}
          src={sourcetreeLogo}
          className="sourcetree-logo"
          alt="logo"
        />
      </Box>

      <Box
        onMouseEnter={() => handleExpand(materialuiLogoItem)}
        onMouseOut={() => handleShrink(materialuiLogoItem)}
        style={{ width: "33%" }}
      >
        <img
          ref={(el) => {
            materialuiLogoItem = el;
          }}
          src={materialuiLogo}
          className="materialui-logo"
          alt="logo"
        />
      </Box>
    </Box>
  );
}
