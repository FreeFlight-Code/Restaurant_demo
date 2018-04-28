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
    const products = axios.get('/api/allproducts').then(res => {
        return res.data
    })
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export function getProduct(id) {
    const product = axios.get('/api/product/' + id).then(res => {
        return res.data[0];
    })
    return {
        type: GET_PRODUCT,
        payload: product
    }
}

export function addProduct(obj) {
    axios.post('/api/product', obj)
        .then(res => {
            alert('item added')
        })
        .catch( err => {
            alert('unable to add item', obj)
        } );
    return {
        type: ADD_PRODUCT,
        payload: obj
    }
}

export function editProduct(obj) {
    axios.put('/api/product/', obj)
        .then(_ => {
            console.log('item edited');
        })
        .catch(() => {
            alert(`We're sorry but ${obj.name} was NOT able to be edited...`)
        })
    return {
        type: EDIT_PRODUCT,
        payload: obj
    }
}

export function deleteProduct(id) {
    axios.delete('/api/product/' + id)
        .then(() => {
            console.log('item deleted from database')

        })
        .catch(() => {
            alert(`error deleting last item to database`);
            console.log(`item id...${id} not deleted from database`)

        })
        return {
            type: DELETE_PRODUCT,
            payload: id
        }
}


// reducer function
export default function productReducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {

        case GET_PRODUCTS + '_FULFILLED':
        //payload = array of objects
            newState.products = action.payload;
            break;

        case GET_PRODUCT + '_FULFILLED':
        //payload = 1 obj
            newState.focusedItem = action.payload;
            break;

        case ADD_PRODUCT + '_FULFILLED':
            //action.payload = edited object
            newState.products.unshift(action.payload)
            break;

        case EDIT_PRODUCT + '_FULFILLED':
        //action.payload = edited object
            let index = newState.products.findIndex(el => {
                return el.id === action.payload.id;
            })
            newState.products = Object.assign([], [...newState.products.slice(0, index), action.payload, ...newState.products.slice(index + 1)]);
            break;

        case DELETE_PRODUCT + '_FULFILLED':
            //payload = id
            index = newState.products.findIndex(el => {
                return el.id === action.payload;
            });
            newState.products = newState.products.splice(index, 1);
            break;

        default:
            return state;
    }

    return newState;
}