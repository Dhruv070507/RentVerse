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


export const getUnassignedDeliveries = createAsyncThunk(
    "admin/getUnassignedDeliveries",

    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/admin/deliveries/unassigned"
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch deliveries"
            );
        }
    }
);


export const getDeliveryAgents = createAsyncThunk(
    "admin/getDeliveryAgents",

    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/admin/delivery-agents"
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch delivery agents"
            );
        }
    }
);


export const assignDeliveryAgent = createAsyncThunk(
    "admin/assignDeliveryAgent",

    async (
        { deliveryId, agentId },
        { rejectWithValue }
    ) => {

        try {

            const response = await api.patch(
                `/deliveries/${deliveryId}/assign-delivery`,
                {
                    agentId
                }
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to assign delivery agent"
            );
        }
    }
);


export const getAllRentals = createAsyncThunk(
    "admin/getAllRentals",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/rentals");

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch rentals"
            );
        }
    }
);


export const getAllDeliveries = createAsyncThunk(
    "admin/getAllDeliveries",

    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/admin/deliveries"
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch deliveries"
            );
        }
    }
);


export const getAllEquipment = createAsyncThunk(
    "admin/getAllEquipment",

    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/admin/equipment"
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch equipment"
            );
        }
    }
);


const initialState = {
    dashboard: null,
    users: [],
    equipment: [],
    rentals: [],
    deliveries: [],
    unassignedDeliveries: [],
    deliveryAgents: [],
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
            )

            .addCase(
                getUnassignedDeliveries.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getUnassignedDeliveries.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.unassignedDeliveries = action.payload;
                }
            )

            .addCase(
                getUnassignedDeliveries.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )


            .addCase(
                getDeliveryAgents.fulfilled,
                (state, action) => {
                    state.deliveryAgents = action.payload;
                }
            )


            .addCase(
                assignDeliveryAgent.fulfilled,
                (state, action) => {

                    state.unassignedDeliveries =
                        state.unassignedDeliveries.filter(
                            (delivery) =>
                                delivery._id !== action.payload._id
                        );
                }
            )


            .addCase(
                getAllRentals.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAllRentals.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.rentals = action.payload;
                }
            )

            .addCase(
                getAllRentals.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(
                getAllDeliveries.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAllDeliveries.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.deliveries = action.payload;
                }
            )

            .addCase(
                getAllDeliveries.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            .addCase(
                getAllEquipment.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                getAllEquipment.fulfilled,
                (state, action) => {

                    state.loading = false;
                    state.equipment = action.payload;
                }
            )

            .addCase(
                getAllEquipment.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload;
                }
            )
    }
});


export default adminSlice.reducer;