import React from 'react';
// import PropTypes from 'prop-types';
import Container from '../../Container/Container';
import InputDocument from '../../InputDocument/InputDocument';
import FAB from '../../common/FloatingActionButton/FloatingActionButton';
import { RoundAdd } from '../../../assets/icons';
import Gallery from '../../Gallery/Gallery';
import { getDocuments } from '../../../backend';
import { handleBackendError } from '../../../utils';

class Documents extends React.Component {
  constructor() {
    super();
    this.state = {
      addDocumentOpen: false,
      documents: null
    };
    this.getDocumentsFromBackend = this.getDocumentsFromBackend.bind(this);
    this.onDocumentsUploadDone = this.onDocumentsUploadDone.bind(this);
  }
  componentWillMount() {
    this.getDocumentsFromBackend();
  }
  getDocumentsFromBackend() {
    getDocuments()
      .then(documents => this.setState({ documents }))
      .catch(handleBackendError);
  }
  onDocumentsUploadDone() {
    this.setState({ addDocumentOpen: false }, this.getDocumentsFromBackend);
  }
  render() {
    const { addDocumentOpen, documents } = this.state;
    return (
      <Container>
        {!addDocumentOpen
          ? (
            <FAB action={() => this.setState({ addDocumentOpen: true })}>
              <RoundAdd />
            </FAB>
          )
          : <InputDocument done={this.onDocumentsUploadDone} />
        }
        {documents
          ? <Gallery photos={documents} />
          : <h4>Loading Documents...</h4>
        }
      </Container>
    );
  }
}

export default Documents;
