import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from './Drawer';
import { addProduct } from '../../ducks/products';
import './AddProduct.css'
// import axios from 'axios';



class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state={
            name: "",
            description: "",
            price: ""
        }
        // this.addProduct = this.addProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (value, id){
        this.setState({
            [id]: value
        })
        
        console.log(this.state)
    }
    // addProduct() {

        // console.log('entered addproduct')
        // let newItem = this.state;
        // axios.post('/api/product', newItem)
        // .then((results)=>{
        //     console.log('results from front end... ', results)
        // })
        // .catch((error)=>{
        //     throw error;
        // })
    // }

render() {
    return (
        <div id='addProductContainer'>
            < Drawer />

            <div className='rightSection'>
                <h1>Add a Product</h1>
                <div>Item Name</div>
                <input onChange={(e)=>{this.handleChange(e.target.value, e.target.id)}} placeholder='Name' id='name' className='add item input' />
                <div>Description</div>
                <input onChange={(e)=>{this.handleChange(e.target.value, e.target.id)}} placeholder='Description' id='description' className='add item input' />
                <div>Price</div>
                <input onChange={(e)=>{this.handleChange(e.target.value, e.target.id)}} placeholder='Price' id='price' className='add item input' />
            <button type='submit' onClick={addProduct}>Submit</button>
            </div>
        </div>
    );
}
}

function mapStateToProps(state) {
    // console.log(state, 'props')
    return {
        user: state.user,
        products: state.products.products
    }
}

const mapDispatchToProps = {
    // getUserInfo, 
    // getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);