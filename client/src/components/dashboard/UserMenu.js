// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import DraftsIcon from "@material-ui/icons/Drafts";
// import SendIcon from "@material-ui/icons/Send";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

// import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
// import Logout from "../auth/Logout";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Link
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import classNames from "classnames";

// components
import { Badge, Typography, Button } from "../Wrappers/Wrappers";
import UserAvatar from "../../components/UserAvatar";

// context
// import {
//   useLayoutState,
//   useLayoutDispatch,
//   toggleSidebar,
// } from "../../context/LayoutContext";
import { Logout } from "../auth/Logout";
// import { useUserDispatch, signOut } from "../../context/UserContext";
// const StyledMenu = withStyles({
//   paper: {
//     border: "1px solid #d3d4d5"
//   }
// })(props => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "center"
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "center"
//     }}
//     {...props}
//   />
// ));

// const StyledMenuItem = withStyles(theme => ({
//   root: {
//     "&:focus": {
//       backgroundColor: theme.palette.primary.main,
//       "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
//         color: theme.palette.common.white
//       }
//     }
//   }
// }))(MenuItem);

import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles(theme => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  appBar: {
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: theme.spacing(2.5),
    width: 36,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.black, 0.08)
    }
  },
  searchFocused: {
    backgroundColor: fade(theme.palette.common.black, 0.08),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 250
    }
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer"
    }
  },
  searchIconOpened: {
    right: theme.spacing(1.25)
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: "100%"
  },
  messageContent: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenu: {
    marginTop: theme.spacing(7)
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column"
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5)
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2)
  },
  headerIcon: {
    fontSize: 28,
    color: "rgba(255, 255, 255, 0.35)"
  },
  headerIconCollapse: {
    color: "white"
  },
  profileMenu: {
    minWidth: 265
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2)
  },
  profileMenuItem: {
    color: theme.palette.text.hint
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light
    }
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2)
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0
  },
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: "none"
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2)
  }
}));

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // global
  // var layoutState = useLayoutState();
  // var layoutDispatch = useLayoutDispatch();
  // var userDispatch = useUserDispatch();

  // local
  const [mailMenu, setMailMenu] = useState(null);
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState(null);
  const messages = [
    {
      id: 0,
      variant: "warning",
      name: "Jane Hew",
      message: "Hey! How is it going?",
      time: "9:32"
    },
    {
      id: 1,
      variant: "success",
      name: "Lloyd Brown",
      message: "Check out my new Dashboard",
      time: "9:18"
    },
    {
      id: 2,
      variant: "primary",
      name: "Mark Winstein",
      message: "I want rearrange the appointment",
      time: "9:15"
    },
    {
      id: 3,
      variant: "secondary",
      name: "Liana Dutti",
      message: "Good news from sale department",
      time: "9:09"
    }
  ];
  return (
    <div>
      {/* user menu */}
      <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
      <Menu
        id="profile-menu"
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={() => setProfileMenu(null)}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        disableAutoFocusItem
      >
        <div className={classes.profileMenuUser}>
          <Typography variant="h4" weight="medium">
            John Smith
          </Typography>
          <Typography
            className={classes.profileMenuLink}
            component="a"
            color="primary"
            href="https://flatlogic.com"
          >
            Flalogic.com
          </Typography>
        </div>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <AccountIcon className={classes.profileMenuIcon} /> Profile
        </MenuItem>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <AccountIcon className={classes.profileMenuIcon} /> Tasks
        </MenuItem>
        <MenuItem
          className={classNames(
            classes.profileMenuItem,
            classes.headerMenuItem
          )}
        >
          <AccountIcon className={classes.profileMenuIcon} /> Messages
        </MenuItem>
        <div className={classes.profileMenuUser}>
          <Typography
            className={classes.profileMenuLink}
            color="primary"
            onClick={Logout}
          >
            Sign Out
          </Typography>
        </div>
      </Menu>
      {/* user menu */}

      {/* messages menu */}
      <Menu
        id="mail-menu"
        open={Boolean(mailMenu)}
        anchorEl={mailMenu}
        onClose={() => setMailMenu(null)}
        MenuListProps={{ className: classes.headerMenuList }}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        disableAutoFocusItem
      >
        <div className={classes.profileMenuUser}>
          <Typography variant="h4" weight="medium">
            New Messages
          </Typography>
          <Typography
            className={classes.profileMenuLink}
            component="a"
            color="secondary"
          >
            {messages.length} New Messages
          </Typography>
        </div>
        {messages.map(message => (
          <MenuItem key={message.id} className={classes.messageNotification}>
            <div className={classes.messageNotificationSide}>
              <UserAvatar color={message.variant} name={message.name} />
              <Typography size="sm" color="text" colorBrightness="secondary">
                {message.time}
              </Typography>
            </div>
            <div
              className={classNames(
                classes.messageNotificationSide,
                classes.messageNotificationBodySide
              )}
            >
              <Typography weight="medium" gutterBottom>
                {message.name}
              </Typography>
              <Typography color="text" colorBrightness="secondary">
                {message.message}
              </Typography>
            </div>
          </MenuItem>
        ))}
        <Fab
          variant="extended"
          color="primary"
          aria-label="Add"
          className={classes.sendMessageButton}
        >
          Send New Message
          <SendIcon className={classes.sendButtonIcon} />
        </Fab>
      </Menu>
      {/* messages menu */}

      {/* <IconButton
        color="inherit"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <Logout />
        </StyledMenuItem>
      </StyledMenu> */}
    </div>
  );
}
