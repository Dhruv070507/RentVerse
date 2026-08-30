import ApiError from "../utils/ApiError.js";
import Rental from "../models/rentalModel.js";
import Equipment from "../models/equipmentModel.js";


// Create Rental
const createRentalService = async (
    equipmentId,
    quantity,
    rentalStartDate,
    rentalEndDate,
    address,
    userId
) => {

    // checking if all the fields are provided
    if(!equipmentId || !quantity || !rentalStartDate || !rentalEndDate || !address){
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
        renter: userId,
        owner: equipment.owner,
        equipment: equipmentId,
        quantity,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
        address: address,
        totalPrice,
        status: "pending",
    });

    return rental;
};


// Get My Rentals
const getMyRentalsService = async (userId) => {

    const rentals = await Rental.find({
        renter: userId
    })
    .populate("equipment", "name")
    .populate("owner", "username ")
    .select("equipment owner quantity rentalStartDate rentalEndDate totalPrice status createdAt")
    .sort({ createdAt: -1 });

    return rentals;
};


// Get Rental By ID
const getRentalByIdService = async (id, userId) => {

    const rental = await Rental.findById(id)
        .populate("equipment")
        .populate("owner", "username email profileImage")
        .populate("renter", "username email profileImage");

    if(!rental){
        throw new ApiError(404, "Rental doesn't exist");
    }

    if (!rental.renter.equals(userId) && !rental.owner.equals(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to view this rental"
        );
    }

    return rental;
};


// Update Rental By ID
const updateRentalByIdService = async (id, status, userId) => {

    const rental = await Rental.findById(id);

    if(!rental)
        throw new ApiError(404, "Rental doesn't exist");

    // Only equipment owner can approve/reject so we check if the id is matching with equipment owner
    if(!rental.owner.equals(userId)){
        throw new ApiError(
            403,
            "You are not authorized to update this rental"
        );
    }

    // Checking if the status is from the approved/rejected
    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid rental status");
    }

    rental.status = status;

    await rental.save();

    return rental;
};


// Cancle Rental
const cancleRentalService = async (id, userId) => {

    const rental = await Rental.findById(id);

    if(!rental)
        throw new ApiError(404, "Rental doesn't exist");

    if(!rental.renter.equals(userId))
        throw new ApiError(
            403,
            "You are not authorized to cancle this rental"
        );

    if(["rejected", "cancelled", "completed"].includes(rental.status))
        throw new ApiError(
            400,
            `Rental cannot be cancelled because it is already ${rental.status}`
        );

    rental.status = "cancelled";

    await rental.save();

    return rental;
};


export {
    createRentalService,
    getMyRentalsService,
    getRentalByIdService,
    updateRentalByIdService,
    cancleRentalService
};