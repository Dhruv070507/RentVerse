import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

// ===============================
// GET MY DELIVERIES
// ===============================
export const getMyDeliveries = createAsyncThunk(
    "delivery/getMyDeliveries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/deliveries");

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch deliveries"
            );
        }
    }
);


// ===============================
// GET ALL DELIVERIES - ADMIN
// ===============================

export const getAllDeliveries = createAsyncThunk(
    "delivery/getAllDeliveries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/deliveries/admin");

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch all deliveries"
            );
        }
    }
);


// ===============================
// GET DELIVERY BY ID
// ===============================
export const getDeliveryById = createAsyncThunk(
    "delivery/getDeliveryById",
    async (deliveryId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/deliveries/${deliveryId}`);

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch delivery"
            );
        }
    }
);


// ===============================
// CREATE DELIVERY
// ===============================
export const createDelivery = createAsyncThunk(
    "delivery/createDelivery",
    async (rentalId, { rejectWithValue }) => {
        try {
            const response = await api.post("/deliveries", {
                rentalId,
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create delivery"
            );
        }
    }
);


// ===============================
// ASSIGN DELIVERY AGENT
// ===============================
export const assignDeliveryAgent = createAsyncThunk(
    "delivery/assignDeliveryAgent",
    async ({ deliveryId, agentId }, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/deliveries/${deliveryId}/assign-delivery`,
                { agentId }
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


// ===============================
// START DELIVERY
// ===============================
export const startDelivery = createAsyncThunk(
    "delivery/startDelivery",
    async (deliveryId, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/deliveries/${deliveryId}/start`
            );

            return response.data.data;
        } catch (error) {
            console.log("START DELIVERY ERROR:", error.response?.data);
            console.log("STATUS:", error.response?.status);

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to start delivery"
            );
        }
    }
);


// ===============================
// GENERATE DELIVERY OTP
// ===============================
export const generateDeliveryOtp = createAsyncThunk(
    "delivery/generateDeliveryOtp",
    async (deliveryId, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `/deliveries/${deliveryId}/delivery-otp`
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to generate delivery OTP"
            );
        }
    }
);


// ===============================
// COMPLETE DELIVERY
// ===============================
export const completeDelivery = createAsyncThunk(
    "delivery/completeDelivery",
    async ({ deliveryId, otp }, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/deliveries/${deliveryId}/complete`,
                { otp }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to complete delivery"
            );
        }
    }
);


// ===============================
// ASSIGN RETURN AGENT
// ===============================
export const assignReturnAgent = createAsyncThunk(
    "delivery/assignReturnAgent",
    async ({ deliveryId, agentId }, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/deliveries/${deliveryId}/assign-return`,
                { agentId }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to assign return agent"
            );
        }
    }
);


// ===============================
// START RETURN
// ===============================
export const startReturn = createAsyncThunk(
    "delivery/startReturn",
    async (deliveryId, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/deliveries/${deliveryId}/return/start`
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to start return"
            );
        }
    }
);


// ===============================
// GENERATE RETURN OTP
// ===============================
export const generateReturnOtp = createAsyncThunk(
    "delivery/generateReturnOtp",
    async (deliveryId, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `/deliveries/${deliveryId}/return-otp`
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to generate return OTP"
            );
        }
    }
);


// ===============================
// COMPLETE RETURN
// ===============================
export const completeReturn = createAsyncThunk(
    "delivery/completeReturn",
    async ({ deliveryId, otp }, { rejectWithValue }) => {
        try {
            const response = await api.patch(
                `/deliveries/${deliveryId}/return/complete`,
                { otp }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to complete return"
            );
        }
    }
);


// ===============================
// INITIAL STATE
// ===============================
const initialState = {
    deliveries: [],
    selectedDelivery: null,

    loading: false,
    error: null,

    otp: null,
};


// ===============================
// SLICE
// ===============================
const deliverySlice = createSlice({
    name: "delivery",

    initialState,

    reducers: {
        clearDeliveryError: (state) => {
            state.error = null;
        },

        clearSelectedDelivery: (state) => {
            state.selectedDelivery = null;
        },

        clearOtp: (state) => {
            state.otp = null;
        },

        clearDeliveryState: (state) => {
            state.deliveries = [];
            state.selectedDelivery = null;
            state.loading = false;
            state.error = null;
            state.otp = null;
        }
    },

    extraReducers: (builder) => {

        builder

            // ===============================
            // GET MY DELIVERIES
            // ===============================

            .addCase(getMyDeliveries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getMyDeliveries.fulfilled, (state, action) => {
                state.loading = false;
                state.deliveries = action.payload;
            })

            .addCase(getMyDeliveries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============================
            // GET ALL DELIVERIES - ADMIN
            // ===============================

            .addCase(getAllDeliveries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllDeliveries.fulfilled, (state, action) => {
                state.loading = false;
                state.deliveries = action.payload;
            })

            .addCase(getAllDeliveries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ===============================
            // GET DELIVERY BY ID
            // ===============================

            .addCase(getDeliveryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getDeliveryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedDelivery = action.payload;
            })

            .addCase(getDeliveryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // ===============================
            // CREATE DELIVERY
            // ===============================

            .addCase(createDelivery.fulfilled, (state, action) => {
                state.deliveries.unshift(action.payload);
            })


            // ===============================
            // ASSIGN DELIVERY
            // ===============================

            .addCase(assignDeliveryAgent.fulfilled, (state, action) => {
                state.selectedDelivery = action.payload;
            })


            // ===============================
            // START DELIVERY
            // ===============================

            .addCase(startDelivery.fulfilled, (state, action) => {
                state.selectedDelivery = action.payload;

                const index = state.deliveries.findIndex(
                    (delivery) => delivery._id === action.payload._id
                );

                if (index !== -1) {
                    state.deliveries[index] = action.payload;
                }
            })


            // ===============================
            // DELIVERY OTP
            // ===============================

            .addCase(generateDeliveryOtp.fulfilled, (state, action) => {
                state.otp = action.payload.otp;
            })


            // ===============================
            // COMPLETE DELIVERY
            // ===============================

            .addCase(completeDelivery.fulfilled, (state, action) => {
                state.selectedDelivery = action.payload;

                const index = state.deliveries.findIndex(
                    (delivery) => delivery._id === action.payload._id
                );

                if (index !== -1) {
                    state.deliveries[index] = action.payload;
                }
            })


            // ===============================
            // ASSIGN RETURN
            // ===============================

            .addCase(assignReturnAgent.fulfilled, (state, action) => {
                state.selectedDelivery = action.payload;
            })


            // ===============================
            // START RETURN
            // ===============================

            .addCase(startReturn.fulfilled, (state, action) => {
                state.selectedDelivery = action.payload;

                const index = state.deliveries.findIndex(
                    (delivery) => delivery._id === action.payload._id
                );

                if (index !== -1) {
                    state.deliveries[index] = action.payload;
                }
            })


            // ===============================
            // RETURN OTP
            // ===============================

            .addCase(generateReturnOtp.fulfilled, (state, action) => {
                state.otp = action.payload.otp;
            })


            // ===============================
            // COMPLETE RETURN
            // ===============================

            .addCase(completeReturn.fulfilled, (state, action) => {
                state.selectedDelivery = action.payload;

                const index = state.deliveries.findIndex(
                    (delivery) => delivery._id === action.payload._id
                );

                if (index !== -1) {
                    state.deliveries[index] = action.payload;
                }
            });


        // ===============================
        // GLOBAL ERRORS
        // ===============================

        builder
            .addCase(createDelivery.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(assignDeliveryAgent.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(startDelivery.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(generateDeliveryOtp.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(completeDelivery.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(assignReturnAgent.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(startReturn.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(generateReturnOtp.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(completeReturn.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const {
    clearDeliveryError,
    clearSelectedDelivery,
    clearOtp,
    clearDeliveryState
} = deliverySlice.actions;

export default deliverySlice.reducer;