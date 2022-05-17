import { createSlice } from '@reduxjs/toolkit';

export const noteIdSlice = createSlice({
    name: 'noteId',
    initialState: {
        value: ''
    },
    reducers: {
        setNoteId: (state, value) => {
            state.value = value;
        }
    }
});

export const { setNoteId } = noteIdSlice.actions;

export default noteIdSlice.reducer;
