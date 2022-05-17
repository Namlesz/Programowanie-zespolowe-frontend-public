import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'userData',
    initialState: {
        _id: '',
        nickname: '',
        name: '',
        surname: '',
        email: '',
        major: '',
        school: '',
        rating: ''
    },
    reducers: {
        setUserData: (state, data) => {
            state._id = data.payload._id;
            state.name = data.payload.name;
            state.surname = data.payload.surname;
            state.email = data.payload.email;
            state.major = data.payload.major;
            state.school = data.payload.school;
            state.nickname = data.payload.nickname;
            state.rating = data.payload.rating;
        },
        setNickname: (state, data) => {
            state.nickname = data.payload;
        },
        setUserSchool: (state, data) => {
            console.log(data);
            state.school = data.payload;
        },
        setUserMajor: (state, data) => {
            console.log(data);
            state.major = data.payload;
        }
    }
});

export const { setUserData, setNickname, setUserSchool, setUserMajor } = userSlice.actions;

export default userSlice.reducer;
