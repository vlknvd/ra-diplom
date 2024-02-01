import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getItems = createAsyncThunk(
    'items/getItems',
    async(_, thunkAPI) => {
        try{
            const res = await axios('http://localhost:7070/api/items')
            return res.data
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    },
)

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        list: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getItems.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        })
    }
})

export default itemsSlice.reducer