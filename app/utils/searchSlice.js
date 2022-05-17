import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: ''
    },
    reducers: {
        setSearch: (state, value) => {
            state.value = value;
            console.log(state.value);
        }
    }
});

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
