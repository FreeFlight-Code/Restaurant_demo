import axios from 'axios';

// Set up initial state
const initialState = {};

// action types
const GET_PRODUCT = 'GET_PRODUCT';
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

// action creators
export function getProduct(id) {
    const product = axios.get('/api/product/' + id).then( res => {
        return res.data
    })
    return {
        type: GET_PRODUCT,
        payload: product
    }
}
export function getProducts() {
    const products = axios.get('/api/allproducts').then( res => {
        return res.data
    })
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export function addProduct(obj) {
    console.log(obj)
    axios.post('/api/product', obj).then( res => {
        if(res){
            console.log(res)
        alert('item added')    
        return {
            type: ADD_PRODUCT,
            payload: obj
        }}
        alert('unable to add item', obj)
    })
}

// reducer function
export default function productReducer(state = initialState, action) {
    // console.log('entered productReducer')
    switch (action.type) {
        case GET_PRODUCTS + '_FULFILLED':
            let obj =  Object.assign({}, state, {products: action.payload });
            return obj;
        case GET_PRODUCT + '_FULFILLED':
            let obj1 =  Object.assign({}, state, {products: action.payload });
            return obj1;
        case ADD_PRODUCT + '_FULFILLED':
            let newState = Object.assign({}, state);
            newState.products.push(action.type)
            return newState;
        default:
            return state;
    }

}