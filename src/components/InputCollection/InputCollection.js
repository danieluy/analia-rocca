import React from 'react';
import PropTypes from 'prop-types';
import InputFiles from '../InputFiles/InputFiles';
import InputDocument from '../InputDocument/InputDocument';
import { postCollection } from '../../backend';
import { handleBackendError } from '../../utils';

class InputCollection extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      files: null,
      previews: null
    };
    this.addCollection = this.addCollection.bind(this);
    this.getPreviews = this.getPreviews.bind(this);
    this.handleFilesInput = this.handleFilesInput.bind(this);
  }
  addCollection() {
    postCollection(this.state)
      .then(() => this.setState({
        title: null,
        files: null
      }, this.props.done()))
      .catch(handleBackendError);
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
  handleFilesInput(files) {
    this.setState({ files }, this.getPreviews);
  }
  render() {
    console.log('InputCollection', this.state);
    const { previews } = this.state;
    return (
      <div>
        Nueva Colección
        <input type="text" placeholder="Titulo" value={this.state.title || ''} onChange={evt => this.setState({ title: evt.target.value })} />
        <InputFiles
          onChange={this.handleFilesInput}
          fieldName="photo"
        />
        {previews && (
          <div>
            {previews.map((preview, i) => (
              <InputDocument key={i}>
                <img className="preview-image" src={preview.src} alt={preview.alt} />
              </InputDocument>
            ))}
          </div>
        )}
        <button className="button-ok" onClick={this.addCollection}>Guardar</button>
      </div>
    );
  }
}

export default InputCollection;

InputCollection.propTypes = {
  done: PropTypes.func
};

InputCollection.defaultProps = {
  done: () => { }
};
