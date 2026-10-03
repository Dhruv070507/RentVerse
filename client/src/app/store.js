/* store is the central place where the state of the
    application is stored */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import equipmentReducer from "../features/equipmentSlice"
import rentalReducer from "../features/rentalSlice"
import paymentReducer from "../features/paymentSlice"
import deliveryReducer from "../features/deliverySlice"
import adminReducer from "../features/adminSlice"
import reviewReducer from "../features/reviewSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        equipment: equipmentReducer,
        rental: rentalReducer,
        payment: paymentReducer,
        delivery: deliveryReducer,
        admin: adminReducer,
        review: reviewReducer,
    }
});