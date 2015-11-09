import React, { Component, PropTypes } from 'react';

export default class ProxyItem extends Component {
  render() {
    const {  proxycounter  } = this.props;
    return (
      <tr>
        <td>{proxycounter.proxy.name}</td>
        <td>{proxycounter.views}</td>
        <td>{proxycounter.mobile}</td>
        <td>{proxycounter.inapp}</td>
      </tr>
    );
  }
}

ProxyItem.propTypes = {
  proxycounter: PropTypes.object.isRequired
};
