import { createSlice } from "@reduxjs/toolkit";

export const captainSlice = createSlice({
    name: "captain",
    initialState: {
        captain: JSON.parse(localStorage.getItem('captain')),
        isCaptain: !!localStorage.getItem('captain'),
    },
    reducers: {
        setCaptain: (state, action) => {
            localStorage.setItem('captain', JSON.stringify(action.payload));
            return { ...state, captain: action.payload, isCaptain: true };
        }
    },
});

export const { setCaptain } = captainSlice.actions;

export default captainSlice.reducer;