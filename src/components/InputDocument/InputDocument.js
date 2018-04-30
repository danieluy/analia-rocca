import React from 'react';
import PropTypes from 'prop-types';
import DocumentInfo from './DocumentInfo';
import InputFiles from '../InputFiles/InputFiles';
import { postDocuments } from '../../backend';
import { handleBackendError } from '../../utils';
import cloneDeep from 'lodash/cloneDeep';

class InputDocument extends React.Component {
  constructor() {
    super();
    this.state = {
      files: null,
      previews: null
    };
    this.handleFilesInput = this.handleFilesInput.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.handleDocumentInfoInput = this.handleDocumentInfoInput.bind(this);
  }
  handleDocumentInfoInput(index, info) {
    console.log(index, info);
    const previews = cloneDeep(this.state.previews);
    previews[index] = Object.assign(previews[index], { info });
    this.setState({ previews });
  }
  uploadFiles() {
    const { files, filesInfo } = this.state;
    // TODO: improve alert
    if (!files || !files.length || !filesInfo)
      return alert('Select a file');
    postDocuments({ files, filesInfo })
      .then(res => console.log(res))
      .catch(handleBackendError);
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
                info={preview.info || {}}
                onRemove={(index) => { this.removeFileAndPreview(index); }}
                onChange={this.handleDocumentInfoInput}
              />
            ))}
          </div>
        )}
        <div className="toolbar right">
          <button onClick={this.uploadFiles} className="button ok" style={{ marginRight: '1rem' }}>Upload</button>
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

