import { makeStyles } from "@material-ui/core/styles";
import MyButton from "components/shared/MyButton";
import styles from "jss/global";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { toQuery } from "../shared/utils";
import PopupWindow from "./PopupWindow";

const propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  clientId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  redirectUri: PropTypes.string,
  scope: PropTypes.string
};
const defaultProps = {
  buttonText: "Sign in with GitHub",
  redirectUri: "",
  scope: "user:email",
  onSuccess: () => {},
  onFailure: () => {},
  className: null,
  children: null
};

const useStyles = makeStyles(styles);
const classes = useStyles();

class GitHubLogin extends Component {
  onBtnClick = () => {
    const { clientId, scope, redirectUri } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri
    });

    const popup = PopupWindow.open(
      "github-oauth-authorize",
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 }
    );

    popup.then(
      (data) => this.onSuccess(data),

      (error) => this.onFailure(error)
    );
  };

  onSuccess = (data) => {
    if (!data.code) {
      this.onFailure(new Error("'code' not found"));
    }

    this.props.onSuccess(data);
  };

  onFailure = (error) => {
    this.props.onFailure(error);
  };

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };
    if (className) {
      attrs.className = className;
    }

    return (
      <MyButton color="github" {...attrs}>
        <i className={`${classes.socials} fab fa-github`} />
        {children || buttonText}
      </MyButton>
    );
  }
}

GitHubLogin.propTypes = propTypes;
GitHubLogin.defaultProps = defaultProps;
export default GitHubLogin;
