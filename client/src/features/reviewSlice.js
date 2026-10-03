import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";


/* =========================================================
   ADD REVIEW
========================================================= */

export const addReview = createAsyncThunk(
    "review/addReview",

    async (
        { rentalId, rating, comment },
        { rejectWithValue }
    ) => {

        try {

            const response = await api.post(
                "/reviews/add",
                {
                    rentalId,
                    rating,
                    comment
                }
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to add review"
            );

        }

    }
);


/* =========================================================
   GET REVIEWS BY EQUIPMENT
========================================================= */

export const getReviewsByEquipment = createAsyncThunk(
    "review/getReviewsByEquipment",

    async (
        equipmentId,
        { rejectWithValue }
    ) => {

        try {

            const response = await api.get(
                `/reviews/equipment/${equipmentId}`
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch reviews"
            );

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {

    reviews: [],

    loading: false,

    submitting: false,

    error: null,

    success: false

};


/* =========================================================
   SLICE
========================================================= */

const reviewSlice = createSlice({

    name: "review",

    initialState,

    reducers: {

        clearReviewState: (state) => {

            state.error = null;
            state.success = false;

        }

    },


    extraReducers: (builder) => {

        builder


            /* =============================================
               ADD REVIEW
            ============================================= */

            .addCase(
                addReview.pending,
                (state) => {

                    state.submitting = true;
                    state.error = null;
                    state.success = false;

                }
            )

            .addCase(
                addReview.fulfilled,
                (state, action) => {

                    state.submitting = false;

                    state.success = true;

                    state.error = null;

                    state.reviews.unshift(
                        action.payload
                    );

                }
            )

            .addCase(
                addReview.rejected,
                (state, action) => {

                    state.submitting = false;

                    state.error =
                        action.payload;

                }
            )


            /* =============================================
               GET REVIEWS
            ============================================= */

            .addCase(
                getReviewsByEquipment.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getReviewsByEquipment.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.reviews =
                        action.payload;

                }
            )

            .addCase(
                getReviewsByEquipment.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    }

});


export const {
    clearReviewState
} = reviewSlice.actions;


export default reviewSlice.reducer;