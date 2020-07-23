// components
import { Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";


export default function UserAvatar({ color = "primary", ...props }) {

  const useStyles = makeStyles(() => ({
    avatar: {
      width: 30,
      height: 30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%"
    },
    text: {
      color: "white"
    }
  }));

  const classes = useStyles();
  const theme = useTheme();

  let letters = props.name
    .split(" ")
    .map(word => word[0])
    .join("");

  return (
    <div className={classes.avatar} style={{ backgroundColor: "green" }}>
      <Typography className={classes.text}>{letters}</Typography>
    </div>
  );
}
