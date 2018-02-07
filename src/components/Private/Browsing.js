import React, { Component } from 'react';
import './Browsing.css'
// import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from './../../ducks/user';
// import { getProducts } from './../../ducks/products';
// import { cart } from './../../ducks/cart';
import Drawer from './Drawer';

class Browsing extends Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        const ProductList = ()=>{
            if (this.props.user && this.props.user.user_name){
            return <div>{this.props.user.user_name}</div>
            } else {
                return <div>Apple</div>
            }
        }
        console.log('props', this.props);
        // console.log(this.props.getUserInfo())
        return (
            <div id='Browsing'>
                < Drawer />
                <span>
                <div id='yellowBackground' >
                {ProductList()}
                </div>
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