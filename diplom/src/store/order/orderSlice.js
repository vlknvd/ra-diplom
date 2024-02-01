import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async(payload, thunkAPI) => {
        // try{
        //     const res = await axios.post('http://localhost:7070/api/order', {payload})
        //     return res.data
        // } catch (err) {
        //     console.log(err);
        //     return thunkAPI.rejectWithValue(err)
        // }
        try {
            const response = await fetch('http://localhost:7070/api/order', {
                method: 'POST', 
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json;charset=utf-8'
                }
            });
            if (!response.ok) {
              throw new Error('Что-то пошло не так...');
            }
          } catch (error) {
            console.log(error.message);
          }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        owner: 0,
        order: 0,
        isLoading: false,
    },
    reducers: {
        changeOwner: (state, { payload }) => {
            state.owner = payload
        },
        addOrder: (state, payload) => {
            // state.order = localStorage.getItem('cart') || []
            state.order = payload
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.owner = payload;
            state.order = localStorage.getItem('cart')
        })
    }
})

export const { changeOwner } = orderSlice.actions
export const { addOrder } = orderSlice.actions

export default orderSlice.reducer