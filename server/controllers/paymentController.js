import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    createPaymentService,
    getMyPaymentsService,
    getPaymentByIdService,
    updatePaymentStatusService
} from "../services/paymentService.js";


const createPayment = asyncHandler(async (req, res) => {
    const { rentalId, paymentMethod } = req.body;

    const payment = await createPaymentService(
        rentalId,
        paymentMethod,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            payment,
            "Payment created successfully"
        )
    );
});


const getMyPayments = asyncHandler(async (req, res) => {

    const payments = await getMyPaymentsService(
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            payments,
            "Payments fetched successfully"
        )
    );
});


const getPaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const payment = await getPaymentByIdService(
        id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            payment,
            "Payment fetched successfully"
        )
    );
});


const updatePaymentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const payment = await updatePaymentStatusService(
        id,
        status,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            payment,
            "Payment status updated successfully"
        )
    );
});


export {
    createPayment,
    getMyPayments,
    getPaymentById,
    updatePaymentStatus,
};