import axios from 'axios';

// Set up initial state
const initialState = {
    products: {}
};

// action types
const GET_PRODUCTS = 'GET_PRODUCTS';

// action creators
export function getProducts() {
    const products = axios.get('/api/allProducts').then( res => {
        return res.data
    })
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

// reducer function
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS + '_FULFILLED':
            return Object.assign({}, state, { products: action.payload });
        default:
            return state;
    }

}