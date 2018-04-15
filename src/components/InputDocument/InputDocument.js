import React from 'react';
import PropTypes from 'prop-types';

class InputDocument extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { children } = this.props;
    return (
      <div className="input-document">
        <div className="preview">
          {children}
        </div>
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
  }
}

export default InputDocument;

InputDocument.propTypes = {
  children: PropTypes.element.isRequired
};
