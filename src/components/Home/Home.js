import React from 'react';
import PropTypes from 'prop-types';
import Collection from '../Collection/Collection';
import Container from '../Container/Container';
import { getCollections, populateCollections } from '../../firebase';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: null
    };
    this.fetchCollections = this.fetchCollections.bind(this);
  }
  componentDidMount() {
    this.fetchCollections();
  }
  fetchCollections() {
    getCollections()
      .then(collections => populateCollections(collections))
      .then(collections => this.setState({ collections }))
      .catch(err => console.error(err));
  }
  render() {
    const { collections } = this.state;
    return (
      <Container>
        {(collections && collections.length)
          ? collections.map((collection, i) => (
            <Collection
              key={`collection-${i}`}
              collection={collection}
            />
          ))
          : <h4>Loading Collections...</h4>
        }
      </Container>
    );
  }
}

export default Home;

Home.propTypes = {
  config: PropTypes.object.isRequired,
};
