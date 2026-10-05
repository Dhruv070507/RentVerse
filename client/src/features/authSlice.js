import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { clearRentalState } from "./rentalSlice";
import { clearPaymentState } from "./paymentSlice";
import { clearDeliveryState } from "./deliverySlice";
import { clearNotificationState } from "./notificationSlice";


// Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post("/users/login", credentials);

            return response.data.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);


// Forgot Password
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/users/forgot-password",
                { email }
            );

            return response.data.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to send password reset link"
            );
        }
    }
);


// Reset Password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `/users/reset-password/${token}`,
                { password }
            );

            return response.data.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to reset password"
            );
        }
    }
);


export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await api.post("/users/logout");

            dispatch(clearRentalState());
            dispatch(clearPaymentState());
            dispatch(clearDeliveryState());
            dispatch(clearNotificationState());

            return true;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);


const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),

    loading: false,
    error: null,

    forgotPasswordLoading: false,
    forgotPasswordError: null,
    forgotPasswordMessage: null,

    resetPasswordLoading: false,
    resetPasswordError: null,
    resetPasswordMessage: null,
};


const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {

                state.loading = false;
                state.error = null;

                const {
                    user,
                    accessToken,
                    refreshToken
                } = action.payload;

                state.user = user;
                state.accessToken = accessToken;
                state.refreshToken = refreshToken;
                state.isAuthenticated = true;

                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );

                localStorage.setItem(
                    "accessToken",
                    accessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    refreshToken
                );
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // Forgot Password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordLoading = true;
                state.forgotPasswordError = null;
                state.forgotPasswordMessage = null;
            })

            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.forgotPasswordLoading = false;
                state.forgotPasswordError = null;
                state.forgotPasswordMessage =
                    action.payload?.message ||
                    "Password reset link sent successfully";
            })

            .addCase(forgotPassword.rejected, (state, action) => {
                state.forgotPasswordLoading = false;
                state.forgotPasswordError = action.payload;
                state.forgotPasswordMessage = null;
            });


        // Reset Password
        builder
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordLoading = true;
                state.resetPasswordError = null;
                state.resetPasswordMessage = null;
            })

            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = null;
                state.resetPasswordMessage =
                    action.payload?.message ||
                    "Password reset successfully";
            })

            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordLoading = false;
                state.resetPasswordError = action.payload;
                state.resetPasswordMessage = null;
            });


        // Logout
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(logoutUser.fulfilled, (state) => {

                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                state.error = null;

                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            })

            .addCase(logoutUser.rejected, (state, action) => {

                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                state.error = action.payload;

                localStorage.removeItem("user");
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            });
    }
});


export default authSlice.reducer;