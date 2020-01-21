import React, { Component } from "react";
import { Grid, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors } from "../../../actions/errorActions";
import { loadAllUsers } from "../../../actions/authActions";
import { deleteUser } from "../../../actions/authActions";
import { i18n } from "i18n";
import EditableTable from "../../../components/EditableTable";
import { useLayoutEffect, useState, useEffect, setState } from "react";
import { register } from "../../../actions/authActions";

import {
  Typography,
  makeStyles,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Container,
  Button,
  Zoom,
  Box,
  FormControl,
  Divider,
  useTheme
} from "@material-ui/core";

import AnimatedProgress from "../../components/animatedProgress";
import DropdownSelection from "../../components/dropdownSelect";
import PermissionCheckboxes from "../../components/permissionCheckboxes";
import BottomMenu from "../../components/bottomMenu";

const styles = {};

class Settings extends Component {
  state = {};

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loadAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadAllUsers();
  }

  componentDidUpdate(prevProps) {}

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  /**
   * This callback function sends back the email of the user to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  callback = id => {
    this.props.deleteUser(id);
  };

  onSubmit = e => {
    e.preventDefault();

    const { code } = this.state;
    const { email } = this.props;

    //clear errors
    this.toggle();
  };
  /**
   * This callback function sends back the email of the user to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  cb = id => {
    this.props.deleteUser(id);
  };

  registerCallback = userToBeRegistered => {
    this.props.register(userToBeRegistered);
  };
  render() {
    const { classes, allUsers } = this.props;

    return (
      <SettingsContent
        cb={this.cb}
        data={allUsers}
        registerCallback={this.registerCallback}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  allUsers: state.auth.allUsers
});
export default connect(mapStateToProps, {
  clearErrors,
  loadAllUsers,
  deleteUser,
  register
})(withStyles(styles)(Settings));

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#E9EAED",
    width: "100%"
    //   backgroundColor: "black"
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expansionPanelHeader: {
    backgroundColor: "#3F51B5",
    color: "white"
  }
}));

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
function SettingsContent(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showUserCreationProgress, setShowUserCreationProgress] = useState(
    false
  );
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    team: ""
  });
  const [userToBeRegistered, setUserToBeRegistered] = useState(null);
  const handlecreateUser = event => {
    setIsCreatingUser(true);
    setShowUserCreationProgress(true);
  };
  const handleShowUserDetail = event => {
    setIsCreatingUser(false);
  };
  const handleStartEditing = event => {
    setIsEditing(true);
  };
  const handleStopEditing = event => {
    setIsEditing(false);
  };

  const cb = bool => {
    setShowUserCreationProgress(bool);
    setIsCreatingUser(false);
    props.registerCallback(userToBeRegistered);
  };

  function createUserView() {
    const typesOfUser = [
      { type: "Teams", specific: "Sequioa" },
      { type: "Teams", specific: "OEM and SDK" }
    ];
    return (
      <>
        <Toolbar variant="dense" style={{ backgroundColor: "#3f51b5" }}>
          <Typography variant="h6" style={{ color: "white" }}>
            {i18n("settings.userDetail")}
          </Typography>
        </Toolbar>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="Email"
                name="Email"
                label="Email"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="Name"
                fullWidth
                label="Name"
                name="Name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth label="Team" name="Team" />
            </Grid>
            {/* --------------------------------------role-based dropdown menu--------------------------------------  */}
            <Typography variant="h6" style={{ color: "white" }}>
              {i18n("settings.role")}
            </Typography>
            <FormControl margin="normal" fullWidth>
              <DropdownSelection
                disabled={false}
                label="choose team"
                typesOfUser={typesOfUser}
              />
            </FormControl>
            {/* --------------------------------------role-based dropdown menu--------------------------------------  */}

            {/* --------------------------------------permission checkboxes--------------------------------------  */}
            <Typography variant="h6" style={{ color: "white" }}>
              {i18n("settings.permissions")}
            </Typography>
            <FormControl margin="normal" fullWidth>
              <PermissionCheckboxes />
              <Divider variant="middle" />
            </FormControl>
            {/* --------------------------------------permission checkboxes--------------------------------------  */}
            <Grid item xs={12}>
              {showUserCreationProgress ? (
                <AnimatedProgress callback={cb}></AnimatedProgress>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }

  function userDetailView() {
    return (
      <>
        <Toolbar variant="dense" style={{ backgroundColor: "#3f51b5" }}>
          <Typography variant="h6" style={{ color: "white" }}>
            {i18n("settings.userDetail")}
          </Typography>
        </Toolbar>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                value={currentUser.email !== "" ? currentUser.email : "Email"}
                name="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                name="Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                value={currentUser.team !== "" ? currentUser.team : "Team"}
                name="Team"
              />
            </Grid>
            <Grid item xs={12}>
              <Zoom in={true}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlecreateUser}
                >
                  <Typography variant="body1" style={{ color: "white" }}>
                    {i18n("settings.createUser")}
                  </Typography>
                </Button>
              </Zoom>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "name",
      label: "name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "register date",
      label: "register date",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "role",
      label: "role",
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  const data = props.data.map(user => {
    return [
      user._id,
      user.name,
      user.email,
      user.register_date,
      user.role,
      user.permissions
    ];
  });
  const options = {
    filter: true,
    responsive: "scrollMaxHeight",
    onRowsDelete: rowsDeleted => {
      for (var i = 0; i < rowsDeleted.data.length; ++i) {
        //send back to UserAdmin component the email of the user to be deleted.
        props.cb(data[rowsDeleted.data[i].index][0]);
        console.log(rowsDeleted.data[i].index);
        console.log(data[i]);
      }
    },
    onRowClick: rowClicked => {
      var user = rowClicked;
      //send back to UserAdmin component the email of the user to be deleted.
      setCurrentUser({
        name: rowClicked[1],
        email: rowClicked[2],
        team: ""
      });
      // team: rowClicked[6]
      console.log(currentUser);
    }
  };

  return (
    <div>
      <div className={classes.container}>
        {isCreatingUser ? createUserView() : userDetailView()}
      </div>
      <div className={classes.container}>
        <EditableTable
          title="User List"
          data={data}
          cb={props.cb}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
