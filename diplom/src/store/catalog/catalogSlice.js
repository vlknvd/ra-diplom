import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getItems = createAsyncThunk(
    'catalog/getItems',
    async({categoryId, q}) => {
        categoryId = categoryId ? categoryId : 0
        q = q ? q : ''
        const params = new URLSearchParams({
            categoryId: `${categoryId}`,
            q: `${q}`
        });
        const res = await axios(`http://localhost:7070/api/items?${params}`)
        return res.data
    }
)

export const getLoadMore = createAsyncThunk(
    'catalog/getLoadMore',
    async({categoryId, offset, q}) => {
        categoryId = categoryId ? categoryId : 0
        offset = offset ? offset : 0
        q = q ? q : ''
        const params = new URLSearchParams({
            categoryId: `${categoryId}`,
            offset: `${offset}`,
            q: `${q}`
        });
        const res = await axios(`http://localhost:7070/api/items?${params}`)
        return res.data
    }
)

const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        moreLoading: false,
        moreVisible: false,
        moreError: false
    },
    extraReducers: (builder) => {
        builder.addCase(getItems.pending , (state) => {
            state.isLoading = true;
            state.error = null;
            state.moreVisible = false;
            state.items = [];
        });
        builder.addCase(getItems.fulfilled , (state, { payload }) => {
            state.items = payload;
            state.isLoading = false;
            state.moreVisible = (state.items.length < 6 || !state.items.length) ? false : true;
        });
        builder.addCase(getItems.rejected , (state, { error }) => {
            state.error = error;
            state.items = [];
            state.isLoading = false;
            state.moreVisible = false;
        }),
        builder.addCase(getLoadMore.pending,  (state) => {
            state.moreLoading = true;
            state.moreError = null;
            state.moreVisible = false;
        }),
        builder.addCase(getLoadMore.fulfilled,  (state, { payload }) => {
            state.items = [...state.items, ...payload];
            state.moreLoading = false;
            state.moreVisible = (!payload.length || payload.length < 6) ? false : true;
        }),
        builder.addCase(getLoadMore.rejected,  (state, { error }) => {
            state.moreError = error;
            state.moreVisible = false;
        });
    }
})

export default catalogSlice.reducer