import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart } from './../../ducks/cart';
import { updateCart } from './../../ducks/cart';
import './Cart.css';



class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.updateMyCart = this.updateMyCart.bind(this);
    }
    componentWillMount() {
        this.props.getCart();
    }

    selectChange(e, i){
        let cart = this.props.cart;
        cart[i].quantity = e.target.value;
        this.setState({
            cart
        })
    }
    updateMyCart(){
        let cart = this.state.cart;
        this.props.updateCart(cart);
    }

    render() {
        console.log(this.state)
        const cartContents = (()=>{
            if (this.props && this.props.cart && this.props.cart.length > 0) {
                return this.props.cart.map( (el, i, a) =>{
                    return (
                        <div key={`div${i}`}>
                            <span key={`span-name-${i}`}>{el.name}</span>
                            <span key={`span-price-${i}`}>{el.price}</span>
                            <select key={`select-quantity-${i}`} id='' onChange={(e)=>{this.selectChange(e, i)}} defaultValue={el.quantity} name="quantity">
                                <option value="0">0</option> 
                                <option value="1">1</option> 
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                    )
                })
            }
            else {
                <div>No items in cart</div>
            }
            // return (JSON.stringify(this.state.cart))
        })()

        return (
            <div id='CartContainer'>
                {cartContents}
                <button onClick={this.updateMyCart}>UPDATE</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // user: state.user,
        cart: state.cart
    }
}

const mapDispatchToProps = {
    // getUserInfo,
    getCart,
    updateCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);