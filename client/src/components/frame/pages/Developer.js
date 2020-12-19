/* eslint-disable import/no-extraneous-dependencies */
import { makeStyles, Paper } from "@material-ui/core";
import Breadcrumb from "components/shared/Breadcrumb";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import SwaggerUI, { presets } from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";
import { loadSwaggerUI } from "../../../actions/developerActions";

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: "white",
    padding: theme.spacing(1, 1),
    zIndex: 1,
    position: "relative"
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

const Developer = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.loadSwaggerUI();
  }, []);
  useEffect(() => {
    if (props.swaggerUIDocs) {
      SwaggerUI({
        dom_id: "#swaggerContainer",
        spec: props.swaggerUIDocs,
        presets: [presets.apis]
      });
    }
  }, [props.swaggerUIDocs]);
  return (
    <>
      <Breadcrumb
        items={[[i18n("frame.menu"), "/"], [i18n("developer.route")]]}
      />

      <Paper className={classes.paper}>
        <div id="swaggerContainer" />
      </Paper>
    </>
  );
};

Developer.propTypes = {
  swaggerUIDocs: PropTypes.oneOfType([PropTypes.object]),
  loadSwaggerUI: PropTypes.func.isRequired
};
Developer.defaultProps = {
  swaggerUIDocs: null
};

const mapStateToProps = (state) => ({
  swaggerUIDocs: state.developer.swaggerUIDocs
});
export default connect(mapStateToProps, { loadSwaggerUI })(Developer);
