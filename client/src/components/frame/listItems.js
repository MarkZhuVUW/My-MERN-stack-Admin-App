import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import {
  Route,
  BrowserRouter as Router,
  NavLink,
  Link
} from "react-router-dom";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import AssessmentIcon from "@material-ui/icons/Assessment";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.callback(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link
          to="/frame/dashboard"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <DashboardIcon
                color={selectedIndex === 0 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/frame/developer"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <DeveloperBoardIcon
                color={selectedIndex === 1 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary="Developer" />
          </ListItem>
        </Link>
        <Link
          to="/frame/useradmin"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <AssessmentIcon
                color={selectedIndex === 2 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary="UserAdmin" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
