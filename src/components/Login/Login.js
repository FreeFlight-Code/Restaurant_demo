import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import './Login.css'; export default
    class Login extends Component {
    render() {
        return (
            <div className='App'>
                <div id='loginContainer'>
                    <div id='logoSection'>
                        <img src={logo} alt=""></img>
                        <h4>Welcome to</h4>
                        <h2>Good Eats</h2>
                    </div>
                    <div id='right'>
                    <div>
                        <label for="username"></label>Username:
                        <input type="search" name="username" id="username" />
                    </div>
                    <div>
                        <label for="password">Password:</label>
                        <input type="search" name="Password" id="" />
                    </div>
                        <div>
                            <a href='http://localhost:3030/auth'>
                                <button>Login</button>
                            </a>
                            <a href='http://localhost:3030/auth'>
                                <button>Register</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}