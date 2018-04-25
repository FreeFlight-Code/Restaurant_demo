import React, { Component } from 'react';
import './Productlist.css'

import { connect } from 'react-redux';

import icon from '../../images/burgerplate.jpg';
import { getUserInfo } from './../../ducks/user';
import { getProducts } from './../../ducks/products';


class Productlist extends Component {
    constructor(props) {
        super(props);
        // this.state={
        //     products:[{name:"loading..."}]
        // }
        this.openProductDetails = this.openProductDetails.bind(this);
        this.openAddProduct = this.openAddProduct.bind(this);
    }

    
    componentWillMount() {
        this.props.getProducts();

    }

    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         productName: nextProps
    //     })
    // }

    componentDidMount() {
        this.setState({
            products: this.props.products
        })
        
    }
    

    openProductDetails(e, id) {
        document.location.assign('#/product/' + id)
    }
    openAddProduct(){
        document.location.assign("#/add");
    }



    render() {
        console.log(this.props, 'props')
        console.log(this.state, 'state')
        const Productlist = () => {
            if (this.props && this.props.products && this.props.products.length>0) {
                return (this.props.products.map((el, i, a) => {
                    return <div
                        className='product'
                        key={i}>
                        <div><img src={icon} alt='' /></div>
                        <p>{el.name}</p>
                        <div>{el.description}</div>
                        <button className='round-button' key={{ i } + 'button'} onClick={(e)=>{this.openProductDetails(e, el.id)}}>Details</button>
                    </div>
                }))
            } else {
                console.log('loading products...')
            }
        }
        return (
            <div id='yellowBackground'>
                {Productlist()}
                <button onClick={this.openAddProduct} className='round-button' id='add-button'>Add</button>
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
    getUserInfo, 
    getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Productlist);