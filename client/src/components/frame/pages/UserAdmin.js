import React, { Component } from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors } from "../../../actions/errorActions";
import EditableTable from "../../EditableTable";

const styles = {
  table: {
    width: "80%"
  }
};

class UserAdmin extends Component {
  state = {};

  static propTypes = {};
  componentDidMount() {
    const { email, TFA } = this.props;
    const { domainName } = this.state;
    if (this.props.title === "Google Two-Factor Auth") {
      const obj = {
        email,
        domainName
      };
      this.props.getTFA(obj).then(() => {
        console.log(TFA);
        console.log(email);

        if (!TFA && email) {
          this.props.TFASetup(obj).then(() => {
            this.props.getTFA(obj);
          });
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
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
  clearErrors
})(withStyles(styles)(UserAdmin));
