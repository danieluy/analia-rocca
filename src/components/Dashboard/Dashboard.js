import React from 'react';
// import PropTypes from 'prop-types';
import { getCollections } from '../../backend';
import Container from '../Container/Container';
import CollectionList from '../Collection/CollectionList';
import InputDocument from '../InputDocument/InputDocument';
import Section from './Section';
import { handleBackendError, translate } from '../../utils';
import * as firebase from '../../firebase';
import events from '../../events';
import { RoundCollections, RoundFolder } from '../../assets/icons';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      collections: null,
      addDocumentOpen: false
    };
    this.updateAuthStatus = this.updateAuthStatus.bind(this);
    this.getCollectionsFromBackend = this.getCollectionsFromBackend.bind(this);
  }
  componentDidMount() {
    this.updateAuthStatus();
    this.getCollectionsFromBackend();
    events.on('AUTH_STATE_CHANGED', this.updateAuthStatus);
    events.on('AUTH_STATE_CHANGED', this.getCollectionsFromBackend);
  }
  updateAuthStatus() {
    this.setState({
      user: firebase.getCurrentUser()
    });
  }
  getCollectionsFromBackend() {
    getCollections()
      .then(collections => this.setState({ collections }))
      .catch(err => handleBackendError(err));
  }
  render() {
    if (this.state.user) {
      const { addDocumentOpen } = this.state;
      return (
        <Container>
          <div className="dashboard">
            <Section
              title="Documentos"
              icon={<RoundFolder />}
            >
              {!addDocumentOpen
                ? <button className="button" onClick={() => this.setState({ addDocumentOpen: true })}>Add Documents</button>
                : <InputDocument done={() => this.setState({ addDocumentOpen: false })} /> // TODO update list when done
              }
            </Section>
            <Section
              title="Colecciones"
              icon={<RoundCollections />}
            >
              {this.state.collections
                ? this.state.collections.map(collection => (
                  <CollectionList
                    key={`collection-list-${translate(collection.title)}`}
                    collection={collection}
                  />
                ))
                : <h4>Cargando Colecciones...</h4>
              }
            </Section>
          </div>
        </Container>
      );
    }
    return (
      <Container>
        <button className="sign-in-button" onClick={firebase.signInWithGogle}>Sign In With Google</button>
      </Container>
    );
  }
}

export default Dashboard;
