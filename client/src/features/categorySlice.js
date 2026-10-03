import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";


export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, { rejectWithValue }) => {

        try {

            const response = await api.get("/categories");

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );

        }
    }
);


export const fetchCategoryById = createAsyncThunk(
    "category/fetchCategoryById",
    async (categoryId, { rejectWithValue}) => {
        try {

            const response = await api.get(`/categories/${categoryId}`);

            return response.data.data;
            
        } catch (error) {
            
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to fetch category"
            );
        }
    })


export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (categoryData, { rejectWithValue }) => {

        try {

            const response = await api.post(
                "/categories",
                categoryData
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create category"
            );

        }
    }
);


export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ categoryId, updateData }, { rejectWithValue }) => {

        try {

            const response = await api.patch(
                `/categories/${categoryId}`,
                updateData
            );

            return response.data.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update category"
            );

        }
    }
);


export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (categoryId, { rejectWithValue }) => {

        try {

            await api.delete(`/categories/${categoryId}`);

            return categoryId;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }
    }
);


const initialState = {
    categories: [],
    loading: false,
    error: null
};


const categorySlice = createSlice({
    name: "category",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })

            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCategoryById.fulfilled, (state, action) => {  
                state.loading = false;
                const index = state.categories.findIndex(
                    (category) => category._id === action.payload._id
                );
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })

            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })

            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;

                state.categories = state.categories.map((category) =>
                    category._id === action.payload._id
                        ? action.payload
                        : category
                );
            })

            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;

                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload
                );
            })

            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default categorySlice.reducer;