import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getTopSale = createAsyncThunk(
    'topSale/getTopSale',
    async(_, setError, thunkAPI) => {
        try{
            const res = await axios('http://localhost:7070/api/top-sales')
            return res.data
        } catch (err) {
            setError(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const topSaleSlice = createSlice({
    name: 'top-sales',
    initialState: {
        list: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getTopSale.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getTopSale.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        })
    }
})

export default topSaleSlice.reducer