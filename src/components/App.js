import React, { Component } from 'react';
import './App.scss';
import debounce from 'lodash/debounce';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Wallpaper from './Branding/Wallpaper';
import config from '../../config/';

const Dashboard = Loadable({
  loader: () => import('./Dashboard/Dashboard'),
  loading: () => <div>Loading Dashboard...</div>
});
const Collections = Loadable({
  loader: () => import('./Dashboard/Collections/Collections'),
  loading: () => <div>Loading Collections...</div>
});
const Documents = Loadable({
  loader: () => import('./Dashboard/Documents/Documents'),
  loading: () => <div>Loading Documents...</div>
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
      <BrowserRouter>
        <div className="app">
          <Navbar config={config} window={this.state.window} />
          <Switch>
            <Route exact path="/" exact render={() => <Home config={config} window={this.state.window} />} />
            <Route exact path="/dashboard" render={() => <Dashboard config={config} window={this.state.window} />} />
            <Route exact path="/dashboard/documents" render={() => <Documents config={config} window={this.state.window} />} />
            <Route exact path="/dashboard/collections" render={() => <Collections config={config} window={this.state.window} />} />
            <Route component={NotFound} />
          </Switch>
          <Wallpaper width={window.width} height={window.height} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
