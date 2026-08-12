import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Equipment from "../models/equipmentModel.js";


// add a new equipment

const addEquipment = asyncHandler(async (req, res) => {
    // getting all equipment info from the request body
    const {
        name,
        description,
        category,
        rentalPrice,
        quantity,
        images,
        location
    } = req.body;

    // checking if all the required fields are provided
    if([name, description].some(field => !field || field.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }


    // trim does nor work no number fields so we need to check number fields separately
    if (typeof quantity !== "number" || quantity < 0) {
    throw new ApiError(400, "Invalid quantity");
    }

    if (typeof rentalPrice !== "number" || rentalPrice < 0) {
        throw new ApiError(400, "Invalid rental price");
    }

    // adding a new equipment
    const equipment = await Equipment.create({
        name,
        description,
        category,
        quantity,
        images,
        location,
        rentalPrice,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            equipment,
            "Equipment created successfully"
        )
    )
})


export {
    addEquipment,
}