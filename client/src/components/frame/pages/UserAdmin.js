import React, { Component } from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors } from "../../../actions/errorActions";
import { loadAllUsers } from "../../../actions/authActions";

import EditableTable from "../../EditableTable";

const styles = {
  table: {
    width: "80%"
  }
};

class UserAdmin extends Component {
  state = {};

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loadAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired
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
  render() {
    const { classes, allUsers } = this.props;

    return (
      <div>
        {console.log(allUsers)}
        {allUsers ? (
          <EditableTable data={allUsers} className={classes.table} />
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
  loadAllUsers
})(withStyles(styles)(UserAdmin));
