import React, { Component } from 'react';
import './Productlist.css'

import { connect } from 'react-redux';
import { getProducts } from './../../ducks/products';
import { getProduct } from './../../ducks/products';
import { getUserInfo } from './../../ducks/user';
import { getCart } from './../../ducks/cart';


class Productlist extends Component {
    constructor(props) {
        super(props);
        this.openProductDetails = this.openProductDetails.bind(this);
        this.openAddProduct = this.openAddProduct.bind(this);
    }

    componentWillMount() {
        // this.props.getProducts(); 
        // this.props.getUserInfo(); 
        // this.props.getCart();
    }

    componentDidMount() {
        this.props.getProducts(); 
        this.props.getUserInfo(); 
        this.props.getCart(); 
    }
    
    openProductDetails(id) {
        this.props.getProduct(id);
        document.location.assign("#/product/" + id);

    }
    openAddProduct(){
        document.location.assign("#/add");
    }



    render() {
        const Productlist = () => {
            if (this.props && this.props.products && this.props.products.length>0) {
                return (this.props.products.map((el, i, a) => {
                    return <div
                        className='productCard'
                        key={i}>
                        {/* <div className='imageContainer'><img src="http://via.placeholder.com/200x150" alt='' /></div> */}
                        <h3>{el.name}</h3>
                        <button onClick={_=>{this.openProductDetails(el.id)}}>details</button>
                        {/* <div>{el.description}</div> */}
                    </div>
                }))
            }
        }
        return (
            <div id='yellowBackground'>
                {Productlist()}
                <button onClick={this.openAddProduct} className='round-button' id='add-button'>Add Item</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state, 'store')
    return {
        user: state.user,
        cart: state.cart,
        products: state.products.products
    }
}

const mapDispatchToProps = {

    getProducts,
    getProduct,
    getUserInfo,
    getCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Productlist);