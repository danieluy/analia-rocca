import React from 'react';
// import PropTypes from 'prop-types';
import Container from '../../Container/Container';
import InputDocument from '../../InputDocument/InputDocument';

class Documents extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      addDocumentOpen: false
    };
  }
  render() {
    const { addDocumentOpen } = this.state;
    return (
      <Container>
        {!addDocumentOpen
          ? <button className="button" onClick={() => this.setState({ addDocumentOpen: true })}>Add Documents</button>
          : <InputDocument done={() => this.setState({ addDocumentOpen: false })} /> // TODO update list when done
        }
      </Container>
    );
  }
}

export default Documents;
