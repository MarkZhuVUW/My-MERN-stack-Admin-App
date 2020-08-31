import { Button } from "@material-ui/core";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/authActions";

class Logout extends Component {
  handleOnClick = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <Button
        onClick={this.handleOnClick}
        color="secondary"
        variant="contained"
      >
        {i18n("logout")}
      </Button>
    );
  }
}
Logout.propTypes = {
  logout: PropTypes.func.isRequired,

  // withRouter

  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withRouter(connect(null, { logout })(Logout));
