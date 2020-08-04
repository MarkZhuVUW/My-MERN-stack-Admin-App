// components
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default function UserAvatar({ color = "primary", ...props }) {
  const useStyles = makeStyles(() => ({
    avatar: {
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    text: {
      color: "white",
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.avatar} style={{ backgroundColor: "green" }}>
      <Typography className={classes.text}>
        {props.name
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </Typography>
    </div>
  );
}

UserAvatar.propTypes = propTypes;
