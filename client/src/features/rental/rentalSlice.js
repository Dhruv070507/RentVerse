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


// getting all rentals created by the logged-in user

export const getMyRentals = createAsyncThunk(
    "rental/getMyRentals",
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/rental/myRentals"
            );

            return response.data.data;

        } catch (error) {
            console.log(
                "Get rentals error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch rentals"
            );
        }
    }
);

// cancelling a rental request

export const cancelRental = createAsyncThunk(
    "rental/cancelRental",
    async (rentalId, { rejectWithValue }) => {

        try {

            const response = await api.put(
                `/rental/${rentalId}/cancel`
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Cancel rental error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to cancel rental"
            );
        }
    }
);

// getting rental requests for the logged-in user's equipment

export const getRentalRequests = createAsyncThunk(
    "rental/getRentalRequests",
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/rental/requests"
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Get rental requests error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch rental requests"
            );
        }
    }
);


// approving or rejecting a rental request

export const updateRentalStatus = createAsyncThunk(
    "rental/updateRentalStatus",
    async ({ rentalId, status }, { rejectWithValue }) => {

        try {

            const response = await api.put(
                `/rental/${rentalId}`,
                { status }
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Update rental status error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update rental status"
            );
        }
    }
);


const initialState = {
    rental: null,
    rentals: [],
    rentalRequests: [],
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
        })


        // when the user's rentals are being fetched
        .addCase(getMyRentals.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        // when the user's rentals are successfully fetched
        .addCase(getMyRentals.fulfilled, (state, action) => {
            state.loading = false;
            state.rentals = action.payload;
        })

        // when there is an error while fetching rentals
        .addCase(getMyRentals.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        // when a rental is being cancelled
        .addCase(cancelRental.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        // when the rental is successfully cancelled
        // updating only the cancelled rental while keeping the other rentals unchanged

        .addCase(cancelRental.fulfilled, (state, action) => {
            state.loading = false;

            state.rentals = state.rentals.map((rental) =>
                rental._id === action.payload._id
                    ? action.payload
                    : rental
            );
        })

        // when there is an error while cancelling the rental
        .addCase(cancelRental.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        // when rental requests are being fetched
        .addCase(getRentalRequests.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        // when rental requests are successfully fetched
        .addCase(getRentalRequests.fulfilled, (state, action) => {
            state.loading = false;
            state.rentalRequests = action.payload;
        })

        // when there is an error while fetching rental requests
        .addCase(getRentalRequests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // when rental status is being updated
        .addCase(updateRentalStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        // when rental status is successfully updated
        .addCase(updateRentalStatus.fulfilled, (state, action) => {
            state.loading = false;

            state.rentalRequests = state.rentalRequests.map((request) =>
                request._id === action.payload._id
                    ? action.payload
                    : request
            );
        })

        // when there is an error updating rental status
        .addCase(updateRentalStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }); 
    } 
    }
);


export default rentalSlice.reducer;