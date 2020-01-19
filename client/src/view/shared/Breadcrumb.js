import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { Typography } from "@material-ui/core";

class Breadcrumb extends Component {
  render() {
    return (
      <AntBreadcrumb>
        {this.props.items.map(item => (
          <AntBreadcrumb.Item key={item[0]}>{item[0]}</AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    );
  }
}

export default Breadcrumb;
