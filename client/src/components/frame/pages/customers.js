import React, { Component } from "react";
import { Grid, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors } from "../../actions/errorActions";
import { loadAllUsers } from "../../actions/authActions";
import { deleteUser } from "../../actions/authActions";
import { i18n } from "i18n";
import EditableTable from "../../components/EditableTable";
import { useLayoutEffect, useState, useEffect, setState } from "react";
import { register } from "../../actions/authActions";

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

import ListOfFirmwares from "../shared/ListOfFirmwares";
const styles = {};

class Customers extends Component {
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
   * This callback function sends back the email of the customer to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  callback = id => {
    this.props.deleteUser(id);
  };

  /**
   * This callback function sends back the email of the customer to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  cb = id => {
    this.props.deleteUser(id);
  };

  registerCallback = customerToBeRegistered => {
    this.props.register(customerToBeRegistered);

    this.toggle();
  };
  render() {
    const { classes, allUsers, user } = this.props;

    return (
      <CustomersContent
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
})(withStyles(styles)(Customers));

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
function CustomersContent(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [
    showCustomerCreationProgress,
    setShowCustomerCreationProgress
  ] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    company: "",
    team: ""
  });
  const [customerToBeRegistered, setCustomerToBeRegistered] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    company: "",
    team: ""
  });
  const handlecreateCustomer = event => {
    setIsCreatingCustomer(true);
    setShowCustomerCreationProgress(true);
  };

  const onChange = e => {
    // console.log(e.target.value);
    setCustomerToBeRegistered({
      ...customerToBeRegistered,
      [e.target.name]: e.target.value
    });
  };

  const cb = bool => {
    setShowCustomerCreationProgress(bool);
    setIsCreatingCustomer(false);
    props.registerCallback(customerToBeRegistered);
  };

  const dropdownSelectedCallback = company => {
    // console.log(customerToBeRegistered);
    setCustomerToBeRegistered({
      ...customerToBeRegistered,
      company: company
    });
  };
  function createCustomerView() {
    const typesOfUser = [
      { type: "customer", specific: "NCR" },
      { type: "customer", specific: "Gallagher" }
    ];
    return (
      <>
        <Toolbar variant="dense" style={{ backgroundColor: "#3f51b5" }}>
          <Typography variant="h6" style={{ color: "white" }}>
            {i18n("customers.customerDetail")}
          </Typography>
        </Toolbar>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="email"
                fullWidth
                onChange={onChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="name"
                fullWidth
                label="name"
                name="name"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                fullWidth
                label="password"
                name="password"
                onChange={onChange}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField required fullWidth label="team" name="team" />
            </Grid> */}
            <Typography variant="h6" style={{ color: "white" }}>
              {i18n("customers.role")}
            </Typography>
            <FormControl margin="normal" fullWidth>
              <DropdownSelection
                disabled={false}
                label="choose customer"
                typesOfUser={typesOfUser}
                dropdownSelectedCallback={dropdownSelectedCallback}
                onChange={onChange}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <Grid item xs={12}>
                <ListOfFirmwares isCreatingCustomer={true}></ListOfFirmwares>
              </Grid>
            </FormControl>

            {/* --------------------------------------permission checkboxes--------------------------------------  */}
            <Typography variant="h6" style={{ color: "white" }}>
              {i18n("customers.permissions")}
            </Typography>
            <FormControl margin="normal" fullWidth>
              <PermissionCheckboxes />
              <Divider variant="middle" />
            </FormControl>
            {/* --------------------------------------permission checkboxes--------------------------------------  */}
            <Grid item xs={12}>
              {showCustomerCreationProgress ? (
                <AnimatedProgress callback={cb}></AnimatedProgress>
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }

  function customerDetailView() {
    return (
      <>
        <Toolbar variant="dense" style={{ backgroundColor: "#3f51b5" }}>
          <Typography variant="h6" style={{ color: "white" }}>
            {i18n("customers.customerDetail")}
          </Typography>
        </Toolbar>
        <Paper className={classes.paper}>
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
                  currentCustomer.email !== "" ? currentCustomer.email : "email"
                }
                label="email"
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
                label="name"
                value={
                  currentCustomer.name !== "" ? currentCustomer.name : "name"
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
                  currentCustomer.company !== ""
                    ? currentCustomer.company
                    : "company"
                }
                label="company"
                name="company"
              />
            </Grid>

            <Grid item xs={12}>
              <ListOfFirmwares></ListOfFirmwares>
            </Grid>
            <Grid item xs={12}>
              <Zoom in={true}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlecreateCustomer}
                >
                  <Typography variant="body1" style={{ color: "white" }}>
                    {i18n("customers.createCustomer")}
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
      name: "email",
      label: "email",
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
    },
    {
      name: "company",
      label: "company",
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  const data = props.data
    ? props.data
        .filter(user => user.role === "customer" && props.user.role === "admin")
        .map(customer => {
          return [
            customer._id,
            customer.name,
            customer.email,
            new Date(customer.register_date).toString(),
            customer.role,
            customer.company
          ];
        })
    : [];
  const options = {
    filter: true,
    responsive: "scrollMaxHeight",
    onRowsDelete: rowsDeleted => {
      for (var i = 0; i < rowsDeleted.data.length; ++i) {
        //send back to CustomerAdmin component the email of the customer to be deleted.
        props.cb(data[rowsDeleted.data[i].index][0]);
        console.log(rowsDeleted.data[i].index);
        console.log(data[i]);
      }
    },
    onRowClick: rowClicked => {
      var customer = rowClicked;
      //send back to CustomerAdmin component the email of the customer to be deleted.
      setCurrentCustomer({
        name: rowClicked[1],
        email: rowClicked[2],
        company: rowClicked[5]
      });
      // team: rowClicked[6]
      console.log(currentCustomer);
    }
  };

  return (
    <div>
      <div className={classes.container}>
        {isCreatingCustomer ? createCustomerView() : customerDetailView()}
      </div>
      <div className={classes.container}>
        <EditableTable
          title="Customer List"
          data={data}
          cb={props.cb}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
}
