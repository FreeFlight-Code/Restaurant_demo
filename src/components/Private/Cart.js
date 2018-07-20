    import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceCart } from './../../ducks/cart';
import { getCart } from './../../ducks/cart';
import './Cart.css';



class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {cart: this.props.cart}
        this.getTotalFromCart = this.getTotalFromCart.bind(this);
        this.updateMyCart = this.updateMyCart.bind(this);
        this.money = this.money.bind(this);
    }
    componentWillMount() {
        if(!this.props.user.id){
            document.location.assign('#/');
        }
    }

    money (num){
        num = Number(num);
        return (`$${num.toFixed(2)}`);
    }

    getTotalFromCart () {
        if (this.props.cart){
            let totalCart = 0;
            for (let i = 0; i < this.props.cart.length; i++){
                totalCart += this.props.cart[i].price * this.props.cart[i].quantity;
            }
            return totalCart;
        }
    }

    selectChange(e, i){
        let cart = this.state.cart;
        cart[i].quantity = e.target.value;
        if(e.target.value === "0"){
            let answer = window.confirm('Do you want to delete this item?')
            if(answer)cart.splice(i, 1);
        }
        this.setState({
            cart: cart
        })
    }

    updateMyCart(){
        let cart = this.state.cart;
        this.props.replaceCart(cart);
        document.location.assign("#/browsing");
    }

    render() {
        const cartContents = (()=>{
            let data;
            function multiply (a, b) {
                return a * b
            }
            if (this.state.cart && this.state.cart.length > 0) data = this.state.cart;

            if (data) {
                return data.map( (el, i, a) =>{
                    return (
                        <div className='item' key={`div${i}`}>
                            <span className='name item' key={`span-name-${i}`}>{el.name}</span>
                            <span className='price item' key={`span-price-${i}`}>{this.money(el.price)}</span>
                            <select className='quantity item' key={`select-quantity-${i}`} id='' onChange={(e)=>{this.selectChange(e, i)}} defaultValue={el.quantity} name="quantity">
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
                            <span key={`span-total-${i}`} className='total item' >{this.money(multiply(el.price, el.quantity))}</span>
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
                    <div>Total: {this.money(this.getTotalFromCart())}</div>
                    <button onClick={this.updateMyCart}>UPDATE</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.cart, 'store')
    return {
        cart: state.cart,
        user: state.user
    }
}

const mapDispatchToProps = {
    replaceCart,
    getCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);