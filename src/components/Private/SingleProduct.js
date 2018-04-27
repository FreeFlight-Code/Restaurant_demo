import React, { Component } from 'react';
import Drawer from './Drawer';
import { connect } from 'react-redux';
import { getProducts } from './../../ducks/products';
import { getProduct } from './../../ducks/products';
import './SingleProduct.css';

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: "",
            description:"",
            price:""
        }
        this.addToCart = this.addToCart.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
    }
    componentWillMount() {
        getProducts();
    }
    componentDidMount(){
        // console.log(this.props)
        let id = this.props.location.pathname.split('/').pop();
        getProduct(id);
    }
    componentWillUpdate() {
        console.log(this.props)
    }

    goToEdit(){
        let id = this.props.location.pathname.split('/').pop();
        document.location.assign("#/edit/" + id);
    }
    addToCart(){
        console.log('**simulation** product added to cart')
    }

    render() {
        console.log(this.props)
        return (
            <div id = 'singleProductContainer'>
                <div id="imageContainer">
                    < Drawer />

                </div>
                <div className="rightSide">
                        <div id='displayProduct'>
                            <div id='title'><div>Details</div></div>
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
                                <button onClick={this.addToCart}>Add To Cart</button>
                                <button onClick={this.goToEdit}>Edit</button>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // console.log(state, 'state')
            products: state.products.products        
})

const mapDispatchToProps = {

    getProducts,
    getProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);