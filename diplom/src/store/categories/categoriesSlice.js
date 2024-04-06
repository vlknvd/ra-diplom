import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async() => {
        const res = await axios('http://localhost:7070/api/categories')
        return res.data
    }
)
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        current: 0,
        list: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        changeCategories: ( state, { payload }) => {
            let newList = [...state.list]
            if(payload === 0) {
                state.current = 0
            } else {
            const found = state.list.find(({ id }) => id === payload)
            if(found) {
                newList = newList.filter((item) => {
                    if(item.id === payload){
                        return item
                    }
                })
            }
            state.current = newList[0]
            }
    }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
            state.list = [];
            state.error = null
        });
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(getCategories.rejected, (state, { error }) => {
            state.list = [];
            state.error = error;
            state.isLoading = false;
        })
    }
})

export const { changeCategories } = categoriesSlice.actions

export default categoriesSlice.reducer