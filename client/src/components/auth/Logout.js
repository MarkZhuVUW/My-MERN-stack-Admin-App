import React, { Component, Fragment } from "react";
// import { NavLink } from 'reactstrap';
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,

    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  handleOnClick = () => {
    this.props.logout();
    this.props.history.push("/signin");
  };
  render() {
    return (
      <Link onClick={this.handleOnClick} color="inherit">
        Log Out
      </Link>
    );
  }
}

export default withRouter(connect(null, { logout })(Logout));
