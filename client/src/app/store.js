/* store is the central place where the state of the
    application is stored */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import equipmentReducer from "../features/equipment/equipmentSlice"
import rentalReducer from "../features/rental/rentalSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        equipment: equipmentReducer,
        rental: rentalReducer
    }
});