// import React from "react";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import PeopleIcon from "@material-ui/icons/People";
// import BarChartIcon from "@material-ui/icons/BarChart";
// import LayersIcon from "@material-ui/icons/Layers";
// import AssignmentIcon from "@material-ui/icons/Assignment";
// import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
// import Logout from "../auth/Logout";

// const [selectedIndex, setSelectedIndex] = React.useState(1);

// const handleListItemClick = (event, index) => {
//   setSelectedIndex(index);
// };

// export const mainListItems = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItem>
//   </div>
// );

// export const secondaryListItems = (
//   <div>
//     <ListItem button>
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="developer" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="admin" />
//     </ListItem>
//   </div>
// );
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import AssessmentIcon from '@material-ui/icons/Assessment';
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.callback(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <DashboardIcon color={selectedIndex === 0 ? "primary" : "action"} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
           <ListItemIcon>
            <DeveloperBoardIcon color={selectedIndex === 1 ? "primary" : "action"} />
          </ListItemIcon>
          <ListItemText primary="Developer" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
           <ListItemIcon>
            <AssessmentIcon color={selectedIndex === 2 ? "primary" : "action"} />
          </ListItemIcon>
          <ListItemText primary="admin" />
        </ListItem>
      </List>
    </div>
  );
}
