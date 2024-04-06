import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getCard = createAsyncThunk(
    'items/getItems',
    async(id) => {
        const res = await axios(`http://localhost:7070/api/items/${id}`)
        return res.data
    }
)

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        card: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getCard.pending, (state) => {
            state.isLoading = true
            state.card = [];
            state.error = null
        });
        builder.addCase(getCard.fulfilled, (state, { payload }) => {
            state.card = payload;
            state.isLoading = false;
            state.error = null
        })
        builder.addCase(getCard.rejected, (state, { error }) => {
            state.isLoading = false
            state.card = []
            state.error = error
        })
    }
})

export default cardSlice.reducer