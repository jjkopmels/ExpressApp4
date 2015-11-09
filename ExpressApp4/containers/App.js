import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import Explore from '../components/Explore';
import { resetErrorMessage, getProxies, logOut, loggedIn } from '../actions';
import * as constants from '../constants';
import { Link } from 'react-router';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import Menubar from '../components/Menubar';

// injectTapEventPlugin();

var LeftNavComponent = React.createClass({

    render: function () {
      // Optionally, you may add a header to the left navigation bar, by setting
      // the `LeftNav`'s `header` property to a React component, like os:
      //
      //     header={<div className='logo'>Header Title.</div>}
      return (
        <LeftNav
          ref="leftNav"
          docked={false}
          isInitiallyOpen={false}
          menuItems={this.props.menuItems}
          onClick={this._onLeftNavChange}
          onChange={this._onLeftNavChange} />
      );
    },

    toggle:function () {
      this.refs.leftNav.toggle();
    },

    close: function () {
      this.refs.leftNav.close()
    },

    _onLeftNavChange: function(e, selectedIndex, menuItem) {
      this.transitionTo(menuItem.payload);
      this.refs.leftNav.close();
    }
  });

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
    this.login = this.login.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  login() {
    this.lock.show();
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  isLoggedIn() {
    return this.getIdToken() != null;
  }

  getIdToken () {
    const { dispatch, auth } = this.props;
    var stateToken = auth.token;
    // if (!stateToken) {
      var idToken = localStorage.getItem('userToken');
      var authHash = this.lock.parseHash(window.location.hash);
      if (idToken === "") idToken = null;
      //  console.log('state-token ' + JSON.stringify(stateToken));
      //  console.log('id-token ' + JSON.stringify(idToken));
      // console.log('authHash ' + JSON.stringify(authHash));
      if (!idToken && authHash) {
        if (authHash.id_token) {
          idToken = authHash.id_token
          localStorage.setItem('userToken', authHash.id_token);
          // dispatch(loggedIn(idToken));
        }
        if (authHash.error) {
          this.errorMessage = "Error signing in " + authHash;
          return null;
        }
      // } else {
     }
     if (idToken && (idToken != stateToken)) {
      dispatch(loggedIn(idToken));
    }

    // } else {
      // dispatch(loggedIn(idToken));
    //}
    return idToken;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // just for testing
    dispatch(getProxies());
  }

  componentWillMount() {
    this.lock = new Auth0Lock('fAXLqQNBRgUa4p6BNHdkKPqZwOPcLY9a', 'rtbzy.eu.auth0.com');
    this.setState({idToken: this.getIdToken()});
    console.log('App will mount with token ' + this.getIdToken());
    // this.menuItems = [<li key='Home'><Link to='/'>Home</Link></li>];
    // if(this.isLoggedin()) {
    //   this.menuItems.push(<li key='Dashboard'><Link to='/dashboard'>Dashboard</Link></li>);
    //   this.menuItems.push(<li key='Logout'><NavItem onClick={this.logout}>Logout</NavItem></li>);
    // } else {
    //   this.menuItems.push(<li key='Login'><NavItem onClick={this.login}>Login</NavItem></li>);
    // }
  }

  handleChange(nextValue) {
    this.props.pushState(null, `/${nextValue}`);
  }

  logout() {
      const { dispatch, router, history } = this.props;
      localStorage.removeItem('userToken');
      dispatch(logOut());
      // router.transitionTo('/');
      // history.pushState(null, '/');
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    );
  }

  render() {
    const { children, inputValue, router } = this.props;
    const { idToken } = this.state;

    return (
      <div className="main-container">
        <Menubar login={this.login}
                 logout={this.logout}
                 token={this.getIdToken()}
                 isLoggedIn={this.isLoggedIn}/>
        { children }


      </div>
    );
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node
};

function mapStateToProps(state, dispatch) {
  // console.log("App::MapStateToProps with state " + JSON.stringify(state));
  return {
    errorMessage: state.errorMessage,
    inputValue: state.router.location.pathname.substring(1),
    resetErrorMessage,
    dispatch,
    pushState,
    logOut,
    loggedIn,
    router: state.router,
    auth: state.auth,
    history
  };
}
// , {
//   resetErrorMessage,
//   pushState
// }
export default connect(mapStateToProps)(App);
