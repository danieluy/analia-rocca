import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MenuIcon, HomeIcon, DashboardIcon } from '../../assets/icons';
import { color } from '../../assets/styles';
import * as firebase from '../../firebase';
import events from '../../events';
import Logo from '../Branding/Logo';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      user: null
    };
    this.updateAuthStatus = this.updateAuthStatus.bind(this);
  }
  componentDidMount() {
    this.updateAuthStatus();
    events.on('AUTH_STATE_CHANGED', this.updateAuthStatus);
  }
  componentWillUnmount() {
    events.off('AUTH_STATE_CHANGED', this.updateAuthStatus);
  }
  updateAuthStatus() {
    this.setState({
      user: firebase.getCurrentUser()
    });
  }
  render() {
    const { height } = this.props.window;
    const { user } = this.state;
    return (
      <div id="navbar" style={{ height }}>
        <div className="navbar-header">
          <button onClick={() => this.setState({ open: !this.state.open })} className="menu-icon-wrapper">
            <MenuIcon width={30} fill={color.grey700} />
          </button>
          <Link to="/" className="menu-title-wrapper">
            <h1>{this.props.config.siteName}</h1>
          </Link>
        </div>
        <div className={`nav-links ${!this.state.open ? 'hidden' : ''}`}>
          <Link className="nav-link" to="/" onClick={() => this.setState({ open: !this.state.open })}>
            <HomeIcon width={30} fill={color.grey700} />
            Inicio
          </Link>
          <Link className="nav-link" to="/dashboard" onClick={() => this.setState({ open: !this.state.open })}>
            <DashboardIcon width={30} fill={color.grey700} />
            Dashboard
          </Link>
          {user &&
            <button className="sign-out-button" onClick={firebase.signOutOfGogle}>Sign Out Of Google</button>
          }
        </div>
        <button onClick={() => this.setState({ open: false })} className={`nav-links-background ${!this.state.open ? 'hidden' : ''}`}>
          <Logo animated={this.state.open} />
          <h3>Analia Rocca</h3>
        </button>
      </div>
    );
  }
}

export default Navbar;

Navbar.propTypes = {
  config: PropTypes.object.isRequired,
  window: PropTypes.object.isRequired
};
