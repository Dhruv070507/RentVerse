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


const getEquimentById = asyncHandler(async (req, res) =>{
    // getting the equipment id from the request params
    const {id} = req.params;

    // checking if the id is a valid mongoose object id
    // population is used to get the owner details along with the equipment details for mybe to show in the frontend
    const equipment = await Equipment.findById(id).populate("owner", "username email profileImage");

    if(!equipment){
        throw new ApiError(404, "Equipment not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            equipment,
            "Equipment fetched successfully"
        )
    )
})


const getAllEqipments = asyncHandler(async(req, res) =>{
    // getting all the equipments and populating the owner detials for each eq and selecting only the req fields to be sent in the response
    const equipments = await Equipment.find().populate("owner", "username email profileImage").select("-refreshToken -accessToken -createdAt -updatedAt -__v");

    return res.status(200).json(
        new ApiResponse(
            200,
            equipments,
            "All equipments fetched successfully"
        )
    )
})


const updateEquipment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const equipment = await Equipment.findById(id);

    if (!equipment) {
        throw new ApiError(404, "Equipment doesn't exist");
    }

    // Check if the logged-in user is the owner of the equipment
    if (!equipment.owner.equals(req.user._id)) {
        throw new ApiError(
            403,
            "You are not authorized to update this equipment"
        );
    }

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

    // Update the equipment in the database
    const updatedEquipment = await Equipment.findOneAndUpdate(
        { _id: id },
        { $set: updateData },

        // Options to return the updated document and run validators
        // new: true returns the updated document instead of the original
        // runValidators: true ensures that the updated data obeys the schema validation rules
        {
            new: true,
            runValidators: true
        }
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

    const equipment = await Equipment.findById(id);

    if(!equipment){
        throw new ApiError(404, "Equipment doesnt exist");
    }

    if(!equipment.owner.equals(req.user._id)){
        throw new ApiError(403, "You are not authorized to delete this equipment");
    }

    await Equipment.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Equipment deleted successfully",
        )
    )
})


export {
    addEquipment,
    getEquimentById,
    getAllEqipments,
    updateEquipment,
    deleteEquipment,
}