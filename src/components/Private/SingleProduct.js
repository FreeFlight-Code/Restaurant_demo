import React, { Component } from 'react';
import Drawer from './Drawer';
import { connect } from 'react-redux';
import { getProduct } from './../../ducks/products';
import './SingleProduct.css';
import axios from 'axios';

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state={}

        this.addToCart = this.addToCart.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
    }
    componentDidMount() {

        //pulls Product ID from url
        let id = this.props.match.params.id;
        const results = axios.get('/api/product/' + id).then(res => {
            return res.data[0];
        })

        this.setState(results)
        // if (!this.props.focusedItem) document.location.assign("#/browsing");
    }

    goToEdit(){
        // let id = this.props.focusedItem.id;
        document.location.assign("#/edit/");
    }
    addToCart(){
        console.log('**simulation** product added to cart')
    }

    render() {
        const price = ()=>{
            let amount = this.props.focusedItem.price;
            return amount.toFixed(2);
        }
        return (
            <div id = 'singleProductContainer'>
                <div id="imageContainer">
                    < Drawer />

                </div>
                <div className="rightSide">
                        <div id='displayProduct'>
                            <div id='title'><div>Details</div></div>
                            <div id='yellowBox'>
                                <div id='productName'>
                                    {this.props && this.props.focusedItem && this.props.focusedItem.name ?this.props.focusedItem.name : ""}
                                </div>
                                <div id='productPrice'>
                                {this.props && this.props.focusedItem && this.props.focusedItem.price ? `$${price()}` : ""}
                                </div>
                                <div>
                                {this.props && this.props.focusedItem && this.props.focusedItem.description ?this.props.focusedItem.description : ""}
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

const mapStateToProps = (state) => {
    return {
        focusedItem: state.products.focusedItem        
    }
}

const mapDispatchToProps = {
    getProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);