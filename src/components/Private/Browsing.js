import React, { Component } from 'react';
import './Browsing.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from './../../ducks/user';
import Drawer from './Drawer';

class Browsing extends Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        return (
            <div id='Browsing'>
                < Drawer />
                <span id='yellowBackground'>

                </span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(Browsing);