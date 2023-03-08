import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        username: sessionStorage.getItem('username'),
        isAuthenticated: !!sessionStorage.getItem('token'),
    },
    reducers: {
        login: (state, action) => {
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('username', action.payload.username);
            return { ...state, username: action.payload.username, isAuthenticated: true };
        },
        logout: (state) => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            return { ...state, username: null, isAuthenticated: false };
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;