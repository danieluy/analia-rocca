import React from 'react';
import PropTypes from 'prop-types';
import InputFiles from '../InputFiles/InputFiles';
import { handleBackendError } from '../../utils';

const DocumentInfo = ({ preview }) => (
  <div className="document-info">
    {/* <div className="preview"> */}
      {preview}
    {/* </div> */}
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
DocumentInfo.propTypes = {
  preview: PropTypes.element.isRequired
};

class InputDocument extends React.Component {
  constructor() {
    super();
    this.state = {
      files: null,
      previews: null
    };
    this.handleFilesInput = this.handleFilesInput.bind(this);
  }
  handleFilesInput(files) {
    this.setState({ files }, this.getPreviews);
  }
  getPreviews() {
    Promise.all(this.state.files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve({ src: e.target.result, alt: 'Preview' });
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file.pathOrBlob);
    })))
      .then(previews => this.setState({ previews }))
      .catch(handleBackendError);
  }
  render() {
    const { files, previews } = this.state;
    return (
      <div className="input-document">
        {!files && (
          <InputFiles
            onChange={this.handleFilesInput}
            fieldName="photo"
          />
        )}
        {previews && (
          <div className="document-previews">
            {previews.map((preview, i) => (
              <DocumentInfo
                key={i}
                preview={<img className="preview-image" src={preview.src} alt={preview.alt} />}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default InputDocument;

InputDocument.propTypes = {
  done: PropTypes.func.isRequired
};

