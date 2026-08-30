import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import {
    createDeliveryService,
    getDeliveryByIdService,
    getMyDeliveriesService,
    assignDeliveryAgentService,
    startDeliveryService,
    completeDeliveryService,
    startReturnService,
    completeReturnService,
    } from "../services/deliveryService.js"


const createDelivery = asyncHandler(async (req, res) =>{

    const {rentalId} = req.body;

    const delivery = await createDeliveryService(rentalId);

    return res.status(201).json(
        new ApiResponse(
            201,
            delivery,
            "Delivery created successfully"
        )
    )
});


const getDeliveryById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const delivery = await getDeliveryByIdService(
        id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            delivery,
            "Delivery fetched successfully"
        )
    )
});


const getMyDeliveries = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const deliveries = await getMyDeliveriesService(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            deliveries,
            "All deliveris fetched successfully"
        )
    )
});



const assignDeliveryAgent = asyncHandler(async (req, res) =>{
    const id = req.params;
    const {agentId} = req.body;

    const assignedDelivery = await assignDeliveryAgentService(
        id,
        agentId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            assignedDelivery,
            "DeliveryAgent is assigned successfully"
        )
    )
});


const startDelivery = asyncHandler(async (req, res) =>{

    const {deliveryId} = req.params;
    
    const startedDelivery = await startDeliveryService(
        deliveryId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            startedDelivery,
            "Delivery started successfully"
        )
    )
});


const generateDeliveryOtp = asyncHandler(async (req, res) => {

    const { deliveryId } = req.params;

    const otp = await generateDeliveryOtpService(
        deliveryId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            { otp },
            "Delivery OTP generated successfully"
        )
    );
});


const completeDelivery = asyncHandler(async (req, res) => {

    const {userId} = req.params;
    const {deliveryId, otp} = req.body;

    const verifiedDelivery = await completeDeliveryService(
        userId,
        deliveryId,
        otp
    );


    return res.status(200).json(
        new ApiResponse(
            200,
            verifiedDelivery,
            "Delivery is verified successfully"
        )
    )
});


const startReturn = asyncHandler(async (req, res) => {

    const { deliveryId } = req.params;

    const startedReturn = await startReturnService(
        deliveryId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            startedReturn,
            "Return started successfully"
        )
    );
});


const completeReturn = asyncHandler(async (req, res) => {

    const { deliveryId } = req.params;
    const { otp } = req.body;

    const completedReturn = await completeReturnService(
        deliveryId,
        req.user._id,
        otp
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            completedReturn,
            "Return completed successfully"
        )
    );
});