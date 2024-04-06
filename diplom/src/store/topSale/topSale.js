import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getTopSale = createAsyncThunk(
    'topSale/getTopSale',
    async() => {
        const res = await axios('http://localhost:7070/api/top-sales')
        return res.data
    }
)

const topSaleSlice = createSlice({
    name: 'top-sales',
    initialState: {
        list: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getTopSale.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.list = [];
        });
        builder.addCase(getTopSale.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.list = payload;
            state.error = null;
        });
        builder.addCase(getTopSale.rejected, (state, { error }) => {
            state.isLoading = false;
            state.list = [];
            state.error = error;
        })
    }
})

export default topSaleSlice.reducer