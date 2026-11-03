import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    createCategoryRequestService,
    getMyCategoryRequestsService,
    getAllCategoryRequestsService,
    approveCategoryRequestService,
    rejectCategoryRequestService,
} from "../services/categoryRequestService.js";


const createCategoryRequest = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const categoryRequest = await createCategoryRequestService(
        name,
        description,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            categoryRequest,
            "Category request submitted successfully"
        )
    );
});


const getMyCategoryRequests = asyncHandler(async (req, res) => {
    const requests = await getMyCategoryRequestsService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            requests,
            "Your category requests fetched successfully"
        )
    );
});


const getAllCategoryRequests = asyncHandler(async (req, res) => {
    const { status } = req.query;

    const requests = await getAllCategoryRequestsService(status);

    return res.status(200).json(
        new ApiResponse(
            200,
            requests,
            "Category requests fetched successfully"
        )
    );
});


const approveCategoryRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const categoryRequest = await approveCategoryRequestService(
        id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            categoryRequest,
            "Category request approved successfully"
        )
    );
});


const rejectCategoryRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { adminNote } = req.body;

    const categoryRequest = await rejectCategoryRequestService(
        id,
        req.user._id,
        adminNote
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            categoryRequest,
            "Category request rejected successfully"
        )
    );
});


export {
    createCategoryRequest,
    getMyCategoryRequests,
    getAllCategoryRequests,
    approveCategoryRequest,
    rejectCategoryRequest
};
