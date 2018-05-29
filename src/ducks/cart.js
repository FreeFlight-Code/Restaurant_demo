import axios from 'axios';

// Set up initial state
const initialState = [];

// action types
const GET_CART = 'GET_CART';
const REPLACE_CART = 'REPLACE_CART';

// action creators
export function getCart() {
    //results from backend is an array
    const cart = axios.get('/api/getCart').then( res => {
        console.log(res.data, 'return from db')
        return res.data
    })
    return {
        type: GET_CART,
        payload: cart
    }
}

export function replaceCart(id, obj) {
    
    const cart = axios.get('/api/getCart').then( res => {
        return res.data
    })
    let newCart = Object.assign([], ...cart, ...obj);
    console.log(newCart, 'replaceobj')
    axios.post('/api/replaceCart', [id, newCart])

    return {
        type: REPLACE_CART,
        payload: newCart
    }
}


// reducer function
export default function cartReducer(state = initialState, action) {
    let newState = Object.assign([], state);
    switch (action.type) {

        case GET_CART + '_FULFILLED':
            console.log('hit get cart action reducer');
        //action.payload = edited object
            newState = [...newState, ...action.payload];
            break;

        case REPLACE_CART + '_FULFILLED':
        //payload = 1 obj
            newState = [...newState, ...action.payload];
            break;

        default:
            return state;
    }

    return newState;
}