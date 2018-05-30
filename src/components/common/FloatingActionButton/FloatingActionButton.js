import React from 'react';
import PropTypes from 'prop-types';

const FloatingActionButton = ({ children, action }) => (
  <button onClick={action} className="fab">{children}</button>
);

export default FloatingActionButton;

FloatingActionButton.propTypes = {
  children: PropTypes.element.isRequired,
  action: PropTypes.func.isRequired
};
