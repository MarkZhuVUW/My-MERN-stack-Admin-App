import React from "react";
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";

// components
import { Typography } from "../components/Wrappers/Wrappers";

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
export default function UserAvatar({ color = "primary", ...props }) {
    
  var classes = useStyles();
  var theme = useTheme();

  var letters = props.name
    .split(" ")
    .map(word => word[0])
    .join("");

  return (
    <div
      className={classes.avatar}
      style={{ backgroundColor: theme.palette[color].main }}
    >
      <Typography className={classes.text}>{letters}</Typography>
    </div>
  );
}
