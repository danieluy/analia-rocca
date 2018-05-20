import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../utils';

const ThumbCard = ({ onClick, photo, width }) => (
  <button
    className="thumb-card"
    onClick={onClick}
    style={{ width: `${width}px` }}
  >
    <div className="header">
      <img
        src={photo.src}
        alt={translate(photo.alt)}
      />
      <div className="title">
        <p>{translate(photo.title)}</p>
      </div>
    </div>
    <div className="body">
      <p>{translate(photo.description)}</p>
      <p>{translate(photo.date, 'DATE')}</p>
    </div>
  </button>
);

export default ThumbCard;

ThumbCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.object
  }).isRequired,
  width: PropTypes.number.isRequired
};
