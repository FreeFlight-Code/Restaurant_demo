import axios from 'axios';

// Set up initial state
const initialState = {};

// action types
const GET_PRODUCT = 'GET_PRODUCT';
const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// action creators
export function getProducts() {
    const products = axios.get('/api/allproducts').then( res => {
        return res.data
    })
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export function getProduct(id) {
    const product = axios.get('/api/product/' + id).then( res => {
        return res.data[0];
    })
    return {
        type: GET_PRODUCT,
        payload: product
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

export function editProduct(obj) {
    // console.log('hit action creator', obj)
    axios.put('/api/product/', obj)
    .then( _ => {
        // console.log('returned from axios')
        return {
            type: EDIT_PRODUCT,
            payload: obj
        }
    })
    .catch(()=>{
        console.log(`unable to update item id ${obj.name}`)
    })
    // return {
    //     type: EDIT_PRODUCT,
    //     payload: obj
    // }
}

export function deleteProduct(id) {
    axios.delete('/api/product/' + id)
    // .then(()=>{
    //     console.log('for dad')
        return {
            type: DELETE_PRODUCT,
            payload: id
        }
// })
}


// reducer function
export default function productReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case GET_PRODUCTS + '_FULFILLED':
        newState.products = action.payload;
        break;

        case GET_PRODUCT + '_FULFILLED':
        newState.focusedItem = action.payload;
        break;

        case ADD_PRODUCT + '_FULFILLED':
        newState.products.push(action.payload)
        break;

        case EDIT_PRODUCT + '_FULFILLED':
        let index = newState.products.findIndex(el=>{
            return el.id === action.payload.id;
          })
        newState = Object.assign([],[...newState.slice(0, index), action.payload,  ...newState.slice(index+1)]);
        break;

        case DELETE_PRODUCT + '_FULFILLED':
        let id = action.payload;
        index = newState.products.findIndex(el=>{
            return el.id === 2;
          });
        newState = newState.splice(index, 1);
            break;

        default:
            return state;
    }

    return newState;
}