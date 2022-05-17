import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
    name: 'commentData',
    initialState: {
        _id: '',
        authorName: '',
        authorSurname: '',
        content: '',
        noteId: '',
        rating: '',
        creationDate: ''
    },
    reducers: {
        setCommentData: (state, data) => {
            console.log(data);
            state._id = data.payload._id;
            state.authorName = data.payload.authorName;
            state.authorSurname = data.payload.authorSurname;
            state.content = data.payload.content;
            state.noteId = data.payload.noteId;
            state.rating = data.payload.rating;
            state.creationDate = data.payload.creationDate;
        }
    }
});

export const { setCommentData } = commentSlice.actions;

export default commentSlice.reducer;
