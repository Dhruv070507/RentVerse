import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

import {
    getAdminDashboardService,
    getAllUsersService
} from "../services/adminService.js"


const getAdminDashboard = asyncHandler(async (req, res) => {

    const dashboard = await getAdminDashboardService();

    return res.status(200).json(
        new ApiResponse(
            200,
            dashboard,
            "Admin dashboard fetched successfully"
        )
    )
});


const getAllUsers = asyncHandler(async (req, res) => {

    const users = await getAllUsersService();

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "All users fetched successfully"
        )
    )
});


export {
    getAdminDashboard,
    getAllUsers
};