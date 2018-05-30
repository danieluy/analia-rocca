import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DashLink = ({ description, title, icon, href }) => (
  <Link to={href} className="dash-link">
    {icon}
    <h2>{title}</h2>
    <p>{description}</p>
  </Link>
);

export default DashLink;

DashLink.propTypes = {
  href: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

DashLink.defaultProps = {};
