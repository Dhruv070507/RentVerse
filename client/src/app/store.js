/* store is the central place where the state of the
    application is stored */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});