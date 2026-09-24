import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";


// Creating a payment for an approved rental

export const createPayment = createAsyncThunk(
    "payment/createPayment",
    async ({ rentalId, paymentMethod }, { rejectWithValue }) => {

        try {

            const response = await api.post(
                "/payment/create",
                {
                    rentalId,
                    paymentMethod
                }
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Create payment error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create payment"
            );
        }
    }
);


// Getting all payments made by the logged-in user

export const getMyPayments = createAsyncThunk(
    "payment/getMyPayments",
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/payment/my-payments"
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Get payments error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch payments"
            );
        }
    }
);


// Updating payment status

export const updatePaymentStatus = createAsyncThunk(
    "payment/updatePaymentStatus",
    async ({ paymentId, status }, { rejectWithValue }) => {

        try {

            const response = await api.put(
                `/payment/${paymentId}`,
                { status }
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Update payment error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update payment"
            );
        }
    }
);


const initialState = {

    payment: null,

    payments: [],

    loading: false,

    error: null
};


const paymentSlice = createSlice({

    name: "payment",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // Creating payment
            .addCase(createPayment.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(createPayment.fulfilled, (state, action) => {

                state.loading = false;
                state.payment = action.payload;

            })

            .addCase(createPayment.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            })


            // Getting user's payments
            .addCase(getMyPayments.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(getMyPayments.fulfilled, (state, action) => {

                state.loading = false;
                state.payments = action.payload;

            })

            .addCase(getMyPayments.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            })


            // Updating payment status
            .addCase(updatePaymentStatus.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(updatePaymentStatus.fulfilled, (state, action) => {

                state.loading = false;

                state.payment = action.payload;

                state.payments = state.payments.map((payment) =>
                    payment._id === action.payload._id
                        ? action.payload
                        : payment
                );

            })

            .addCase(updatePaymentStatus.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            });

    }
});


export default paymentSlice.reducer;