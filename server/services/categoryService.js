import ApiError from "../utils/ApiError.js";
import Category from "../models/categoryModel.js";


const createCategoryService = async (name, description) => {

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Category name is required");
    }

    const existingCategory = await Category.findOne({
        name: name.trim()
    });

    if (existingCategory) {
        throw new ApiError(400, "Category already exists");
    }

    const category = await Category.create({
        name: name.trim(),
        description: description?.trim() || ""
    });

    return category;
};


const getAllCategoriesService = async () => {

    const categories = await Category.find()
        .sort({ name: 1 });

    return categories;
};


const getCategoryByIdService = async (id) => {

    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category doesn't exist");
    }

    return category;
};


const updateCategoryService = async (id, name, description) => {

    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category doesn't exist");
    }

    if (name !== undefined) {

        if (!name.trim()) {
            throw new ApiError(400, "Category name cannot be empty");
        }

        const existingCategory = await Category.findOne({
            name: name.trim(),
            _id: { $ne: id }
        });

        if (existingCategory) {
            throw new ApiError(400, "Category already exists");
        }

        category.name = name.trim();
    }

    if (description !== undefined) {
        category.description = description.trim();
    }

    await category.save();

    return category;
};


const deleteCategoryService = async (id) => {

    const category = await Category.findById(id);

    if (!category) {
        throw new ApiError(404, "Category doesn't exist");
    }

    await Category.findByIdAndDelete(id);

    return true;
};


export {
    createCategoryService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryService,
    deleteCategoryService
};