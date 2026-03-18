import { createSlice } from "@reduxjs/toolkit";

//Loads cart from localStorage when the app first opens 
//If nothing is saved yet, start with an empty array    
const loadCartFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem("cart");
        // If 'cart' key exists, parse the JSON string back to an array
        return saved ? JSON.parse(saved) : [];
    } catch {
        // If JSON is corrupted, start fresh
        return [];
    }
};

//Save the current cart array to localStorage as a JSON string
// Called after every action that modifies the cart
const saveCartToStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    //initialState loads from localStorage so cart survives refresh 
    initialState: {
        items: loadCartFromLocalStorage(),
    },
    reducers: {

        //addItem:called when the user clicks the bag icon on a ProductCard
        //If the product is already in the cart, increase quantity by 1
        //If it is new, push it to the cart with quantity 1
        addItem: (state, action) => {
            const product = action.payload; // the full product object
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                existing.qty += 1; //product already in cart - just bump quantity
            } else {
                state.items.push({ ...product, qty: 1 }); //spread product fields and add quantity
            }
            saveCartToStorage(state.items); //persist after change
        },

        //removeItem: called when user clicks the 'Remove' button
        removeItem: (state, action) => {
            const id = action.payload; //id of the product to remove
            state.items = state.items.filter(item => item.id !== id);
            saveCartToStorage(state.items);

        },

        //increaseQuantity: called when user clicks the '+' button in Cart row
        increaseQty: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) item.qty += 1;
                saveCartToStorage(state.items);
            },

            //decreaseQuantity: called when user clicks the '-' button
            //if quantity goes to 0, remove the item from the cart
            decreaseQty: (state, action) => {
                const item = state.items.find(item => item.id === action.payload);
                if (item) {
                    if (item.qty ===1 ) {
                        //Remove instead of going to 0
                        state.items = state.items.filter(i => i.id !== action.payload);
                    } else {
                        item.qty -= 1;
                    }
                }
                    saveCartToStorage(state.items);
                },
                //clearCart: called after successful checkout to empty the cart
                clearCart: (state) => {
                    state.items = [];
                    localStorage.removeItem('cart'); //clear from localStorage as well
                },
            },
        });

        //Export actions so components can dispatch them
        export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
        //SELECTORS
        //Selectors are functions that derive data from the Redux State
        //Components call these with useSelector to get the data they need from the store

        //Total number of items in the cart (sum of quantities) - shown on cart icon badge
        export const selectCartTotalQty = (state) => 
    state.cart.items.reduce((total, item) => total + item.qty, 0);

        //Total price shown in Bag sidebar, Cart page, and Order Summary 
        export const selectCartTotalPrice = (state) =>
    state.cart.items.reduce((total, item) => total + item.price * item.qty, 0);

        //All items array (used in Cart page and Checkout page)
        export const selectCartItems = (state) => state.cart.items;

        export default cartSlice.reducer;