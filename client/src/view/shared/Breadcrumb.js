import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import Paper from "@material-ui/core/Paper";

class Breadcrumb extends Component {
  render() {
    return (
      <Paper>
        <AntBreadcrumb>
          {this.props.items.map(item => (
            <AntBreadcrumb.Item key={item[0]}>{item[0]}</AntBreadcrumb.Item>
          ))}
        </AntBreadcrumb>
      </Paper>
    );
  }
}

export default Breadcrumb;
