import Container from "@material-ui/core/Container";
import { Breadcrumb as AntBreadcrumb } from "antd";
import React from "react";

/**
 * breadscrumb to provide navigation information on each page.
 */
const Breadcrumb = (props) => {
  return (
    <Container
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <AntBreadcrumb>
        {props.items.map((item) => (
          <AntBreadcrumb.Item key={item[0]}>{item[0]}</AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    </Container>
  );
};

export default Breadcrumb;
