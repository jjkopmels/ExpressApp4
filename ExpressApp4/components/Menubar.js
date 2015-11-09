import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as bs from 'react-bootstrap';
import bootstrap from 'bootstrap';

const {
  Navbar,
  NavBrand,
  Nav,
  NavItem
} = bs;

class UserDropdown extends Component {
  render() {
    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">

                    My Account <span className="caret"></span>
        </a>

        <ul className="dropdown-menu">
          <li><Link to="/settings"> Settings </Link></li>
          <li role="separator" className="divider"></li>
          <li onClick={this.props.logout}><a href="#">Logout</a></li>
        </ul>
      </li>
    );
  }
}

export default class Menubar extends Component {
  render() {
    console.log('rendering menubar');
    var todos;
    var loginTab;
    var signupTab;
    var userDropdown;
    if (this.props.isLoggedIn()) {
      // userDropdown = (<UserDropdown logout={this.props.logout}/>);
      userDropdown = <li onClick={this.props.logout}><a href="#">Logout</a></li>
    } else {
      loginTab = <li onClick={this.props.login}><a href="#">Login</a></li>
      signupTab = <li><Link to="/signup"> Sign Up</Link></li>;
    }

    var items = [];
    if (this.props.isLoggedIn()) {
      items.push(<li><Link to='/dashboard'> Dashboard</Link></li>);
    }

    return (
      <Navbar className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <Link className="navbar-brand" to="/"> RTBZY Base app</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-left">
              {items}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              { loginTab }
              { signupTab }

              { userDropdown }

            </ul>
          </div>

        </div>
      </Navbar>
    );
  }
}
