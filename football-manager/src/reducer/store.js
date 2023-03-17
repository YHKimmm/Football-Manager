import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import captainSlice from "./captainSlice";

export default configureStore({
    reducer: {
        user: authSlice,
        captain: captainSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});
