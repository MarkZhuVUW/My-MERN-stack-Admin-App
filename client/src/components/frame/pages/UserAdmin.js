import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Zoom
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import Breadcrumb from "components/shared/Breadcrumb";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  deleteUser,
  loadAllUsers,
  register
} from "../../../actions/authActions";
import { clearErrors } from "../../../actions/errorActions";
import AnimatedProgress from "../../shared/animatedProgress";
import DropdownSelection from "../../shared/dropdownSelect";
import EditableTable from "../../shared/EditableTable";
import ResponsiveDialog from "../../shared/ResponsiveDialog";

const styles = {};

class UserAdmin extends Component {
  state = { msg: null };

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loadAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    deleteUser: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.loadAllUsers();
  }

  componentDidUpdate(prevProp, prevState, snapshot) {
    const { error } = this.props;

    if (error !== prevProp.error) {
      // Check for register error

      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  /**
   * This callback function sends back the email of the user to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  callback = (id) => {
    this.props.deleteUser(id);
  };

  /**
   * This callback function sends back the email of the user to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  cb = (id) => {
    this.props.deleteUser(id);
  };

  registerCallback = (userToBeRegistered) => {
    this.props.register(userToBeRegistered).then(() => {
      this.props.loadAllUsers();
    });

    this.toggle();
  };

  render() {
    const { allUsers, user, error } = this.props;

    return (
      <SettingsContent
        cb={this.cb}
        data={allUsers}
        registerCallback={this.registerCallback}
        user={user}
        msg={this.state.msg}
        error={error}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  allUsers: state.auth.allUsers,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  clearErrors,
  loadAllUsers,
  deleteUser,
  register,
})(withStyles(styles)(UserAdmin));

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
function SettingsContent(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#E9EAED",
      width: "100%",
      //   backgroundColor: "black"
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(3),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      zIndex: 1,
      position: "relative",
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expansionPanelHeader: {
      backgroundColor: "#3F51B5",
      color: "white",
    },
    aboveParticles: {
      zIndex: 1,
      position: "relative",
    },
  }));
  const classes = useStyles();

  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showUserCreationProgress, setShowUserCreationProgress] = useState(
    false,
  );
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    company: "",
  });
  const [userToBeRegistered, setUserToBeRegistered] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleCreateUser = (event) => {
    setIsCreatingUser(true);
    setShowUserCreationProgress(true);
  };

  const handleAnimatedProgressOnClick = () => {
    setIsLoading(true);
  };

  const onChange = (e) => {
    setUserToBeRegistered({
      ...userToBeRegistered,
      [e.target.name]: e.target.value,
    });
  };

  const cb = (bool) => {
    setShowUserCreationProgress(bool);
    setIsCreatingUser(false);
    props.registerCallback(userToBeRegistered);
    setIsLoading(false);
  };

  const dropdownSelectedCallback = (role) => {
    setUserToBeRegistered({
      ...userToBeRegistered,
      role,
    });
  };
  function createUserView() {
    const typesOfUser = [
      { type: "roles", specific: "guest" },
      { type: "roles", specific: "admin" },
      { type: "roles", specific: "employer" },
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
                name="email"
                label={i18n("useradmin.email")}
                fullWidth
                onChange={onChange}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={i18n("useradmin.name")}
                name="name"
                label={i18n("useradmin.name")}
                fullWidth
                onChange={onChange}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={i18n("useradmin.password")}
                name="password"
                label={i18n("useradmin.password")}
                fullWidth
                onChange={onChange}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id={i18n("useradmin.company")}
                name="company"
                label={i18n("useradmin.company")}
                fullWidth
                onChange={onChange}
                disabled={isLoading}
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
                label="role"
                typesOfUser={typesOfUser}
                dropdownSelectedCallback={dropdownSelectedCallback}
                onChange={onChange}
                disabled={isLoading}
              />
            </FormControl>
            {/* --------------------------------------role-based dropdown menu--------------------------------------  */}

            <Grid item xs={12}>
              {showUserCreationProgress ? (
                <AnimatedProgress
                  callback={cb}
                  onClick={handleAnimatedProgressOnClick}
                />
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
                  readOnly: true,
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
                  readOnly: true,
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
                  readOnly: true,
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
                  readOnly: true,
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
              <Zoom in>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateUser}
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
        sort: false,
      },
    },
    {
      name: i18n("useradmin.name"),
      label: i18n("useradmin.name"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("useradmin.email"),
      label: i18n("useradmin.email"),
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: i18n("useradmin.role"),
      label: i18n("useradmin.role"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("useradmin.company"),
      label: i18n("useradmin.company"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("useradmin.registerDate"),
      label: i18n("useradmin.registerDate"),
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const data =
    props.data && props.user
      ? props.data.map((user) => {
          return [
            user._id,
            user.name,
            user.email,
            user.role,
            user.company,
            new Date(user.register_date).toString(),
          ];
        })
      : [];

  const options = {
    filter: true,
    responsive: "scrollMaxHeight",

    // i18n
    textLabels: {
      pagination: {
        next: i18n("MuiDataTable.nextPage"),
        previous: i18n("MuiDataTable.previousPage"),
        rowsPerPage: i18n("MuiDataTable.rowsPerPage"),
        displayRows: i18n("MuiDataTable.displayRows"), // 1-10 of 30
      },
      toolbar: {
        search: i18n("MuiDataTable.search"),
        downloadCsv: i18n("MuiDataTable.downloadCsv"),
        print: i18n("MuiDataTable.print"),
        viewColumns: i18n("MuiDataTable.viewColumns"),
        filterTable: i18n("MuiDataTable.filterTable"),
      },
      filter: {
        title: i18n("MuiDataTable.filterTable"),
        reset: i18n("MuiDataTable.filterTitle"),
      },
      viewColumns: {
        title: i18n("MuiDataTable.viewColumnsTitle"),
      },
      selectedRows: {
        text: i18n("MuiDataTable.selectedRowsText"),
        delete: i18n("MuiDataTable.delete"),
      },
    },
    onRowsDelete: (rowsDeleted) => {
      if (props.user.role !== "admin") {
        // console.log(props.user.role + " is not allowed to delete users");
        return;
      }
      // rowdDeleted.lookup gets the actual indexes that are deleted in the users data.
      // loop through each index and delete them one by one.
      Object.keys(rowsDeleted.lookup).forEach((index) => {
        // console.log(data[index][0]);
        props.cb(data[index][0]);
      });
    },

    onRowClick: (rowClicked) => {
      // send back to UserAdmin component the email of the user to be deleted.
      setCurrentUser({
        name: rowClicked[1],
        email: rowClicked[2],
        role: rowClicked[3],
        company: rowClicked[4],
      });
      // role: rowClicked[6]
      // console.log(currentUser);
    },
  };

  const responsiveDialogCallback = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {props.msg ? (
        <ResponsiveDialog
          alertMsg={props.msg}
          title={props.error.id}
          responsiveDialogCallback={responsiveDialogCallback}
          type="User Admin Error Handling"
        />
      ) : null}

      <Breadcrumb
        items={[[i18n("frame.menu"), "/"], [i18n("useradmin.route")]]}
      />
      <div className={classes.container}>
        {isCreatingUser ? createUserView() : userDetailView()}
      </div>
      <div className={classNames(classes.aboveParticles, "chart-paper")}>
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
