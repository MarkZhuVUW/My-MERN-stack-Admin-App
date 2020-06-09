import React, {Component} from 'react';

import {Breadcrumb as AntBreadcrumb} from 'antd';
import Container from '@material-ui/core/Container';

/**
 * breadscrumb to provide navigation information on each page.
 */
class Breadcrumb extends Component {
  /**
   *
   * @return {*}
   */
  render() {
    return (
      <Container
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AntBreadcrumb>
          {this.props.items.map((item) => (
            <AntBreadcrumb.Item key={item[0]}>{item[0]}</AntBreadcrumb.Item>
          ))}
        </AntBreadcrumb>
      </Container>
    );
  }
}

export default Breadcrumb;
