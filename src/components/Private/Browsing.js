import React, { Component } from 'react';
import './Browsing.css'
// import axios from 'axios';
import { connect } from 'react-redux';
import Drawer from './Drawer';
import Productlist from './Productlist';

class Browsing extends Component {

    render() {
        return (
            <div id='Browsing'>
                < Drawer />
                <Productlist />
            </div>
        )
    }
}

export default connect()(Browsing);