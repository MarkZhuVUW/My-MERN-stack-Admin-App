import React, { Component } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors } from "../../../actions/errorActions";
import { loadAllUsers } from "../../../actions/authActions";
import { deleteUser } from "../../../actions/authActions";
import { i18n } from "i18n";

import EditableTable from "../../EditableTable";
import Breadcrumb from "view/shared/Breadcrumb";

const styles = {};

class UserAdmin extends Component {
  state = {};

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loadAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired
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
    console.log();
    this.props.deleteUser(id);
  };
  onSubmit = e => {
    e.preventDefault();

    const { code } = this.state;
    const { email } = this.props;

    //clear errors
    this.toggle();
  };

  render() {
    const { classes, allUsers } = this.props;

    return (
      <div>
        <Breadcrumb
          items={[[i18n("frame.menu"), "/"], [i18n("useradmin.menu")]]}
        />
        {allUsers ? <EditableTable data={allUsers} cb={this.callback} /> : null}
      </div>
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
  deleteUser
})(withStyles(styles)(UserAdmin));
