import React, { Component, Fragment } from "react";
// import { NavLink } from 'reactstrap';
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Route, BrowserRouter as Router, NavLink } from "react-router-dom";
import Link from '@material-ui/core/Link';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (

      <Link onClick={this.props.logout} color="inherit" href="/signin" >
        Log Out
      </Link>
      
    );
  }
}

export default connect(null, { logout })(Logout);
