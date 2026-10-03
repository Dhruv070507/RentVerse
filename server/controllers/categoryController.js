import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    createCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService
} from "../services/categoryService.js";


const createCategory = asyncHandler(async (req, res) => {

    const {
        name,
        description
    } = req.body;

    const category = await createCategoryService(
        name,
        description
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            category,
            "Category created successfully"
        )
    );
});


const getAllCategories = asyncHandler(async (req, res) => {

    const categories = await getAllCategoriesService();

    return res.status(200).json(
        new ApiResponse(
            200,
            categories,
            "Categories fetched successfully"
        )
    );
});


const getCategoryById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const category = await getCategoryByIdService(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            category,
            "Category fetched successfully"
        )
    );
});


const updateCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const {
        name,
        description
    } = req.body;

    const category = await updateCategoryService(
        id,
        name,
        description
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            category,
            "Category updated successfully"
        )
    );
});


const deleteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params;

    await deleteCategoryService(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Category deleted successfully"
        )
    );
});


export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};