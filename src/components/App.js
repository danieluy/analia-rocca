import React, { Component } from 'react';
import './App.scss';
import debounce from 'lodash/debounce';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import config from '../../config/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      window: {
        height: window.innerHeight,
        width: window.innerWidth
      },
    };
  }
  componentWillMount() {
    window.addEventListener('resize', debounce(this.updateWindowDimensions.bind(this), 100));
  }
  updateWindowDimensions() {
    this.setState({
      window: {
        height: window.innerHeight,
        width: window.innerWidth
      }
    });
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Home config={config} window={this.state.window} />} />
        <Route path="/dashboard" render={() => <Dashboard config={config} window={this.state.window} />} />
      </Switch>
    );
  }
}

export default App;
