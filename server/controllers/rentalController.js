import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Rental from "../models/rentalModel.js";
import Equipment from "../models/equipmentModel.js";


const createRental = asyncHandler(async (req, res) => {
    // getting all the required fields from the request body
    const { equipmentId, quantity, rentalStartDate, rentalEndDate } = req.body;

    // checking if all the fields are provided
    if(!equipmentId || !quantity || !rentalStartDate || !rentalEndDate){
        throw new ApiError(400, "All fields are required");
    }

    const equipment = await Equipment.findById(equipmentId);

    // checking if the equipment exists
    if(!equipment){
        throw new ApiError(404, "Equipment not found");
    }

    // checking if the equipment is available for rent
    if(!equipment.availability)
        throw new ApiError(400, "Equipment is not available for rent");

    // checking if the requested quantity is available for rent
    if(equipment.quantity < quantity) {
        throw new ApiError(400, "Not enough equipment available for rent");
    }

    // checking if the startDate and the endDate are valid
    const startDate = new Date(rentalStartDate);
    const endDate = new Date(rentalEndDate);

    if(startDate >= endDate){
        throw new ApiError(400, "Invalid rental period");
    }

    // subtracting two dates gives the difference in milliseconds so we need to convert it into days by dividing it by 1000*60*60*24
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);

    const totalPrice = duration * equipment.rentalPrice * quantity;

    const rental = await Rental.create({
        renter: req.user._id,
        owner: equipment.owner,
        equipment: equipmentId,
        quantity,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
        totalPrice,
        status: "pending",
    })

    return res.status(201).json(
        new ApiResponse(
            201,
            rental,
            "Rental created successfully"
        )
    )
})


const getMyRentals = asyncHandler(async (req, res) => {
    const rentals = await Rental.find({
        renter: req.user._id
    })
    .populate("equipment", "name")
    .populate("owner", "username ")
    .select("equipment owner quantity rentalStartDate rentalEndDate totalPrice status createdAt")
    .sort({ createdAt: -1 });


    return res.status(200).json(
        new ApiResponse(
            200,
            rentals,
            "All rentals are fetched successfully"
        )
    )
})


const getRenatalById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const rental = await Rental.findById(id)
        .populate("equipment")
        .populate("owner", "username email profileImage")
        .populate("renter", "username email profileImage");


    if(!rental){
        throw new ApiError(404, "Rental doesn't exist");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            rental,
            "Rental fetched successfully"
        )
    )
})


const updateRentalById = asyncHandler(async (req, res) =>{
    const { id } = req.params;
    const { status } = req.body;

    const rental = await Rental.findById(id);

    if(!rental)
        throw new ApiError(404, "Rental doesn't exist")

    // Only equipment owner can approve/reject so we check if the id is matching with equipment owner
    if(!rental.owner.equals(req.user._id)){
        throw new ApiError(
            403,
            "You are not authorized to update this rental"
        )
    }

    // Checking if the status is from the approved/rejected
    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid rental status");
    }

    rental.status = status;

    await rental.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            rental,
            "Rental is updated successfully"
        )
    )
})


const cancleRental = asyncHandler(async (req, res) => {
    const { id } = req.params

    const rental = await Rental.findById(id);

    if(!rental)
        throw new ApiError(404, "Rental doesn't exist");

    if(!rental.renter.equals(req.user._id))
        throw new ApiError(403, "You are not authorized to cancle this rental");

    if(["rejected", "cancelled", "completed"].includes(rental.status))
        throw new ApiError(400, `Rental cannot be cancelled because it is already ${rental.status}`);

    rental.status = "cancelled";

    await rental.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            rental,
            "Rental cancelled successfully"
        )
    )
})


export {
    createRental,
    getMyRentals,
    getRenatalById,
    updateRentalById,
    cancleRental,
}