import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

class InputFiles extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: null,
      errors: props.errors
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFilesSelection = this.handleFilesSelection.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props))
      this.setState({
        errors: nextProps.errors
      });
  }
  handleFilesSelection(filesToUpload) {
    this.setState({
      files: Array.from(filesToUpload),
      errors: {}
    }, this.handleInput);
  }
  handleInput() {
    const { multiple, onChange, fieldName } = this.props;
    const { files } = this.state;
    if (!multiple && files.length > 1) {
      const errors = Object.assign({}, this.state.errors);
      errors.multiple = 'Seleccione un único archivo.';
      this.setState({ errors });
    }
    else if (multiple)
      onChange(files.map(file => ({ fieldName, pathOrBlob: file })));
    else
      onChange({ fieldName, pathOrBlob: files[0] });
  }
  handleOnChange(evt) {
    evt.preventDefault();
    this.handleFilesSelection(evt.target.files);
  }
  render() {
    const { multiple } = this.props;
    const { files, errors } = this.state;
    return (
      <div
        className="upload-target"
        onDragOver={(evt) => { evt.preventDefault(); }}
        onDrop={(evt) => {
          evt.preventDefault();
          this.handleFilesSelection(evt.dataTransfer.files);
        }}
      >
        <label htmlFor="upload-input" id="upload-target-surrogate">
          Haz click aquí o arrastra archivos para subirlos.
        </label>
        {multiple ?
          <input
            id="upload-input"
            type="file"
            onChange={this.handleOnChange}
            multiple
          /> :
          <input
            id="upload-input"
            type="file"
            onChange={this.handleOnChange}
          />
        }
        {files ?
          <div id="upload-preview">
            {files.map((file, i) => <p key={`file-${i}`}>{file.name}</p>)}
          </div> :
          null
        }
        {errors && <pre style={{ color: '#F00' }}>{JSON.stringify(errors, null, 2)}</pre>}
      </div>
    );
  }
}

export default InputFiles;

InputFiles.propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  fieldName: PropTypes.string.isRequired
};

InputFiles.defaultProps = {
  multiple: true,
  errors: {}
};
