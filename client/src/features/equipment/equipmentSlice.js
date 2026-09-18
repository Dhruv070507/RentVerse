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


const initialState = {
    equipments: [],
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
            });
    }
});


export default equipmentSlice.reducer;