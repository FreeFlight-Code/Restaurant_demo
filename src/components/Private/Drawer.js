import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { getProduct } from './../../ducks/products';
import './Drawer.css';
import logo from '../../images/logo.svg'
import menu from '../../images/menu.svg'
import cart from '../../images/shopping-cart.svg'
import logout from '../../images/logout.svg'

class Drawer extends Component {
    render() {
        return (
            <div id='drawer'>

                <div id='drawerContainer'>
                    <img id='logo' src={logo} alt='logo'></img>

                    <a href='#/browsing'>
                        <div>
                            <span className="drawerText">Menu</span>
                            <img className='drawer' src={menu} alt='logo'></img>
                        </div>
                    </a>

                    <a href='#/cart' >
                        <div>
                            <span className="drawerText">Cart</span>
                            <img className='drawer' src={cart} alt='logo'></img>
                        </div>
                    </a>
                </div>
                <a href='http://localhost:3030/auth/logout'>
                    <div>
                        <span className="drawerText">Logout</span>
                        <img id='logoutImage' className='drawer' src={logout} alt='logo'></img>
                    </div>
                </a>
            </div>
        );
    }
}


export default Drawer;