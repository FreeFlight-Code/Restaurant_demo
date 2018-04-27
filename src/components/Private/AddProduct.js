import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from './Drawer';
import { addProduct } from '../../ducks/products';
import './SingleProduct.css'

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state={
            name: "",
            description: "",
            price: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.goToBrowsing = this.goToBrowsing.bind(this);
    }
    //every keystroke in an input field is mapped to state
    handleChange (value, id){
        this.setState({
            [id]: value
        })
        
        // console.log(this.state)
    }
    goToBrowsing(){
        document.location.assign("#/browsing");

    }
    //submit button clicked to add item to database
    handleSubmit() {

        let obj = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
        }

        this.setState({
            name:"",
            description:"",
            price:""
        })
        addProduct(obj);
    }

render() {
    return (
        <div id='addProductContainer'>
        <div id="imageContainer">
                    < Drawer />

                </div>
                <div className="rightSide">
                        <div id='displayProduct'>
                            <div id='title'><div>New Item</div></div>
                            <div id='yellowBox'>
                                <div>
                                    <div className='text name'>Name</div><input value={this.state.name} onChange={(e)=>{this.handleChange(e.target.value, e.target.id)}} placeholder='Name' id='name' className='add item input name'></input>
                                </div>
                                <div>
                                    <div className='text price'>Price</div><input value={this.state.price} onChange={(e)=>{this.handleChange(e.target.value, e.target.id)}} placeholder='Price' id='price' className='add item input price' ></input>
                                </div>
                                <div>
                                    <div className='text description'>Description</div><input value={this.state.description} onChange={(e)=>{this.handleChange(e.target.value, e.target.id)}} placeholder='Description' id='description' className='add item input description' ></input>
                                </div>
                                <button type='submit' onClick={this.handleSubmit}>Submit</button>
                                <button  onClick={this.goToBrowsing}>Cancel</button>
                            </div>
                        </div>
                </div>
        </div>
    );
}
}


export default connect()(AddProduct);