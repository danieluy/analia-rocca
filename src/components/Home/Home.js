/* global firebase */
import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../Gallery/Gallery';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: null
    };
  }
  componentDidMount() {
    firebase.database().ref('collections').on('value', (dataSnapshot) => {
      this.setState({
        collections: dataSnapshot.val()
      });
    });
  }
  render() {
    return (
      <div>
        {this.props.config.siteName}
        {this.state.collections
          ? this.state.collections.map(collection => (
            <Gallery
              key={`collection-galley-${collection.name}`}
              photos={collection.images}
            />
          ))
          : <h4>Loading...</h4>
        }
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  config: PropTypes.object.isRequired,
};
