import React, { Component } from 'react';
import './Productlist.css'

import { connect } from 'react-redux';

import icon from '../../images/burgerplate.jpg';
import { getUserInfo } from './../../ducks/user';
import { getProducts } from './../../ducks/products';


class Productlist extends Component {
    constructor(props) {
        super(props);
        this.state={}
        this.handleDetails = this.handleDetails.bind(this);
    }

    
    componentDidMount() {
        this.props.getProducts();
        this.props.getUserInfo();
    }
    

    handleDetails() {
        console.log('clicked details')
    }



    render() {
        console.log( this.props)
        const Productlist = () => {
            if (this.props && this.props.products) {
                return (this.props.products.map((el, i, a) => {
                    return <div
                        className='product'
                        key={i}
                    >
                        <img src={icon} alt='' />
                        <p>{el.name}</p>
                        <button key={{ i } + 'button'} onClick={this.handleDetails}>Details</button>
                    </div>
                }))
            } else {
                console.log('error retrieving products...')
            }
        }
        return (
            <div id='yellowBackground'>
                {Productlist()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state, 'state')
    return {
        user: state.user,
        products: state.products
    }
}

const mapDispatchToProps = {
    getUserInfo, 
    getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Productlist);