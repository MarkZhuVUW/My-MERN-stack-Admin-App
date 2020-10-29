import Button from "@material-ui/core/Button";
// @material-ui/core components
import makeStyles from "@material-ui/core/styles/makeStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import buttonStyle from "jss/button";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle
}));

const RegularButton = React.forwardRef((props, ref) => {
  const {
    color,
    children,
    fullWidth,
    disabled,
    size,
    className,
    ...rest
  } = props;

  const classes = makeComponentStyles();

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [className]: className
  });
  return (
    <Button {...rest} ref={ref} className={btnClasses}>
      {children}
    </Button>
  );
});

RegularButton.propTypes = {
  color: PropTypes.oneOf(["primary", "github"]),
  size: PropTypes.oneOf(["sm", "lg"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default RegularButton;
