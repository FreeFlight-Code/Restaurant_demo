import React, { Component } from 'react';
import Drawer from './Drawer';
import { connect } from 'react-redux';
import { getProduct } from './../../ducks/products';
import { deleteProduct } from './../../ducks/products';
import { editProduct } from './../../ducks/products';
import './SingleProduct.css';
import axios from 'axios';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            price: ""
        }
        this.handleeditProduct = this.handleeditProduct.bind(this);
        this.goToProduct = this.goToProduct.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentWillMount() {
        let id = this.props.location.pathname.split('/').pop();
        this.props.getProduct(id);
        if (!this.props.focusedItem) document.location.assign("#/browsing");
    }

    componentDidMount() {
        // this.setState({
        //     name: this.props.focusedItem.name,
        //     price: this.props.focusedItem.price,
        //     description: this.props.focusedItem.description
        // })
    }

    goToProduct() {
        let id = this.props.focusedItem.id;
        document.location.assign("#/product/" + id);

    }
    handleeditProduct() {
        let id = this.props.focusedItem.id;
        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let description = document.getElementById('description').value;
        let obj = {id, name, price, description};
        axios.put('/api/product/', obj)
        document.location.assign("#/product/" + this.props.focusedItem.id);
    }

    deleteItem() {
        if (this.props.focusedItem) {
            let name = this.props.focusedItem.name;
            let yesNo = window.confirm(`Are you sure you want to delete ${name}`);
            if (yesNo) {
                let id = this.props.focusedItem.id;
                this.props.deleteProduct(id);
                document.location.assign("#/browsing");
            }
        }

    }

    render() {
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
                                <input id='name' defaultValue={this.props.focusedItem.name} className='input name' ></input>
                            </div>
                            <div>
                            <input id='price' defaultValue={this.props.focusedItem.price} className='input price' ></input>
                            </div>
                            <div>
                            <input id='description' defaultValue={this.props.focusedItem.description} className='input description' ></input>
                            </div>
                            <button onClick={this.handleeditProduct}>Save</button>
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
    return {
        focusedItem: state.products.focusedItem
    }
}

const mapDispatchToProps = {
    getProduct,
    deleteProduct,
    editProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);