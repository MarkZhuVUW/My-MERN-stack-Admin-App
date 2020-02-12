import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import SwaggerUI, { presets } from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";
import Breadcrumb from "view/shared/Breadcrumb";
import { loadSwaggerUI } from "../../../actions/developerActions";

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
    return (
      <React.Fragment style={{ backgroundColor: "white" }}>
        <Breadcrumb
          items={[[i18n("frame.menu"), "/"], [i18n("developer.menu")]]}
        />
        <div id="swaggerContainer" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  swaggerUIDocs: state.developer.swaggerUIDocs
});

export default connect(mapStateToProps, { loadSwaggerUI })(Developer);
