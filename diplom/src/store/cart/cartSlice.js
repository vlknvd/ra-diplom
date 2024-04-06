import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        isLoading: false,
    },
    reducers: {
        addItemToCart: (state,{ payload }) => {
            if (localStorage.length === 0) {
                localStorage.setItem('cart', JSON.stringify([payload]));
                state.cart = [payload]
            }
            const cart = JSON.parse(localStorage.getItem('cart'));
            let item = cart.find((item) => item.id === payload.id)
            item ? cart.map((el) => el === item ? el.count += item.count : el) : 
            cart.push(payload)
            localStorage.setItem('cart', JSON.stringify(cart))
            state.cart = cart
        },
        removeFromCart: (state, { payload }) => {
            const cart = JSON.parse(localStorage.getItem('cart')).filter(prod => prod.id !== payload);
            localStorage.setItem('cart', JSON.stringify(cart));
            state.cart = cart
        },
        clearCart: (state) => {
            localStorage.clear()
            state.cart = []
        }
    }
})

export const { addItemToCart } = cartSlice.actions
export const { removeFromCart } = cartSlice.actions
export const { clearCart } = cartSlice.actions

export default cartSlice.reducer