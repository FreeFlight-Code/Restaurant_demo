import axios from 'axios';

// Set up initial state
const initialState = {
    products: []
};

// action types
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

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

export function addProduct(obj) {
    axios.post('/api/product', obj).then( res => {
        if(res){
        alert('item added')    
        return {
            type: ADD_PRODUCT,
            payload: obj
        }}
        alert('unable to add item')
    })
}

// reducer function
export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS + '_FULFILLED':
            let obj =  Object.assign({}, state, {products: action.payload });
            return obj;
        case ADD_PRODUCT + '_FULFILLED':
            let newState = Object.assign({}, state);
            newState.products.push(action.type)
            return newState;
        default:
            return state;
    }

}