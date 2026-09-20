// for storing the rental data which comes from the backend

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";


// creating a new rental request

export const createRental = createAsyncThunk(
    "rental/createRental",
    async (rentalData, { rejectWithValue }) => {

        try {

            const response = await api.post(
                "/rental/rent",
                rentalData
            );

            return response.data.data;

        } catch (error) {
            console.log("Rental error:", error.response?.data);

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create rental"
            );

        }
    }
);


const initialState = {
    rental: null,
    loading: false,
    error: null
};


const rentalSlice = createSlice({
    name: "rental",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // when the rental request is being sent
            .addCase(createRental.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // when the rental is successfully created
            .addCase(createRental.fulfilled, (state, action) => {
                state.loading = false;
                state.rental = action.payload;
            })

            // when there is an error while creating the rental
            .addCase(createRental.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default rentalSlice.reducer;