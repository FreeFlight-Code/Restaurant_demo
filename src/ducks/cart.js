import axios from 'axios';

// Set up initial state
const initialState = {
    cart: {}
};

// action types
const GET_CART = 'GET_CART';
const ADD_CART = 'ADD_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_CART = 'DELETE_CART';

// action creators
export function getCart() {
    const cart = axios.get('/api/getCart').then( res => {
        // console.log(res, 'results from getCart')
        return res.data
    })
    // console.log('cart', cart)
    return {
        type: GET_CART,
        payload: cart
    }
}
export function addCart(id) {
    const cart = axios.put('/api/addCart').then( res => {
        return res.data
    })
    return {
        type: ADD_CART,
        payload: cart
    }
}
export function updateCart(obj) {
    const cart = axios.post('/api/updateCart', obj).then( res => {
        return res.data
    })
    return {
        type: UPDATE_CART,
        payload: cart
    }
}
export function deleteCart(id) {
    const cart = axios.delete('/api/deleteCart').then( res => {
        return res.data
    })
    return {
        type: DELETE_CART,
        payload: cart
    }
}

// reducer function
export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, ...state)
    switch (action.type) {
        case GET_CART + '_FULFILLED':
            newState = action.payload;
            break;
        case ADD_CART + '_FULFILLED':
        console.log('*simulated add to cart*')
            // newState = action.payload;
            break;
        case UPDATE_CART + '_FULFILLED':
            newState = action.payload;
            break;
        case DELETE_CART + '_FULFILLED':
        console.log('*simulated delete to cart*')

            // newState = action.payload;
            break;
        default:
            return state;
    }
    return newState

}