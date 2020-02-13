import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import SwaggerUI, { presets } from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";
import Breadcrumb from "view/shared/Breadcrumb";
import { loadSwaggerUI } from "../../../actions/developerActions";
import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Zoom
} from "@material-ui/core";

class Developer extends Component {
  componentDidMount() {
    this.props.loadSwaggerUI();

    if (this.props.swaggerUIDocs) {
      SwaggerUI({
        dom_id: "#swaggerContainer",
        spec: this.props.swaggerUIDocs,
        presets: [presets.apis]
      });
    }
  }
  componentDidUpdate() {
    if (this.props.swaggerUIDocs) {
      SwaggerUI({
        dom_id: "#swaggerContainer",
        spec: this.props.swaggerUIDocs,
        presets: [presets.apis]
      });
    }
  }
  static propTypes = {
    swaggerUIDocs: PropTypes.object
  };

  render() {
    return <DeveloperContent />;
  }
}

const mapStateToProps = state => ({
  swaggerUIDocs: state.developer.swaggerUIDocs
});

export default connect(mapStateToProps, { loadSwaggerUI })(Developer);

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
function DeveloperContent() {
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: "#E9EAED",
      width: "100%"
      //   backgroundColor: "black"
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    paper: {
      padding: theme.spacing(3),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      backgroundColor: "white"
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    expansionPanelHeader: {
      backgroundColor: "#3F51B5",
      color: "white"
    }
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Breadcrumb
        items={[[i18n("frame.menu"), "/"], [i18n("developer.menu")]]}
      />

      <div id="swaggerContainer" />
    </Paper>
  );
}
