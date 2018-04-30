import React from 'react';
import PropTypes from 'prop-types';

const DocumentInfo = ({ preview, index, info, onRemove, onChange }) => {
  const handleInput = (evt) => {
    const { value, name } = evt.target;
    onChange(index, Object.assign({}, info, { [name]: value || null }));
  };
  return (
    <div className="document-info">
      <button className="close-card-button" onClick={() => onRemove(index)}>&times;</button>
      <div className="preview">{preview}</div>
      <div className="form">
        <input name="title" value={info.title || ''} type="text" placeholder="Título" onChange={handleInput} />
        <input name="description" value={info.description || ''} type="text" placeholder="Descripción" onChange={handleInput} />
        <input name="date" value={info.date || ''} type="date" placeholder="Año" onChange={handleInput} />
        <input name="width" value={info.width || ''} type="number" placeholder="Ancho" onChange={handleInput} />
        <input name="long" value={info.long || ''} type="number" placeholder="Largo" onChange={handleInput} />
        <input name="height" value={info.height || ''} type="number" placeholder="Altura" onChange={handleInput} />
        <select name="material" onChange={handleInput} value={info.material}>
          <option value="silver">Plata</option>
          <option value="gold">Oro</option>
        </select>
      </div>
    </div>
  );
};

export default DocumentInfo;

DocumentInfo.propTypes = {
  preview: PropTypes.element.isRequired,
  index: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
