import React, { Component } from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Browsing from './components/Private/Browsing';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={ Login } path='/' exact />
          <Route component={ Browsing } path='/browsing' />
        </Switch>
      </HashRouter>  
    );
  }
}

export default App;
