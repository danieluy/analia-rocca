/* global firebase */
import React from 'react';
import PropTypes from 'prop-types';
import { verifyGoogleId } from '../../backend';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.signInWithGogle = this.signInWithGogle.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged()
      .then(user => console.log(user))
      .catch(err => console.error(err));
  }
  signInWithGogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then((data) => {
        console.log(data);
        this.verifyGoogleIdToken();
      })
      .catch(err => console.error(err));
  }
  verifyGoogleIdToken() {
    firebase.auth().currentUser.getIdToken(true)
      .then(idToken => verifyGoogleId(idToken))
      .then(res => console.log('Success: ', res))
      .catch((err) => {
        console.error(err.status);
        console.error(err.response.body.message);
      });
  }
  render() {
    return (
      <div>
        Dashboard
        <h2>Colecciones</h2>
        <div>
          <button onClick={this.signInWithGogle}>Sign In With Google</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;

Dashboard.propTypes = {
  config: PropTypes.object.isRequired,
};
