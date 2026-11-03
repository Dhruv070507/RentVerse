
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const createCategoryRequest = createAsyncThunk(
    "categoryRequest/createCategoryRequest",
    async (requestData, { rejectWithValue }) => {
        try {
            const response = await api.post("/category-requests", requestData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to submit category request"
            );
        }
    }
);

export const fetchMyCategoryRequests = createAsyncThunk(
    "categoryRequest/fetchMyCategoryRequests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/category-requests/my-requests");
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch category requests"
            );
        }
    }
);

const initialState = {
    requests: [],
    loading: false,
    submitting: false,
    error: null,
    success: false
};

const categoryRequestSlice = createSlice({
    name: "categoryRequest",
    initialState,
    reducers: {
        clearCategoryRequestStatus: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategoryRequest.pending, (state) => {
                state.submitting = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createCategoryRequest.fulfilled, (state, action) => {
                state.submitting = false;
                state.success = true;
                state.requests.unshift(action.payload);
            })
            .addCase(createCategoryRequest.rejected, (state, action) => {
                state.submitting = false;
                state.error = action.payload;
            })
            .addCase(fetchMyCategoryRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyCategoryRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload;
            })
            .addCase(fetchMyCategoryRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCategoryRequestStatus } = categoryRequestSlice.actions;
export default categoryRequestSlice.reducer;
