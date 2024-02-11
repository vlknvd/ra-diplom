import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async(_, setError, thunkAPI) => {
        try{
            const res = await axios('http://localhost:7070/api/categories')
            return res.data
        } catch (err) {
            setError(err)
            return thunkAPI.rejectWithValue(err)
        }
    }

)
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        current: 0,
        list: [],
        isLoading: false
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
            state.isLoading = true
        });
        builder.addCase(getCategories.fulfilled, (state, { payload }) => {
            state.list = payload;
            state.isLoading = false
        })
    }
})

export const { changeCategories } = categoriesSlice.actions

export default categoriesSlice.reducer