import { combineReducers, createStore, applyMiddleware } from 'redux';
import userReducer from './ducks/user';
import productReducer from './ducks/products';
import promiseMiddleware from 'redux-promise-middleware';

const reducers = combineReducers({
    user: userReducer,
    products: productReducer
})

export default createStore(reducers, {}, applyMiddleware(promiseMiddleware()));