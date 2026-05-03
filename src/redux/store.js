import { createStore, combineReducers,applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { getProductsReducer, getProductDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer.js';


const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;