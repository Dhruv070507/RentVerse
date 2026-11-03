import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import Category from "../models/categoryModel.js";
import CategoryRequest from "../models/categoryRequestModel.js";

// Escape special regex characters before using a category name in a regex.
// Remove all special characters
const escapeRegex = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createCategoryRequestService = async (name, description, userId) => {
    if (!name || !name.trim()) {
        throw new ApiError(400, "Category name is required");
    }

    const trimmedName = name.trim();

    // A request should not be created if the category already exists.
    /* Here 
        $regex - Performs pattern-based string matching
        ^ - means match from the beginning of the string
        $ - means match until the end of the string
        $options: "i" - case-insensitive matching

        ex. if trimmedName = "Electronics" it matches electronics, Electronics,
        ELECTRONICS
    */
    const existingCategory = await Category.findOne({
        name: { $regex: `^${escapeRegex(trimmedName)}$`, $options: "i" }
    });

    if (existingCategory) {
        throw new ApiError(400, "This category already exists");
    }

    // Prevent duplicate pending requests for the same category.
    const existingRequest = await CategoryRequest.findOne({
        name: { $regex: `^${escapeRegex(trimmedName)}$`, $options: "i" },
        status: "pending"
    });

    if (existingRequest) {
        throw new ApiError(400, "A request for this category is already pending");
    }

    const categoryRequest = await CategoryRequest.create({
        name: trimmedName,
        description: description?.trim() || "",
        requestedBy: userId
    });

    return categoryRequest;
};


const getMyCategoryRequestsService = async (userId) => {
    const requests = await CategoryRequest.find({
        requestedBy: userId
    }).sort({ createdAt: -1 });

    return requests;
};


const getAllCategoryRequestsService = async (status) => {
    const filter = {};

    if (status) {
        if (!["pending", "approved", "rejected"].includes(status)) {
            throw new ApiError(400, "Invalid request status");
        }

        filter.status = status;
    }

    const requests = await CategoryRequest.find(filter)
        .populate("requestedBy", "username email")
        .populate("reviewedBy", "username")
        .populate("approvedCategory")
        .sort({ createdAt: -1 });

    return requests;
};


const approveCategoryRequestService = async (requestId, adminId) => {

    // Start a MongoDB session.
    // A session allows us to perform multiple database operations together.
    const session = await mongoose.startSession();

    try {
        // This variable will store the request after it has been approved.
        let approvedRequest;

        // A transaction ensures that all database operations succeed together.
        // If any operation fails, MongoDB rolls back the changes.
        await session.withTransaction(async () => {

            // Find the category request using its ID.
            // .session(session) makes this query part of our transaction.
            const categoryRequest = await CategoryRequest.findById(requestId)
                .session(session);

            if (!categoryRequest) {
                throw new ApiError(404, "Category request not found");
            }

            // Only pending requests can be approved.
            // Prevents approving a request that was already approved or rejected.
            if (categoryRequest.status !== "pending") {
                throw new ApiError(400, "This request has already been reviewed");
            }

            // Check whether the category was already created after
            // the user submitted their request.
            // Regex with "i" makes the comparison case-insensitive.
            const existingCategory = await Category.findOne({
                name: {
                    $regex: `^${escapeRegex(categoryRequest.name)}$`,
                    $options: "i"
                }
            }).session(session);

            if (existingCategory) {
                throw new ApiError(400, "This category already exists");
            }

            // Create the actual Category document.
            // A category is created only after admin approval.
            // Passing { session } ensures this creation belongs to the transaction.
            const [category] = await Category.create(
                [{
                    name: categoryRequest.name,
                    description: categoryRequest.description
                }],
                { session }
            );

            categoryRequest.status = "approved";
            categoryRequest.reviewedBy = adminId;
            categoryRequest.reviewedAt = new Date();

            categoryRequest.approvedCategory = category._id;

            await categoryRequest.save({ session });

            // Keep the updated request so we can return it after the transaction.
            approvedRequest = categoryRequest;
        });

        // Return the approved request to the controller.
        return approvedRequest;

    } finally {

        // Always close the MongoDB session, whether the transaction succeeds or fails.
        // This prevents leaving an unused session open.
        await session.endSession();
    }
};


const rejectCategoryRequestService = async (
    requestId,
    adminId,
    adminNote
) => {
    const categoryRequest = await CategoryRequest.findById(requestId);

    if (!categoryRequest) {
        throw new ApiError(404, "Category request not found");
    }

    if (categoryRequest.status !== "pending") {
        throw new ApiError(400, "This request has already been reviewed");
    }

    categoryRequest.status = "rejected";
    categoryRequest.reviewedBy = adminId;
    categoryRequest.reviewedAt = new Date();
    categoryRequest.adminNote = adminNote?.trim() || "";

    await categoryRequest.save();

    return categoryRequest;
};


export {
    createCategoryRequestService,
    getMyCategoryRequestsService,
    getAllCategoryRequestsService,
    approveCategoryRequestService,
    rejectCategoryRequestService
};