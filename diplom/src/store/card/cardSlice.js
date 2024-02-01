import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getCard = createAsyncThunk(
    'items/getItems',
    async({id}, thunkAPI) => {
        try{
            const res = await axios(`http://localhost:7070/api/items/${id}`)
            return res.data
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        card: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getCard.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getCard.fulfilled, (state, { payload }) => {
            state.card = payload;
            state.isLoading = false;
        })
    }
})

export default cardSlice.reducer