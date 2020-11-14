import { ListSubheader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DescriptionIcon from "@material-ui/icons/Description";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../../css3/bouncingEffect.css";

export default function SelectedListItem(props) {
  const useStyles = makeStyles(() => ({
    root: {
      width: "100%",
      maxWidth: 360,
    },
  }));

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(props.currentIndex);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.callback(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.role === "admin" ? (
          <>
            <ListSubheader inset>{i18n("adminPages")}</ListSubheader>
            <Link
              to="/frame/dashboard"
              style={{
                textDecoration: "none",
                color:
                  localStorage.getItem("theme") === "dark" ? "white" : "black",
              }}
            >
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
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

            <Link
              to="/frame/developer"
              style={{
                textDecoration: "none",
                color:
                  localStorage.getItem("theme") === "dark" ? "white" : "black",
              }}
            >
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
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
                color:
                  localStorage.getItem("theme") === "dark" ? "white" : "black",
              }}
            >
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
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
          </>
        ) : null}
        <Divider />

        <ListSubheader inset>{i18n("employerGuestPages")}</ListSubheader>

        <Link
          to="/frame/welcomepage"
          style={{
            textDecoration: "none",
            color: localStorage.getItem("theme") === "dark" ? "white" : "black",
          }}
        >
          <ListItem
            button
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <DashboardIcon
                className={selectedIndex === 3 ? "swirl" : null}
                color={selectedIndex === 3 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary={i18n("welcomePage.menu")} />
          </ListItem>
        </Link>

        <Link
          to="/frame/portfolio"
          style={{
            textDecoration: "none",
            color: localStorage.getItem("theme") === "dark" ? "white" : "black",
          }}
        >
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <AssignmentIndIcon
                className={selectedIndex === 4 ? "swirl" : null}
                color={selectedIndex === 4 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary={i18n("portfolio.menu")} />
          </ListItem>
        </Link>

        <Link
          to="/frame/cv"
          style={{
            textDecoration: "none",
            color: localStorage.getItem("theme") === "dark" ? "white" : "black",
          }}
        >
          <ListItem
            button
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
              <DescriptionIcon
                className={selectedIndex === 5 ? "swirl" : null}
                color={selectedIndex === 5 ? "primary" : "action"}
              />
            </ListItemIcon>
            <ListItemText primary={i18n("cv.menu")} />
          </ListItem>
        </Link>

        <Divider />
      </List>
    </div>
  );
}

SelectedListItem.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
