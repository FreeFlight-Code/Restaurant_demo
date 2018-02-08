import React, { Component } from 'react';
import './Productlist.css'

import { connect } from 'react-redux';

import icon from '../../images/burgerplate.jpg';
import { getUserInfo } from './../../ducks/user';
import { getProducts } from './../../ducks/products';


class Productlist extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[{name:"loading..."}]
        }
        this.handleDetails = this.handleDetails.bind(this);
    }

    
    componentWillMount() {
        this.props.getProducts();

    }

    componentDidMount() {
        this.setState({
            products: this.props.products
        })
        
    }
    

    handleDetails(e, i) {
        console.log('clicked details', i)
    }



    render() {
        const Productlist = () => {
            if (this.props && this.props.products && this.props.products.length>0) {
                return (this.props.products.map((el, i, a) => {
                    return <div
                        className='product'
                        key={i}
                    >
                        <img src={icon} alt='' />
                        <p>{el.name}</p>
                        <button className='round-button' key={{ i } + 'button'} onClick={(e)=>{this.handleDetails(e, i)}}>Details</button>
                    </div>
                }))
            } else {
                console.log('loading products...')
            }
        }
        return (
            <div id='yellowBackground'>
                {Productlist()}
                <button className='round-button' id='add-button'>Add</button>
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