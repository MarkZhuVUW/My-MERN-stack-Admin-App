import MyButton from "components/shared/MyButton";
import PropTypes from "prop-types";
import React from "react";
import { toQuery } from "../shared/utils";
import PopupWindow from "./PopupWindow";

const propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  clientId: PropTypes.string.isRequired,
  onSuccessCallback: PropTypes.func,
  onFailureCallback: PropTypes.func,
  redirectUri: PropTypes.string,
  scope: PropTypes.string
};
const defaultProps = {
  buttonText: "Sign in with GitHub",
  redirectUri: "",
  scope: "user:email",
  onSuccessCallback: () => {},
  onFailureCallback: () => {},
  className: null,
  children: null
};

const GitHubLogin = ({
  clientId,
  scope,
  redirectUri,
  className,
  buttonText,
  children,
  onSuccessCallback,
  onFailureCallback
}) => {
  const onFailure = (error) => {
    onFailureCallback(error);
  };
  const onSuccess = (data) => {
    if (!data.key) {
      onFailure(new Error("'code' not found"));
    }

    onSuccessCallback(data.key);
  };

  const onBtnClick = () => {
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
      (data) => onSuccess(data),

      (error) => onFailure(error)
    );
  };

  const attrs = { onClick: onBtnClick };

  if (className) {
    attrs.className = className;
  }

  return (
    <MyButton
      color={localStorage.getItem("theme") === "dark" ? "primary" : "github"}
      className="button-oauth"
      {...attrs}
    >
      {children || buttonText}
    </MyButton>
  );
};

GitHubLogin.propTypes = propTypes;
GitHubLogin.defaultProps = defaultProps;
export default GitHubLogin;
