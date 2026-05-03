
import * as actionType from '../constants/cartConstant';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || []
};

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case actionType.ADD_TO_CART:
            const item = action.payload;
            const exist = state.cartItems.find(product => product.id === item.id);

            let updatedCart;

            if (exist) {
                updatedCart = state.cartItems.map(data => data.id === item.id ? item : data );
            } else {
                updatedCart = [...state.cartItems, item];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));

            return {
                ...state,
                cartItems: updatedCart
            }

            case actionType.REMOVE_FROM_CART: {
                const updatedCart =  state.cartItems.filter(product => product.id !== action.payload);

            localStorage.setItem("cart", JSON.stringify(updatedCart));

            return {
                ...state,
                cartItems: updatedCart
            }
        }
            default:
                return state;
    }   

};

 