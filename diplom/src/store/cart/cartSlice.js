import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        isLoading: false,
    },
    reducers: {
        addItemToCart: (state, { payload }) => {
            if (localStorage.length === 0) {
                localStorage.setItem('cart', JSON.stringify([payload]));
            } else {
              const cart = JSON.parse(localStorage.getItem('cart'));
              cart.forEach(elem => {
                if (elem.id === payload.id && elem.size === payload.size) {
                  elem.count += payload.count;
                }
              })
              state.cart = [payload];
              localStorage.setItem('cart', JSON.stringify([payload]));  
            }    
        },
        removeFromCart: (state, { payload }) => {
            const cart = JSON.parse(localStorage.getItem('cart')).filter(prod => prod.id !== payload);
            localStorage.setItem('cart', JSON.stringify(cart));
            state.cart = null
        } 
    }
})

export const { addItemToCart } = cartSlice.actions
export const { removeFromCart } = cartSlice.actions

export default cartSlice.reducer