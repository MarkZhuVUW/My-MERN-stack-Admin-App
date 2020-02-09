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

import AnimatedProgress from "../../../components/animatedProgress";
import DropdownSelection from "../../../components/dropdownSelect";
import Breadcrumb from "view/shared/Breadcrumb";

// import ListOfFirmwares from "../shared/ListOfFirmwares";
const styles = {};

class UserAdmin extends Component {
  state = {};

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loadAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
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

  /**
   * This callback function sends back the email of the user to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  cb = id => {
    this.props.deleteUser(id);
  };

  registerCallback = userToBeRegistered => {
    console.log(userToBeRegistered);
    this.props.register(userToBeRegistered).then(() => {
      this.props.loadAllUsers();
    });

    this.toggle();
  };
  render() {
    const { classes, allUsers, user } = this.props;

    return (
      <SettingsContent
        cb={this.cb}
        data={allUsers}
        registerCallback={this.registerCallback}
        user={user}
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  allUsers: state.auth.allUsers,
  user: state.auth.user
});
export default connect(mapStateToProps, {
  clearErrors,
  loadAllUsers,
  deleteUser,
  register
})(withStyles(styles)(UserAdmin));

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
    padding: theme.spacing(3),
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

  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const [showUserCreationProgress, setShowUserCreationProgress] = useState(
    false
  );
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    company: ""
  });
  const [userToBeRegistered, setUserToBeRegistered] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });
  const handlecreateUser = event => {
    setIsCreatingUser(true);
    setShowUserCreationProgress(true);
  };

  const onChange = e => {
    setUserToBeRegistered({
      ...userToBeRegistered,
      [e.target.name]: e.target.value
    });
  };

  const cb = bool => {
    setShowUserCreationProgress(bool);
    setIsCreatingUser(false);
    props.registerCallback(userToBeRegistered);
  };

  const dropdownSelectedCallback = role => {
    setUserToBeRegistered({
      ...userToBeRegistered,
      role: role
    });
  };
  function createUserView() {
    const typesOfUser = [
      { type: "roles", specific: "guest" },
      { type: "roles", specific: "admin" },
      { type: "roles", specific: "employer" }
    ];
    return (
      <>
        <Paper className={classes.paper}>
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            {i18n("useradmin.userDetail")}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id={i18n("useradmin.email")}
                name={i18n("useradmin.email")}
                label={i18n("useradmin.email")}
                fullWidth
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id={i18n("useradmin.name")}
                name={i18n("useradmin.name")}
                label={i18n("useradmin.name")}
                fullWidth
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={i18n("useradmin.password")}
                name={i18n("useradmin.password")}
                label={i18n("useradmin.password")}
                fullWidth
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={i18n("useradmin.company")}
                name={i18n("useradmin.company")}
                label={i18n("useradmin.company")}
                fullWidth
                onChange={onChange}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField required fullWidth label="role" name="role" />
            </Grid> */}
            {/* --------------------------------------role-based dropdown menu--------------------------------------  */}
            <Typography variant="h6" style={{ color: "white" }}>
              {i18n("useradmin.role")}
            </Typography>
            <FormControl margin="normal" fullWidth>
              <DropdownSelection
                disabled={false}
                label="role"
                typesOfUser={typesOfUser}
                dropdownSelectedCallback={dropdownSelectedCallback}
                onChange={onChange}
              />
            </FormControl>
            {/* --------------------------------------role-based dropdown menu--------------------------------------  */}

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
        <Paper className={classes.paper}>
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            {i18n("useradmin.userDetail")}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                // a workaround to fix the value overlapping with label
                key="Confirmation Code"
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                value={
                  currentUser.email !== ""
                    ? currentUser.email
                    : i18n("useradmin.email")
                }
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // a workaround to fix the value overlapping with label
                key="Confirmation Code"
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                name="name"
                value={
                  currentUser.name !== ""
                    ? currentUser.name
                    : i18n("useradmin.name")
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // a workaround to fix the value overlapping with label
                key="Confirmation Code"
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                value={
                  currentUser.role !== ""
                    ? currentUser.role
                    : i18n("useradmin.role")
                }
                name="role"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                key="Confirmation Code"
                InputProps={{
                  readOnly: true
                }}
                fullWidth
                value={
                  currentUser.company !== ""
                    ? currentUser.company
                    : i18n("useradmin.company")
                }
                name="Email"
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
                    {i18n("useradmin.createUser")}
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
      name: i18n("useradmin.name"),
      label: i18n("useradmin.name"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("useradmin.email"),
      label: i18n("useradmin.email"),
      options: {
        filter: true,
        sort: true
      }
    },

    {
      name: i18n("useradmin.role"),
      label: i18n("useradmin.role"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("useradmin.company"),
      label: i18n("useradmin.company"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("useradmin.registerDate"),
      label: i18n("useradmin.registerDate"),
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  const data =
    props.data && props.user
      ? props.data.map(user => {
          return [
            user._id,
            user.name,
            user.email,
            user.role,
            user.company,
            new Date(user.register_date).toString()
          ];
        })
      : [];

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
      //send back to UserAdmin component the email of the user to be deleted.
      setCurrentUser({
        name: rowClicked[1],
        email: rowClicked[2],
        role: rowClicked[3],
        company: rowClicked[4]
      });
      // role: rowClicked[6]
      console.log(currentUser);
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[[i18n("frame.menu"), "/"], [i18n("useradmin.menu")]]}
      />
      <div className={classes.container}>
        {isCreatingUser ? createUserView() : userDetailView()}
      </div>
      <div className={classes.container}>
        <EditableTable
          title={i18n("useradmin.table.title")}
          data={data}
          cb={props.cb}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
