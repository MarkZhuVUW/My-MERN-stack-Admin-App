import {
  Avatar,
  Badge,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Person as AccountIcon, Send as SendIcon } from "@material-ui/icons";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TranslateIcon from "@material-ui/icons/Translate";
import classNames from "classnames";
import { i18n, setLanguageCode } from "i18n";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../css3/bouncingEffect.css";
import Logout from "../auth/Logout";
import UserAvatar from "../shared/UserAvatar";

export default function HeaderMenu(props) {
  const useStyles = makeStyles((theme) => ({
    logotype: {
      color: "white",
      marginLeft: theme.spacing(2.5),
      marginRight: theme.spacing(2.5),
      fontWeight: 500,
      fontSize: 18,
      whiteSpace: "nowrap",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    appBar: {
      width: "100vw",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    grow: {
      flexGrow: 1,
    },

    headerMenu: {
      marginTop: theme.spacing(7),
    },
    headerMenuList: {
      display: "flex",
      flexDirection: "column",
    },

    headerMenuButton: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.5),
    },
    headerMenuButtonCollapse: {
      marginRight: theme.spacing(2),
    },
    headerIcon: {
      fontSize: 28,
    },
    headerIconCollapse: {
      color: "white",
    },
    menu: {
      minWidth: 265,
    },
    menuUser: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
    },

    menuLink: {
      fontSize: 16,
      textDecoration: "none",
    },

    messageNotificationSide: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginRight: theme.spacing(2),
    },
    messageNotificationBodySide: {
      alignItems: "flex-start",
      marginRight: 0,
    },
    sendMessageButton: {
      margin: theme.spacing(4),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textTransform: "none",
    },
    sendButtonIcon: {
      marginLeft: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  // local
  const [mailMenu, setMailMenu] = useState(null);
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState(null);
  const [languageMenu, setLanguageMenu] = useState(null);

  const messages = [
    {
      id: 0,
      variant: "warning",
      name: "Jane Hew",
      message: "Hey! How is it going?",
      time: "9:32",
    },
    {
      id: 1,
      variant: "success",
      name: "Lloyd Brown",
      message: "Check out my new Dashboard",
      time: "9:18",
    },
    {
      id: 2,
      variant: "primary",
      name: "Mark Winstein",
      message: "I want rearrange the appointment",
      time: "9:15",
    },
    {
      id: 3,
      variant: "secondary",
      name: "Liana Dutti",
      message: "Good news from sale department",
      time: "9:09",
    },
  ];

  const setLanguage = (code) => {
    setLanguageCode(code);
    window.location.reload();
  };
  return (
    <div>
      {/* language menu */}
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="language-menu"
        onClick={(e) => {
          setLanguageMenu(e.currentTarget);
        }}
        className={classes.headerMenuButton}
      >
        <Badge color="secondary">
          <TranslateIcon classes={{ root: classes.headerIcon }} />
          <Typography>{i18n("language.language")}</Typography>
        </Badge>
      </IconButton>
      <Menu
        id="language-menu"
        open={Boolean(languageMenu)}
        anchorEl={languageMenu}
        onClose={() => setLanguageMenu(null)}
        className={classes.headerMenu}
        classes={{ paper: classes.menu }}
        disableAutoFocusItem
      >
        <MenuItem
          onClick={() => {
            setLanguage("chinese");
          }}
        >
          中文
        </MenuItem>
        <MenuItem onClick={() => setLanguage("en")}>english</MenuItem>
      </Menu>
      {/* language menu */}

      {/* theme menu */}
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="theme-menu"
        onClick={(e) => {
          if (localStorage.getItem("theme") !== "dark") {
            localStorage.setItem("theme", "dark");
            props.themeCallback();
          } else {
            localStorage.setItem("theme", "default");
          }
          props.themeCallback();
        }}
        className={classes.headerMenuButton}
      >
        <Badge color="secondary">
          {localStorage.getItem("theme") === "dark" ? (
            <Brightness4Icon
              classes={{ root: classes.headerIcon }}
              className="swayTranslate"
            />
          ) : (
            <Brightness5Icon
              classes={{ root: classes.headerIcon }}
              className="swayTranslate"
            />
          )}
        </Badge>
      </IconButton>
      {/* theme menu */}

      {/* messages menu */}
      <IconButton
        color="inherit"
        aria-haspopup="true"
        aria-controls="mail-menu"
        onClick={(e) => {
          setMailMenu(e.currentTarget);
          setIsMailsUnread(false);
        }}
        className={classes.headerMenuButton}
      >
        <Badge
          badgeContent={isMailsUnread ? messages.length : null}
          color="secondary"
        >
          {mailMenu ? (
            <DraftsIcon
              classes={{ root: classes.headerIcon }}
              className="bounce"
            />
          ) : (
            <MailIcon
              classes={{ root: classes.headerIcon }}
              className="bounce"
            />
          )}
        </Badge>
      </IconButton>
      <Menu
        id="mail-menu"
        open={Boolean(mailMenu)}
        anchorEl={mailMenu}
        onClose={() => setMailMenu(null)}
        MenuListProps={{ className: classes.headerMenuList }}
        className={classes.headerMenu}
        classes={{ paper: classes.menu }}
        disableAutoFocusItem
      >
        <div className={classes.menuUser}>
          <Typography variant="h4">New Messages</Typography>
          <Typography
            className={classes.menuLink}
            component="a"
            color="secondary"
          >
            {messages.length}
            New Messages
          </Typography>
        </div>
        {messages.map((message) => (
          <MenuItem key={message.id}>
            <div className={classes.messageNotificationSide}>
              <UserAvatar color={message.variant} name={message.name} />
              <Typography>{message.time}</Typography>
            </div>
            <div
              className={classNames(
                classes.messageNotificationSide,
                classes.messageNotificationBodySide,
              )}
            >
              <Typography gutterBottom>{message.name}</Typography>
              <Typography>{message.message}</Typography>
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

      {/* user menu */}
      <IconButton
        aria-haspopup="true"
        color="inherit"
        className={classes.headerMenuButton}
        aria-controls="profile-menu"
        onClick={(e) => setProfileMenu(e.currentTarget)}
      >
        {props.oauthUser ? (
          <>
            {profileMenu ? (
              // TODO wrapping avatar in a div somehow triggers re-render.
              // This is a hacky way of triggering the swirl animation
              // will find a better way when I have better understanding of react.
              <div>
                <Avatar src={props.oauthUser.avatar_url} className="swirl" />
              </div>
            ) : (
              <Avatar src={props.oauthUser.avatar_url} className="swirl" />
            )}
          </>
        ) : (
          <>
            {profileMenu ? (
              <AccountIcon
                classes={{ root: classes.headerIcon }}
                className="swirl"
              />
            ) : (
              <PersonOutlineIcon
                classes={{ root: classes.headerIcon }}
                className="swirl"
              />
            )}
          </>
        )}
      </IconButton>
      <Menu
        id="profile-menu"
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={() => setProfileMenu(null)}
        className={classes.headerMenu}
        classes={{ paper: classes.menu }}
        disableAutoFocusItem
      >
        <div className={classes.menuUser}>
          <Typography variant="h4">{i18n("developerName")}</Typography>
          <Typography
            // className={classes.menuLink}
            component="a"
            color="secondary"
            href="https://www.linkedin.com/in/mark-zhu-06b807145/"
          >
            https://www.linkedin.com/in/mark-zhu-06b807145/
          </Typography>
          <Typography
            // className={classes.menuLink}
            component="a"
            color="secondary"
            href="https://github.com/MarkZhuVUW"
          >
            https://github.com/MarkZhuVUW/
          </Typography>
        </div>
        <MenuItem>
          <AccountIcon />
          {i18n("profile")}
        </MenuItem>

        <MenuItem>
          <AccountIcon />
          {i18n("messages")}
        </MenuItem>
        <div className={classes.menuUser}>
          <Logout />
        </div>
      </Menu>
      {/* user menu */}
    </div>
  );
}

HeaderMenu.propTypes = {
  oauthUser: PropTypes.oneOfType([PropTypes.object]),
  themeCallback: PropTypes.func.isRequired,
};
HeaderMenu.defaultProps = {
  oauthUser: null,
};
