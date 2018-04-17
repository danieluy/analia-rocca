import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MenuIcon } from '../../assets/icons';
import { color } from '../../assets/styles';

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  render() {
    const { height } = this.props.window;
    return (
      <div id="navbar" style={{ height }}>
        <button onClick={() => this.setState({ open: !this.state.open })} className="menu-icon-wrapper">
          <MenuIcon width={30} fill={color.grey700} />
        </button>
        <Link to="/" className="menu-title-wrapper" onClick={() => this.setState({ open: !this.state.open })}>
          <h1>{this.props.config.siteName}</h1>
        </Link>
        <div className={`nav-links ${!this.state.open ? 'hidden' : ''}`}>
          <Link className="nav-link" to="/dashboard" onClick={() => this.setState({ open: !this.state.open })}>Dashboard</Link>
        </div>
        <button onClick={() => this.setState({ open: !this.state.open })} className={`nav-links-background ${!this.state.open ? 'hidden' : ''}`} />
      </div>
    );
  }
}

export default Navbar;

Navbar.propTypes = {
  config: PropTypes.object.isRequired,
  window: PropTypes.object.isRequired
};
