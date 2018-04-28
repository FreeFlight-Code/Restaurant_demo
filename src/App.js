import React, { Component } from 'react';
// import { matchPath } from 'react-router';
import { Switch, HashRouter, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Browsing from './components/Private/Browsing';
import SingleProduct from './components/Private/SingleProduct';
import AddProduct from './components/Private/AddProduct';
import EditProduct from './components/Private/EditProduct';


export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={ Login } path='/' exact />
          <Route component={ Browsing } path='/browsing' />
          <Route component={ SingleProduct } path='/product' />
          <Route component={ AddProduct } path='/add' />
          <Route component={ EditProduct } path='/edit' />
        </Switch>
      </HashRouter>  
    );
  }
}

