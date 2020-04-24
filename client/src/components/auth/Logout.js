import Link from "@material-ui/core/Link";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
// import { NavLink } from 'reactstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/authActions";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,

    //withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleOnClick = () => {
    this.props.logout();
    // TODO   find a more elegant way of listening to redux states.
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };
  render() {
    return (
      <Link onClick={this.handleOnClick} color="inherit">
        {i18n("logout")}
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps, { logout })(Logout));
