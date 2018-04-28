import React from 'react';
import PropTypes from 'prop-types';

const DocumentInfo = ({ preview, index, onRemove }) => (
  <div className="document-info">
    <button className="close-card-button" onClick={() => onRemove(index)}>&times;</button>
    <div className="preview">{preview}</div>
    <div className="form">
      <input type="text" placeholder="Título" />
      <input type="text" placeholder="Descripción" />
      <input type="date" placeholder="Año" />
      <input type="number" placeholder="Ancho" />
      <input type="number" placeholder="Largo" />
      <input type="number" placeholder="Altura" />
      <select>
        <option value="silver">Plata</option>
        <option value="gold">Oro</option>
      </select>
    </div>
  </div>
);

export default DocumentInfo;

DocumentInfo.propTypes = {
  preview: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired
};
