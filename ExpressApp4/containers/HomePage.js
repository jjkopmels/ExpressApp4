import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProxies } from '../actions';
import User from '../components/User';
import ProxyList from '../components/ProxyList';

class HomePage extends Component {
  constructor(props) {
    super(props);
    // this.renderUser = this.renderUser.bind(this);
  }

  render() {
    return (
      <div>Welcome to the base app</div>
    );
  }
}
HomePage.propTypes = {
};

function mapStateToProps(state) {
  // console.log('Dashboard state to props with ' + JSON.stringify(state.entities.proxies.map(ip => proxies[id])));

  return {

  };
}

export default connect(mapStateToProps, {

})(HomePage);
