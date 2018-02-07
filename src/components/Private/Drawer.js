import React, { Component } from 'react';
import './Drawer.css';
import logo from '../../images/logo.svg'
import menu from '../../images/menu.svg'
import cart from '../../images/shopping-cart.svg'
import logout from '../../images/logout.svg'

class Drawer extends Component {
    render() {
        return(
            <span id='drawer'>

                <div>
                <img id='logo' className='drawer' src={logo} alt='logo'></img>
                    <div>

                        <span>Menu</span>
                        <img className='drawer' src={menu} alt='logo'></img>
                    </div>
                    <div>
                        <span>Cart</span>
                        <img className='drawer' src={cart} alt='logo'></img>

                    </div>
                </div>
                <a href='http://localhost:3030/auth/logout'>
                    <div>
                        <span>Logout</span>
                        <img className='drawer' src={logout} alt='logo'></img>
                    </div>
                    </a>
                </span>
        );
    }
}

export default Drawer;