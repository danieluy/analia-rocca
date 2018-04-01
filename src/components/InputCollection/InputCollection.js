import React from 'react';
import PropTypes from 'prop-types';
import InputFiles from '../InputFiles/InputFiles';
import { postCollection } from '../../backend';
import { handleBackendError } from '../../utils';

class InputCollection extends React.Component {
  constructor() {
    super();
    this.state = {
      title: null,
      files: null
    };
    this.addCollection = this.addCollection.bind(this);
  }
  addCollection() {
    postCollection(this.state)
      .then(() => this.setState({
        title: null,
        files: null
      }, this.props.done()))
      .catch(handleBackendError);
  }
  render() {
    console.log('InputCollection', this.state);
    return (
      <div>
        Nueva Colección
        <input type="text" placeholder="Titulo" value={this.state.title || ''} onChange={evt => this.setState({ title: evt.target.value })} />
        <InputFiles onChange={files => this.setState({ files })} />
        <button onClick={this.addCollection}>Guardar</button>
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
