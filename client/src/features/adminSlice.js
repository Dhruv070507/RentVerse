import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";


export const getAdminDashboard = createAsyncThunk(
    "admin/getAdminDashboard",
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/admin/dashboard"
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch admin dashboard"
            );
        }
    }
);


export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/admin/users"
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch users"
            );
        }
    }
);


const initialState = {
    dashboard: null,
    users: [],
    loading: false,
    error: null
};


const adminSlice = createSlice({
    name: "admin",
    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                getAdminDashboard.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAdminDashboard.fulfilled,
                (state, action) => {

                    state.loading = false;
                    state.dashboard = action.payload;
                }
            )

            .addCase(
                getAdminDashboard.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(
                getAllUsers.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAllUsers.fulfilled,
                (state, action) => {

                    state.loading = false;
                    state.users = action.payload;
                }
            )

            .addCase(
                getAllUsers.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
});


export default adminSlice.reducer;