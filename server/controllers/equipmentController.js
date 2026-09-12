import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    addEquipmentService,
    getEquimentByIdService,
    getAllEqipmentsService,
    updateEquipmentService,
    deleteEquipmentService
} from "../services/equipmentService.js";


// add a new equipment

const addEquipment = asyncHandler(async (req, res) => {

    const {
        name,
        description,
        category,
        rentalPrice,
        quantity,
        location
    } = req.body;

    const equipment = await addEquipmentService(
        name,
        description,
        category,
        Number(rentalPrice),
        Number(quantity),
        req.files,
        location,
        req.user._id
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            equipment,
            "Equipment created successfully"
        )
    );
});


const getEquimentById = asyncHandler(async (req, res) => {
    // getting the equipment id from the request params
    const {id} = req.params;

    const equipment = await getEquimentByIdService(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            equipment,
            "Equipment fetched successfully"
        )
    );
});


const getAllEqipments = asyncHandler(async(req, res) => {

    const equipments = await getAllEqipmentsService();

    return res.status(200).json(
        new ApiResponse(
            200,
            equipments,
            "All equipments fetched successfully"
        )
    );
});


const updateEquipment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Define the fields that can be updated
    const allowedFields = [
        "name",
        "description",
        "category",
        "quantity",
        "images",
        "location",
        "rentalPrice",
        "availability"
    ];

    // Create an object to hold the updated data
    const updateData = {};

    // Loop through the allowed fields and add them to the updateData object if they are present in the request body
    for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    }

    const updatedEquipment = await updateEquipmentService(
        id,
        updateData,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedEquipment,
            "Equipment updated successfully"
        )
    );
});


const deleteEquipment = asyncHandler(async(req, res) => {
    const { id } = req.params;

    const deleted = await deleteEquipmentService(
        id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Equipment deleted successfully",
        )
    );
});


export {
    addEquipment,
    getEquimentById,
    getAllEqipments,
    updateEquipment,
    deleteEquipment,
};