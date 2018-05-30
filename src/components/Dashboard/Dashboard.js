import React from 'react';
// import PropTypes from 'prop-types';
import Container from '../Container/Container';
import DashLink from './DashLink';
import * as firebase from '../../firebase';
import events from '../../events';
import { RoundCollections, RoundFolder } from '../../assets/icons';

class Dashboard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.updateAuthStatus = this.updateAuthStatus.bind(this);
  }
  componentDidMount() {
    this.updateAuthStatus();
    events.on('AUTH_STATE_CHANGED', this.updateAuthStatus);
  }
  componentWillUnmount() {
    events.off('AUTH_STATE_CHANGED', this.updateAuthStatus);
  }
  updateAuthStatus() {
    this.setState({
      user: firebase.getCurrentUser()
    });
  }
  render() {
    if (this.state.user)
      return (
        <Container>
          <div className="dashboard">
            <DashLink
              title="Documentos"
              href="/dashboard/documents"
              description="Ver documentos como fotos o PDF's."
              icon={<RoundFolder />}
            />
            <DashLink
              title="Colecciones"
              href="/dashboard/collections"
              description="Ver y gestionar colecciones."
              icon={<RoundCollections />}
            />
          </div>
        </Container>
      );
    return (
      <Container>
        <button className="sign-in-button" onClick={firebase.signInWithGogle}>Sign In With Google</button>
      </Container>
    );
  }
}

export default Dashboard;
