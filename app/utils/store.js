import { configureStore } from '@reduxjs/toolkit';
import noteIdReducer from './noteIdSlice';
import userDataReducer from './userSlice';
import userAvatarReducer from './userAvatarSlice';
import commentDataReducer from './commentSlice';
import searchReducer from './searchSlice';

export default configureStore({
    reducer: {
        noteId: noteIdReducer,
        userData: userDataReducer,
        userAvatar: userAvatarReducer,
        commentData: commentDataReducer,
        search: searchReducer
    }
});
