import React from 'react';
import PropTypes from 'prop-types';
import DocumentInfo from './DocumentInfo';
import InputFiles from '../InputFiles/InputFiles';
import { handleBackendError } from '../../utils';

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
  removeFileAndPreview(index) {
    const previews = this.state.previews.slice();
    const files = this.state.files.slice();
    const previewsRemoved = previews.splice(index, 1);
    const filesRemoved = files.splice(index, 1);
    this.setState({
      files: files.length ? files : null,
      previews
    });
  }
  render() {
    const { files, previews } = this.state;
    const { done } = this.props;
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
                key={preview.src}
                index={i}
                preview={<img className="preview-image" src={preview.src} alt={preview.alt} />}
                onRemove={(index) => { this.removeFileAndPreview(index); }}
              />
            ))}
          </div>
        )}
        <div className="toolbar right">
          <button onClick={done} className="button ok" style={{ marginRight: '1rem' }}>Upload</button>
          <button onClick={done} className="button cancel">Cancel</button>
        </div>
      </div >
    );
  }
}

export default InputDocument;

InputDocument.propTypes = {
  done: PropTypes.func.isRequired
};

