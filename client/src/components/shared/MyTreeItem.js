import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import TreeItem from "@material-ui/lab/TreeItem";
import PropTypes from "prop-types";

import React from "react";

const useTreeItemStyles = makeStyles((theme) => ({
  content: {
    flexDirection: "row-reverse"
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1
  }
}));


 const MyTreeItem = (props) => {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, ...other } = props;

  return (
    <TreeItem
      label={(
        <div className={classes.labelRoot}>
          <LabelIcon color="action" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      )}
      classes={{
        content: classes.content
      }}
      {...other}
    />
  );
};
MyTreeItem.propTypes = {
  labelText: PropTypes.string,
  labelIcon: PropTypes.oneOfType([PropTypes.object])
};
MyTreeItem.defaultProps = {
  labelText: null,
  labelIcon: null
};

export default MyTreeItem;