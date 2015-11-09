import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProxies } from '../actions';
import User from '../components/User';
import ProxyList from '../components/ProxyList';

function loadData(props) {
  const { fullName } = props;
  props.loadRepo(fullName, ['description']);
  props.loadStargazers(fullName);
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.renderUser = this.renderUser.bind(this);
  }

  componentWillMount() {
    // loadData(this.props);
  }


  componentWillUnmount() {
  
  }

  componentWillReceiveProps(nextProps) {
    // console.log('receiving more props ' + JSON.stringify(nextProps));
    // const { proxies } = nextProps;

    // if (nextProps.fullName !== this.props.fullName) {
    //   loadData(nextProps);
    // }
  }

  // handleLoadMoreClick() {
  //   this.props.loadStargazers(this.props.fullName, true);
  // }

  // renderUser(user) {
  //   return (
  //     <User user={user}
  //           key={user.login} />
  //   );
  // }

  render() {
    const { proxies, dispatch, proxycounters, entities } = this.props;
    // console.log('rendering with proxies ' + JSON.stringify(this.props));
    // if(proxies) {
    //   console.log('proxies length = ' + proxies.length);
    // }
    // if (!repo || !owner) {
    //   return <h1><i>Loading {name} details...</i></h1>;
    // }
    //
    // const { stargazers, stargazersPagination } = this.props;
    return (
      <div>
            <ProxyList
              proxies={proxies}
              proxycounters={proxycounters}
              entities={entities}
              dispatch={dispatch}></ProxyList>
      </div>
    );
  }
}


/*
<Repo repo={repo}
            owner={owner} />
<hr />
<List renderItem={this.renderUser}
      items={stargazers}
      onLoadMoreClick={this.handleLoadMoreClick}
      loadingLabel={`Loading stargazers of ${name}...`}
      {...stargazersPagination} />
*/

Dashboard.propTypes = {
};

function mapStateToProps(state) {
  // console.log('Dashboard state to props with ' + JSON.stringify(state.entities.proxies.map(ip => proxies[id])));
  const { idToken, proxyIDs, proxyCounters } = state;

  return {
    idToken: idToken,
    proxies: proxyIDs.map(p => state.entities.proxies[p]),
    entities: state.entities,
    proxycounters: proxyCounters
  };
}

export default connect(mapStateToProps, {
   getProxies
})(Dashboard);
