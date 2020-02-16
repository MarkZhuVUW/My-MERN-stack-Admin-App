import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DescriptionIcon from "@material-ui/icons/Description";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import { i18n } from "i18n";
import React from "react";
import { Link } from "react-router-dom";
import "../../css3/bouncingEffect.css";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(props.currentIndex);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.callback(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Link
          to="/frame/dashboard"
          style={{
            textDecoration: "none",
            color: localStorage.getItem("theme") === "dark" ? "white" : "black"
          }}
        >
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <DashboardIcon
                className={selectedIndex === 0 ? "swirl" : null}
                color={selectedIndex === 0 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary={i18n("dashboard.menu")} />
          </ListItem>
        </Link>
        <Divider />
        <Link
          to="/frame/developer"
          style={{
            textDecoration: "none",
            color: localStorage.getItem("theme") === "dark" ? "white" : "black"
          }}
        >
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <DeveloperBoardIcon
                className={selectedIndex === 1 ? "swirl" : null}
                color={selectedIndex === 1 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText>{i18n("developer.menu")}</ListItemText>
          </ListItem>
        </Link>
        <Link
          to="/frame/useradmin"
          style={{
            textDecoration: "none",
            color: localStorage.getItem("theme") === "dark" ? "white" : "black"
          }}
        >
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <AssessmentIcon
                className={selectedIndex === 2 ? "swirl" : null}
                color={selectedIndex === 2 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary={i18n("useradmin.menu")} />
          </ListItem>
        </Link>

        <Link
          to="/frame/cv"
          style={{
            textDecoration: "none",
            color: localStorage.getItem("theme") === "dark" ? "white" : "black"
          }}
        >
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={event => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <DescriptionIcon
                className={selectedIndex === 3 ? "swirl" : null}
                color={selectedIndex === 3 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary={i18n("cv.menu")} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}
