import { createSlice } from '@reduxjs/toolkit';

export const userAvatarSlice = createSlice({
    name: 'userAvatar',
    initialState: {
        fileUri: ''
    },
    reducers: {
        setUserAvatar: (state, data) => {
            state.fileUri = data.payload;

        }
    }
});

export const { setUserAvatar } = userAvatarSlice.actions;

export default userAvatarSlice.reducer;
