import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = { value: '', open: false };

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    change(state, action) {
      state.value = action.payload;
    },
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;