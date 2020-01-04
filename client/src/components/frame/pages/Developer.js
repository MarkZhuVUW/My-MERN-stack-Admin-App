import React, { Component } from "react";
import SwaggerUI, { presets } from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";
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
    return <div id="swaggerContainer" />;
  }
}

const mapStateToProps = state => ({
  swaggerUIDocs: state.developer.swaggerUIDocs
});
export default connect(mapStateToProps, { loadSwaggerUI })(Developer);
