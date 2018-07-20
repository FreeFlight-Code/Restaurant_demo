import axios from 'axios';

// Set up initial state
const initialState = [];

// action types
const GET_CART = 'GET_CART';
const REPLACE_CART = 'REPLACE_CART';
const ADDITEM_CART = 'ADDITEM_CART';

// action creators
// function isValid(obj) {
//     //has properties

//     let testKeys = ["name", "quantity", "price"];
//     for (let objKey in obj) {
//         if (testKeys.indexOf(objKey) <0) {
//             return false;
//         }
//     }
//     if (obj.quantity < 1) return false;
//     if (obj.price < 0) return false;
//     return true;
// }

export function addItem(item) {
    //item is obj
    return {
        type: 'ADDITEM_CART',
        payload: item
    }

}
export function getCart() {
    //results from backend is an array
    const cart = axios.get('/api/getCart').then(res => {
        // console.log(res.data, 'return from db')
        return res.data
    })
    .catch(err=>console.log(err))
    if(cart){
        return {
            type: GET_CART,
            payload: cart
        }
    }
}


export function replaceCart(obj) {
    // const cart = axios.get('/api/getCart').then(res => {
    //     return res.data
    // })
    // let newCart = Object.assign([], ...cart, ...obj);
    // console.log(newCart, 'replaceobj')
    // axios.post('/api/replaceCart', [id, newCart])
    // return {
    //     type: REPLACE_CART,
    //     payload: newCart
    // }
}


// reducer function
export default function cartReducer(state = initialState, action) {
    let newState = Object.assign([], ...state);
    switch (action.type) {

        case GET_CART + '_FULFILLED':
            //action.payload = edited object
            newState = [...state, ...action.payload];
            break;

        case REPLACE_CART + '_FULFILLED':
            //payload = 1 obj
            newState = [...state, ...action.payload];
            break;
        case ADDITEM_CART + '_FULFILLED':
            //payload = 1 obj
            newState = newState.push(action.payload);
            break;

        default:
            return state;
    }
    console.log(newState)
    return newState;
}