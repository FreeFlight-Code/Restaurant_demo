import React, { Component } from 'react';
import './Productlist.css'

import { connect } from 'react-redux';
import { getProducts } from './../../ducks/products';


class Productlist extends Component {
    constructor(props) {
        super(props);
        this.openProductDetails = this.openProductDetails.bind(this);
        this.openAddProduct = this.openAddProduct.bind(this);
    }

    componentDidMount() {
        this.props.getProducts(); 
    }
    
    openProductDetails(e, id) {
        document.location.assign('#/product/' + id)
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
                        <button onClick={(e)=>{this.openProductDetails(e, el.id)}}>details</button>
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
    console.log(state, 'state')
    return {

        products: state.products.products
    }
}

const mapDispatchToProps = {

    getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Productlist);