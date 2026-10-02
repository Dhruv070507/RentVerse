import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

import {
    getAdminDashboardService,
    getAllUsersService,
    getUnassignedDeliveriesService,
    getDeliveryAgentsService,
    unassignDeliveryAgentService,
    getAllRentalsService,
    getAllDeliveriesService,
    getAllEquipmentService,
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


const getUnassignedDeliveries = asyncHandler(async (req, res) => {

    const deliveries = await getUnassignedDeliveriesService();

    return res.status(200).json(
        new ApiResponse(
            200,
            deliveries,
            "Unassigned deliveries fetched successfully"
        )
    );
});


const getDeliveryAgents = asyncHandler(async (req, res) => {

    const agents = await getDeliveryAgentsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            agents,
            "Delivery agents fetched successfully"
        )
    );
});


const unassignDeliveryAgent = asyncHandler(async (req, res) => {

    const deliveryId = req.params.id;

    const delivery = await unassignDeliveryAgentService(
        deliveryId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            delivery,
            "Delivery agent unassigned successfully"
        )
    );
});


const getAllRentals = asyncHandler(async (req, res) => {

    const rentals = await getAllRentalsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            rentals,
            "All rentals fetched successfully"
        )
    );
});


const getAllDeliveries = asyncHandler(async (req, res) => {

    const deliveries =
        await getAllDeliveriesService();

    return res.status(200).json(
        new ApiResponse(
            200,
            deliveries,
            "All deliveries fetched successfully"
        )
    );
});


const getAllEquipment = asyncHandler(async (req, res) => {

    const equipment =
        await getAllEquipmentService();

    return res.status(200).json(
        new ApiResponse(
            200,
            equipment,
            "All equipment fetched successfully"
        )
    );
});


export {
    getAdminDashboard,
    getAllUsers,
    getUnassignedDeliveries,
    getDeliveryAgents,
    unassignDeliveryAgent,
    getAllRentals,
    getAllDeliveries,
    getAllEquipment,
};