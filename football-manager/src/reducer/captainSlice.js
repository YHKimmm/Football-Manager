import { createSlice } from "@reduxjs/toolkit";

export const captainSlice = createSlice({
    name: "captain",
    initialState: {
        captains: JSON.parse(localStorage.getItem('captains')) || {},
        isCaptain: !!localStorage.getItem('captains'),
    },
    reducers: {
        setCaptain: (state, action) => {
            const { teamId, ...captain } = action.payload;
            console.log('captain', captain);
            console.log('teamId', teamId);
            // create new object with key of teamId and value of captain
            const newCaptains = { ...state.captains, [teamId]: captain };
            console.log('newCaptains', newCaptains);
            localStorage.setItem('captains', JSON.stringify(newCaptains));
            return { ...state, captains: newCaptains, isCaptain: true };
        },
        deleteCaptain: (state, action) => {
            const teamId = action.payload;
            const newCaptains = { ...state.captains };
            console.log('newCaptains', newCaptains);
            console.log('teamId', teamId);
            delete newCaptains[teamId];
            localStorage.setItem('captains', JSON.stringify(newCaptains));
            return { ...state, captains: newCaptains, isCaptain: false };
        }
    },
});

export const { setCaptain, deleteCaptain } = captainSlice.actions;

export default captainSlice.reducer;