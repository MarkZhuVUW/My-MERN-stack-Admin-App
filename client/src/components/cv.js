import React from "react";
import Iframe from "react-iframe";
import { makeStyles } from "@material-ui/core";
import { Overview } from "./LatestSDK/Overview";
import { Intro } from "./LatestSDK/Intro";
import { VendAppDev } from "./LatestSDK/VendAppDev";
import { FCC } from "./LatestSDK/FCC";
import { SoftwareTools } from "./LatestSDK/SoftwareTools";
import { TermSpec } from "./LatestSDK/TermSpec";
import { Features } from "./LatestSDK/Features";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#E9EAED"
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expansionPanelHeader: {
    backgroundColor: "#3F51B5",
    color: "white"
  }
}));

export function LatestSDK() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Iframe
        url="https://www.youtube.com/embed/zI_qBiXxSqU"
        width="100%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />

      <Overview />
      <Intro />
      <VendAppDev />
      <FCC />
      <SoftwareTools />
      <TermSpec />
      <Features />
    </div>
  );
}
