import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    createPaymentService,
    verifyRazorpayPaymentService,
    getMyPaymentsService,
    getPaymentByIdService,
} from "../services/paymentService.js";


const createPayment = asyncHandler(async (req, res) => {
    const { rentalId } = req.body;

    const payment = await createPaymentService(
        rentalId,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            payment,
            "Razorpay order created successfully"
        )
    );
});


const verifyRazorpayPayment = asyncHandler(async (req, res) => {

    const {
        paymentId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature
    } = req.body;

    const payment = await verifyRazorpayPaymentService(
        paymentId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            payment,
            "Payment verified successfully"
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


export {
    createPayment,
    verifyRazorpayPayment,
    getMyPayments,
    getPaymentById,
};