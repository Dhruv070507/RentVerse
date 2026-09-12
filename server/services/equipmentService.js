import ApiError from "../utils/ApiError.js";
import Equipment from "../models/equipmentModel.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";


// add a new equipment

const addEquipmentService = async (
    name,
    description,
    category,
    rentalPrice,
    quantity,
    files,
    location,
    userId
) => {

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

     // checking if images are provided
    if (!files || files.length === 0) {
        throw new ApiError(
            400,
            "At least one image is required"
        );
    }


    // upload images to Cloudinary
    const images = [];

    for (const file of files) {

        const result = await uploadToCloudinary(
            file.path,
            "rentVerse/equipments"
        );

        images.push(result.secure_url);
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
        owner: userId
    });

    return equipment;
};


const getEquimentByIdService = async (id) => {

    // checking if the id is a valid mongoose object id
    // population is used to get the owner details along with the equipment details for mybe to show in the frontend
    const equipment = await Equipment.findById(id)
        .populate("owner", "username email profileImage");

    if(!equipment){
        throw new ApiError(404, "Equipment not found");
    }

    return equipment;
};


const getAllEqipmentsService = async () => {

    // getting all the equipments and populating the owner detials for each eq and selecting only the req fields to be sent in the response
    const equipments = await Equipment.find()
        .populate("owner", "username email profileImage")
        .select("-refreshToken -accessToken -createdAt -updatedAt -__v");

    return equipments;
};


const updateEquipmentService = async (id, updateData, userId) => {

    const equipment = await Equipment.findById(id);

    if (!equipment) {
        throw new ApiError(404, "Equipment doesn't exist");
    }

    // Check if the logged-in user is the owner of the equipment
    if (!equipment.owner.equals(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to update this equipment"
        );
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

    return updatedEquipment;
};


const deleteEquipmentService = async (id, userId) => {

    const equipment = await Equipment.findById(id);

    if(!equipment){
        throw new ApiError(404, "Equipment doesnt exist");
    }

    if(!equipment.owner.equals(userId)){
        throw new ApiError(
            403,
            "You are not authorized to delete this equipment"
        );
    }

    await Equipment.findByIdAndDelete(id);

    return true;
};


export {
    addEquipmentService,
    getEquimentByIdService,
    getAllEqipmentsService,
    updateEquipmentService,
    deleteEquipmentService
};