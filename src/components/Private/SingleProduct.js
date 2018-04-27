import React, { Component } from 'react';
import Drawer from './Drawer';
import { connect } from 'react-redux';
// import { getProducts } from './../../ducks/products';
import { getProduct } from './../../ducks/products';
import './SingleProduct.css';

class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state={}

        this.addToCart = this.addToCart.bind(this);
        this.goToEdit = this.goToEdit.bind(this);
    }
    componentWillMount() {
        let id = this.props.location.pathname.split('/').pop();
        this.setState({
            product: this.props.getProduct(id)
        })
        if (!this.props.focusedItem) document.location.assign("#/browsing");
    }

    goToEdit(){
        let id = this.props.location.pathname.split('/').pop();
        document.location.assign("#/edit/" + id);
    }
    addToCart(){
        console.log('**simulation** product added to cart')
    }

    render() {
        // console.log(this.props.products)
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
                                    {this.props && this.props.focusedItem && this.props.focusedItem.name ?this.props.focusedItem.name : ""}
                                </div>
                                <div>
                                {this.props && this.props.focusedItem && this.props.focusedItem.price ?this.props.focusedItem.price : ""}
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
    console.log(state)
    return {
        focusedItem: state.products.focusedItem        
    }
}

const mapDispatchToProps = {
    getProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);