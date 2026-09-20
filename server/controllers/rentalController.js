import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    createRentalService,
    getMyRentalsService,
    getRentalByIdService,
    updateRentalByIdService,
    cancleRentalService,
} from "../services/rentalService.js";


const createRental = asyncHandler(async (req, res) => {
    // getting all the required fields from the request body
    const {
        equipmentId,
        quantity,
        rentalStartDate,
        rentalEndDate,
        address,
    } = req.body;

    const rental = await createRentalService(
        equipmentId,
        quantity,
        rentalStartDate,
        rentalEndDate,
        address,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            rental,
            "Rental created successfully"
        )
    );
});


const getMyRentals = asyncHandler(async (req, res) => {

    const rentals = await getMyRentalsService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            rentals,
            "All rentals are fetched successfully"
        )
    );
});


const getRentalById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const rental = await getRentalByIdService(
        id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            rental,
            "Rental fetched successfully"
        )
    );
});


const updateRentalById = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const rental = await updateRentalByIdService(
        id,
        status,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            rental,
            "Rental is updated successfully"
        )
    );
});


const cancelRental = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const rental = await cancleRentalService(
        id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            rental,
            "Rental cancelled successfully"
        )
    );
});


export {
    createRental,
    getMyRentals,
    getRentalById,
    updateRentalById,
    cancelRental,
};