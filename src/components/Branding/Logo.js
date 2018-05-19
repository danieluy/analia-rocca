import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ fontSize, animated }) => (
  <h1
    className="branding-logo"
    style={{
      fontSize,
      animation: (animated ? 'switch 5s ease-in-out 0s 1 forwards' : 'none')
    }}
  >
    joy
    <span
      className="alt"
      style={{
        animation: (animated ? 'stretch-right 5s ease-in-out 0s 1 forwards' : 'none')
      }}
    >
      !
    </span>
    <span
      className="eria"
      style={{
        animation: (animated ? 'stretch-left 5s ease-in-out 0s 1 forwards' : 'none')
      }}
    >
      ería
    </span>
  </h1>
);

export default Logo;

Logo.propTypes = {
  fontSize: PropTypes.string,
  animated: PropTypes.bool
};

Logo.defaultProps = {
  fontSize: '10rem',
  animated: false
};
