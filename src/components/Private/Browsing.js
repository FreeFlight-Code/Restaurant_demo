import React, { Component } from 'react';
import './Browsing.css'
// import axios from 'axios';
import { connect } from 'react-redux';
import Drawer from './Drawer';
import Productlist from './Productlist';

const myName = {
    name: "David", 
    last: "Fischer"
}


class Browsing extends Component {
    constructor(props) {
        super(props);
        this.giveMeInfo = this.giveMeInfo.bind(this)
    }
    
    
    giveMeInfo (info){
       this.setState({
           info: info
       })
    }
    render() {
        return (
            <div id='Browsing'>
                < Drawer  giveMeInfo={this.giveMeInfo} myName={myName}/>
                <Productlist />
            </div>
        )
    }
}

export default connect()(Browsing);