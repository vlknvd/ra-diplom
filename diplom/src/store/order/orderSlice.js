import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async(payload) => {
        const response = await fetch('http://localhost:7070/api/order', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error('Что-то пошло не так...');
        }
        return response.status
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: [],
        isLoading: false,
        error: null
    },
    reducers: {
        addOrder: (state, { payload }) => {
            state.order = payload
        },
        resetForm: (state) => {
            state.order = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.order = [];
            state.isLoading = true;
            state.error = null;
        }),
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.order = payload
            state.isLoading = false;
            state.error = null;
        }),
        builder.addCase(createOrder.rejected, (state, { error }) => {
            state.order = [];
            state.isLoading = false;
            state.error = error
        })
    }
})

export const { resetForm } = orderSlice.actions
export const { addOrder } = orderSlice.actions

export default orderSlice.reducer