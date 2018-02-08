import React, { Component } from 'react';
import './Browsing.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from './../../ducks/user';
// import { getProducts } from './../../ducks/products';
// import { cart } from './../../ducks/cart';
import Drawer from './Drawer';
import icon from '../../images/burgerplate.jpg'

class Browsing extends Component {

    componentDidMount() {
        this.props.getUserInfo();
        const Products = axios.get('/api/allproducts').then(res => {

            this.setState({
                products: res.data
            })
        })
    }

    handleDetails(){
        console.log('clicked details')
    }

    render() {
        const userName = ()=>{
            if (this.props.user && this.props.user.user_name) {
                return <div>{this.props.user.user_name}</div>
            } else {
                return <div>Apple</div>
            }
        } 
        const ProductList = () => {
            if (this.state && this.state.products){
                return (this.state.products.map((el, i, a)=>{
                    return <div className='product' key={i}>{el.name}<button key={{i}+'button'} onClick={this.handleDetails.bind(this)}>Details</button></div>
                }))
            } else {
                console.log('error retrieving products...')
            }
        }
        console.log('props', this.props);
        console.log('state', this.state);
        // console.log(this.props.getUserInfo())
        return (
            <div id='Browsing'>
                < Drawer />
                <span>
                    <div id='yellowBackground' >
                        {userName}
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