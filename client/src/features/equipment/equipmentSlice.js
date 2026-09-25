// for storing the equipment data which comes from the backend


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';


// fetching all equipments from the backend

export const fetchEquipments = createAsyncThunk(
    'equipment/fetchEquipments',
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get("/equipments");

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch equipments"
            );

        }
    }
);

// fetching a single equipment from the backend using its id

export const fetchEquipmentById = createAsyncThunk(
    'equipment/fetchEquipmentById',
    async (id, { rejectWithValue }) => {

        try {

            const response = await api.get(`/equipments/${id}`);

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch equipment"
            );

        }
    }
);


export const getMyEquipments = createAsyncThunk(
    "equipment/getMyEquipments",
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get(
                "/equipments/my-equipments"
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Get my equipments error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch your equipments"
            );
        }
    }
);


export const updateEquipment = createAsyncThunk(
    "equipment/updateEquipment",
    async ({ equipmentId, updateData }, { rejectWithValue }) => {

        try {

            const response = await api.put(
                `/equipments/${equipmentId}`,
                updateData
            );

            return response.data.data;

        } catch (error) {

            console.log(
                "Update equipment error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update equipment"
            );
        }
    }
);


export const deleteEquipment = createAsyncThunk(
    "equipment/deleteEquipment",
    async (equipmentId, { rejectWithValue }) => {

        try {

            await api.delete(
                `/equipments/${equipmentId}`
            );

            return equipmentId;

        } catch (error) {

            console.log(
                "Delete equipment error:",
                error.response?.data
            );

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete equipment"
            );
        }
    }
);


const initialState = {
    equipments: [],
    myEquipments: [],
    selectedEquipment: null,
    loading: false,
    error: null
};


const equipmentSlice = createSlice({
    name: 'equipment',

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // when the request is being sent
            .addCase(fetchEquipments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // when the equipments are successfully fetched
            .addCase(fetchEquipments.fulfilled, (state, action) => {
                state.loading = false;
                state.equipments = action.payload;
            })

            // when there is an error while fetching equipments
            .addCase(fetchEquipments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // when the request for a single equipment is being sent
            .addCase(fetchEquipmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // when the equipment is successfully fetched
            .addCase(fetchEquipmentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedEquipment = action.payload;
            })

            // when there is an error while fetching the equipment
            .addCase(fetchEquipmentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getMyEquipments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getMyEquipments.fulfilled, (state, action) => {
                state.loading = false;
                state.myEquipments = action.payload;
            })

            .addCase(getMyEquipments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateEquipment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateEquipment.fulfilled, (state, action) => {
                state.loading = false;

                state.myEquipments = state.myEquipments.map((equipment) =>
                    equipment._id === action.payload._id
                        ? action.payload
                        : equipment
                );

                state.selectedEquipment = action.payload;
            })

            .addCase(updateEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteEquipment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteEquipment.fulfilled, (state, action) => {
                state.loading = false;

                state.myEquipments = state.myEquipments.filter(
                    (equipment) => equipment._id !== action.payload
                );

                if (state.selectedEquipment?._id === action.payload) {
                    state.selectedEquipment = null;
                }
            })

            .addCase(deleteEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default equipmentSlice.reducer;