import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  root: {
    position: "relative"
  },
  top: {
    color: "#eef3fd"
  },
  bottom: {
    color: "#6798e5",
    animationDuration: "550ms",
    position: "absolute",
    left: 0
  }
});

export default function FacebookProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={24}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
}
