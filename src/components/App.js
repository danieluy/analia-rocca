import React, { Component } from 'react';
import './App.scss';
import debounce from 'lodash/debounce';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Wallpaper from './Branding/Wallpaper';
import config from '../../config/';

const Dashboard = Loadable({
  loader: () => import('./Dashboard/Dashboard'),
  loading: () => <div>Loading Dashboard...</div>
});
const NotFound = Loadable({
  loader: () => import('./NotFound/NotFound'),
  loading: () => <div>NotFound</div>
});

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
    const { window } = this.state;
    return (
      <div className="app">
        <Navbar config={config} window={this.state.window} />
        <Switch>
          <Route path="/" exact render={() => <Home config={config} window={this.state.window} />} />
          <Route path="/dashboard" render={() => <Dashboard config={config} window={this.state.window} />} />
          <Route component={NotFound} />
        </Switch>
        <Wallpaper width={window.width} height={window.height} />
      </div>
    );
  }
}

export default App;
