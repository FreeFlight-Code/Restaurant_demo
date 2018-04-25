import React, { Component } from 'react';
// import { matchPath } from 'react-router';
import { Switch, HashRouter, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Browsing from './components/Private/Browsing';
import SingleProduct from './components/Private/SingleProduct';
import AddProduct from './components/Private/AddProduct';


export default class App extends Component {
  render() {
    // console.log('this.props',this.props)
    return (
      <HashRouter>
        <Switch>
          <Route component={ Login } path='/' exact />
          <Route component={ Browsing } path='/browsing' />
          <Route component={ SingleProduct } path='/product' />
          <Route component={ AddProduct } path='/add' />
        </Switch>
      </HashRouter>  
    );
  }
}

