import axios from 'axios';

// Set up initial state
const initialState = {
    cart: 'initial state'
};

// action types
const GET_CART = 'GET_CART';
const REPLACE_CART = 'REPLACE_CART';

// action creators
export function getCart() {
    //results from backend is an object
    const cart = axios.get('/api/getCart').then( res => {
        return res.data
    })
    return {
        type: GET_CART,
        payload: cart
    }
}

export function replaceCart(obj) {
    const cart = axios.get('/api/getCart').then( res => {
        return res.data
    })
    let newCart = Object.assign({}, cart, ...obj);
    return {
        type: REPLACE_CART,
        payload: newCart
    }
}


// reducer function
export default function cartReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case GET_CART:
        console.log('hit get cart action reducer')
            //action.payload = edited object
            newState = action.payload
            break;

        case REPLACE_CART + '_FULFILLED':
        //payload = 1 obj
            newState = action.payload;
            break;

        default:
            return state;
    }

    return newState;
}