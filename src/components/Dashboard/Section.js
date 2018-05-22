import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ children, title, icon, open }) => (
  <React.Fragment>
    {open
      ? (
        <React.Fragment>
          <h2>{title}</h2>
          {children}
        </React.Fragment>
      )
      : (
        <div className="section">
          {icon}
          <h2>{title}</h2>
        </div>
      )
    }
  </React.Fragment >
);

export default Section;

Section.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

Section.defaultProps = {
  open: false
};
