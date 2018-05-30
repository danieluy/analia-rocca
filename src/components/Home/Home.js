import React from 'react';
import Collection from '../Collection/Collection';
import Container from '../Container/Container';
import events from '../../events';
import { getCollections, populateDocuments } from '../../firebase';
import { getLocalData, setLocalData } from '../../local-storage';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: null
    };
    this.fetchCollections = this.fetchCollections.bind(this);
    this.loadLocalData = this.loadLocalData.bind(this);
  }
  componentDidMount() {
    events.on('LOCAL_DATA_UPDATED', this.loadLocalData);
    this.loadLocalData();
    this.fetchCollections();
  }
  componentWillUnmount() {
    events.off('LOCAL_DATA_UPDATED', this.loadLocalData);
  }
  loadLocalData() {
    const data = getLocalData();
    if (data)
      this.setState({ collections: data.collections });
  }
  fetchCollections() {
    getCollections()
      .then(collections => populateDocuments(collections))
      .then(collections => setLocalData({ collections }))
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
