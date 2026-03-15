import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

//configureStore creates the Redux store 
//Redux DevTools Extension in Chrome works automatically
//with RTK (no extra setup needed)
const store = configureStore({
    reducer: {
        //'cart' is the key used in selectors: state.cart.items
        cart: cartReducer,
    },
});

export default store;