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
    loadAllUsers: PropTypes.func.isRequired

  };
  componentDidMount() {
    const { email, TFA } = this.props;
    const { domainName } = this.state;
    
  }
  componentDidUpdate(prevProps) {
    
  }
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
    const { classes } = this.props;

    return <EditableTable className={classes.table} />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  TFA: state.auth.TFA
});
export default connect(mapStateToProps, {
  clearErrors,
  loadAllUsers
})(withStyles(styles)(UserAdmin));
