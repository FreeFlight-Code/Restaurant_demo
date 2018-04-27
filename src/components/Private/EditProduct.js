import React, { Component } from 'react';
import Drawer from './Drawer';
import { connect } from 'react-redux';
import { getProduct } from './../../ducks/products';
import { deleteProduct } from './../../ducks/products';
import './SingleProduct.css';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            price: ""
        }
        this.addToCart = this.addToCart.bind(this);
        this.goToProduct = this.goToProduct.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentWillMount() {
        let id = this.props.location.pathname.split('/').pop();
        this.props.getProduct(id);
    }

    goToProduct() {

        let id = this.props.location.pathname.split('/').pop();
        document.location.assign("#/product/" + id);

    }
    addToCart() {

    }
    deleteItem() {
        console.log(this.props)
        if (this.props.focusedItem) {
            let name = this.props.focusedItem.name;
            let yesNo = window.confirm(`Are you sure you want to delete ${name}`);
            if (yesNo) {
                // let id = this.props.focusedItem.id;
                let id = this.props.location.pathname.split('/').pop();
                
                this.props.deleteProduct(id);
                document.location.assign("#/browsing");
            }
        }

    }

    render() {
        console.log(this.props)
        return (
            <div id='editProductContainer'>
                <div id="imageContainer">
                    < Drawer />

                </div>
                <div className="rightSide">
                    <div id='displayProduct'>
                        <div id='title'><div>Edit Item</div></div>
                        <div id='yellowBox'>
                            <div>
                                {this.props && this.props.focusedItem && this.props.focusedItem.name ? this.props.focusedItem.name : "<div>David</div>"}
                                <div className='text name'>Name</div><input className='input name' ></input>
                            </div>
                            <div>
                                <div className='text price'>Price</div><input className='input price' ></input>
                            </div>
                            <div>
                                <div className='text description'>Description</div><input className='input description' ></input>
                            </div>
                            <button onClick={this.addToCart}>Save</button>
                            <button onClick={this.deleteItem}>Delete</button>
                            <button onClick={this.goToProduct}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    // console.log(state)
    return {
        focusedItem: state.products.focusedItem
    }
}

const mapDispatchToProps = {
    getProduct,
    deleteProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);