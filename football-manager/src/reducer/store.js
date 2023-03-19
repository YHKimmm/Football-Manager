import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import captainSlice from "./captainSlice";
import seasonSlice from "./seasonSlice";

export default configureStore({
    reducer: {
        user: authSlice,
        captain: captainSlice,
        season: seasonSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});
