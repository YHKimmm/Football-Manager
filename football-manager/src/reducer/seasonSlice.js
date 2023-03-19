import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    season: "2015",
};

export const seasonSlice = createSlice({
    name: "season",
    initialState,
    reducers: {
        setSeason: (state, action) => {
            state.season = action.payload;
        },
    },
});

export const { setSeason } = seasonSlice.actions;

export default seasonSlice.reducer