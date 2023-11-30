import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: undefined,
    token: undefined,
    verified: undefined,
    email: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) =>  {
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.verified = action.payload.verified;
        },
        logout: (state, action) =>  {
            state.name = undefined;
            state.token = undefined;
            state.verified = undefined;
            state.email = undefined;
            localStorage.clear('auth');
        },
        setEmail: (state,action) => {
            state.email = action.payload;
        }
    },
});

export default authSlice;
export const {login,logout, setEmail} = authSlice.actions;