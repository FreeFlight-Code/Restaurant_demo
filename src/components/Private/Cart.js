import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart } from './../../ducks/cart';
import { updateCart } from './../../ducks/cart';
import './Cart.css';



class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {cart: [
            {name: 'initialized', quantity: 2, price: "2.3"},
            {name: 'data', quantity: 4, price: "12.34"},
            {name: 'hamburger', quantity: 6, price: "22.34"},
            {name: 'hot dog', quantity: 1, price: "24"},
            {name: 'oil caster', quantity: 5, price: "32.34"},
        ]}

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
        console.log(this.props.cart)
        const cartContents = (()=>{
            if (this.state && this.state.cart && this.state.cart.length > 0) {
                return this.state.cart.map( (el, i, a) =>{
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
                //eslint-disable-next-line
                return <div>No items in cart</div>
            }
        })()

        return (
            <div id='CartContainer'>
                <h1>Cart</h1>
                <div id='cartHolder'>
                    {cartContents}
                    <button onClick={this.updateMyCart}>UPDATE</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = {
    getCart,
    updateCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);