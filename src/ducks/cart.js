import axios from 'axios';

// Set up initial state
const initialState = {
    cart: {}
};

// action types
const GET_CART = 'GET_CART';

// action creators
export function cart() {
    const cart = axios.get('/api/getCart').then( res => {
        return res.data
    })
    return {
        type: GET_CART,
        payload: cart
    }
}

// reducer function
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART + '_FULFILLED':
            return Object.assign({}, state, { cart: action.payload });
        default:
            return state;
    }

}