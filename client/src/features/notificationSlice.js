import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";


export const getMyNotifications = createAsyncThunk(
    "notifications/getMyNotifications",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/notifications");

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch notifications"
            );
        }
    }
);


export const markNotificationAsRead = createAsyncThunk(
    "notifications/markNotificationAsRead",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/notifications/${id}/read`);

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to mark notification as read"
            );
        }
    }
);


export const markAllNotificationsAsRead = createAsyncThunk(
    "notifications/markAllNotificationsAsRead",
    async (_, { rejectWithValue }) => {
        try {
            await api.patch("/notifications/read-all");

            return true;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to mark all notifications as read"
            );
        }
    }
);

const initialState = {
    notifications: [],
    loading: false,
    error: null
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        clearNotificationError: (state) => {
            state.error = null;
        },
        clearNotificationState: (state) => {
            state.notifications = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(getMyNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(markNotificationAsRead.pending, (state) => {
                state.error = null;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const updatedNotification = action.payload;

                const index = state.notifications.findIndex(
                    (notification) => notification._id === updatedNotification._id
                );

                if (index !== -1) {
                    state.notifications[index] = updatedNotification;
                }
            })
            .addCase(markNotificationAsRead.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(markAllNotificationsAsRead.pending, (state) => {
                state.error = null;
            })
            .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
                state.notifications.forEach((notification) => {
                    notification.isRead = true;
                });
            })
            .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearNotificationError,
                clearNotificationState,
            } = notificationSlice.actions;

export default notificationSlice.reducer;