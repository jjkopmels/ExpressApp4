import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import DevTools from './DevTools';
import routes from '../routes';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    // const component = <ReduxRouter routes={ routes(store) }></ReduxRouter>

    return (
      <Provider store={store}>
        <div>
          <ReduxRouter />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
