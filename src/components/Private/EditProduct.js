import React, { Component } from 'react';
import Drawer from './Drawer';
import { connect } from 'react-redux';
import { getProducts } from './../../ducks/products';
import './SingleProduct.css';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: "",
            description:"",
            price:""
        }
        this.addToCart = this.addToCart.bind(this);
        this.goToProduct = this.goToProduct.bind(this);
    }

    componentDidMount() {
        // const listOfItems = this.props.getProducts(); 
        // this.setState({
        //     products: listOfItems
        // })
        // console.log(this.props.getProducts())
    }

    goToProduct(){

        let id = this.props.location.pathname.split('/').pop();
        document.location.assign("#/product/" + id);

    }
    addToCart(){

    }

    render() {
        return (
            <div id = 'editProductContainer'>
                <div id="imageContainer">
                    < Drawer />

                </div>
                <div className="rightSide">
                        <div id='displayProduct'>
                            <div id='title'><div>Edit Item</div></div>
                            <div id='yellowBox'>
                                <div>
                                    <div className='text name'>Name</div><input className='input name' ></input>
                                </div>
                                <div>
                                    <div className='text price'>Price</div><input className='input price' ></input>
                                </div>
                                <div>
                                    <div className='text description'>Description</div><input className='input description' ></input>
                                </div>
                                <button onClick={this.addToCart}>Save</button>
                                <button onClick={this.goToProduct}>Cancel</button>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    // console.log(state, 'state')
    return {

        products: state.products.products
    }
}

const mapDispatchToProps = {

    getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);