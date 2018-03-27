import React, { Component } from 'react';
import './App.scss';
import _ from 'lodash';
import config from '../../config/main';
import Home from './Home/Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    };
  }
  componentWillMount() {
    window.addEventListener('resize', _.debounce(this.updateWindowDimensions.bind(this), 100));
  }
  updateWindowDimensions() {
    this.setState({
      window: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
    });
  }
  render() {
    return (
      <Home config={config} window={this.state.window} />
    );
  }
}

export default App;
