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

  onSubmit = e => {
    e.preventDefault();

    const { code } = this.state;
    const { email } = this.props;

    //clear errors
    this.toggle();
  };

  handleDownload = href => {
    const { _id, name, email, role, logs } = this.props.user;

    const downloadLog = {
      name: name,
      email: email,
      role: role,
      explanation: href,
      type: "DOWNLOAD"
    };

    this.props.logDownload(_id, logs, downloadLog);

    this.toggle();
  };

  render() {
    const { classes, allUsers } = this.props;

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
    const data = this.props.allUsers
      ? this.props.allUsers.map(user => {
          return [
            user._id,
            user.name,
            user.email,
            user.register_date,
            user.role,
            user.permissions
          ];
        })
      : [];
    const options = {
      filter: true,
      responsive: "scrollMaxHeight",
      onRowsDelete: rowsDeleted => {
        for (var i = 0; i < rowsDeleted.data.length; ++i) {
          //send back to UserAdmin component the email of the user to be deleted.
          this.props.deleteUser(data[rowsDeleted.data[i].index][0]);
          console.log(rowsDeleted.data[i].index);
          console.log(data[i]);
        }
      }
    };
    return (
      <div>
        <Breadcrumb
          items={[[i18n("frame.menu"), "/"], [i18n("useradmin.menu")]]}
        />
        {allUsers ? (
          <EditableTable options={options} data={data} columns={columns} />
        ) : null}
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
