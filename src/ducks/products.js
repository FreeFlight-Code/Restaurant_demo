import axios from 'axios';

// Set up initial state
const initialState = {};

// action types
const GET_PRODUCT = 'GET_PRODUCT';
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
// const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// action creators
export function getProduct(id) {
    const product = axios.get('/api/product/' + id).then( res => {
        //returns object
        return res.data[0];
    })
    return {
        type: GET_PRODUCT,
        payload: product
    }
}
export function deleteProduct(id) {
    axios.delete('/api/product/' + id)
    // .then(()=>{
        console.log('for dad')
        return {
            type: DELETE_PRODUCT,
            payload: id
        }
    // })
}
// export function editProduct(id) {
//     const product = axios.get('/api/product/' + id).then( res => {
//         return res.data
//     })
//     return {
//         type: EDIT_PRODUCT,
//         payload: product
//     }
// }
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
    let newState = Object.assign({}, state);
    console.log(action, 'action');
    console.log(state, 'state');
    switch (action.type) {
        case DELETE_PRODUCT + '_FULFILLED':
        console.log(newState, 'before reducer')
            newState = newState.products.splice();
            console.log(newState, 'in reducer')
            break;
        case GET_PRODUCTS + '_FULFILLED':
            newState.products = action.payload;
            break;
        case GET_PRODUCT + '_FULFILLED':
            newState.focusedItem = action.payload;
            break;
        case ADD_PRODUCT + '_FULFILLED':
            newState.products.push(action.type)
            break;
        default:
            return state;
    }

    return newState;
}