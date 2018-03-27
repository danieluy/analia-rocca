import React from 'react';
import PropTypes from 'prop-types';

import Gallery from '../Gallery/Gallery';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.config.siteName}
        <Gallery photos={[
          {
            src: 'https://placeimg.com/640/640/arch',
            w: 640,
            h: 640
          },
          {
            src: 'https://placeimg.com/640/640/animals',
            w: 640,
            h: 640
          },
          {
            src: 'https://placeimg.com/640/640/nature',
            w: 640,
            h: 640
          }
        ]}
        />
      </div>
    );
  }
}

export default Home;

Home.propTypes = {
  config: PropTypes.object.isRequired,
};
