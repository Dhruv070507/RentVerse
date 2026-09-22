import ApiError from "../utils/ApiError.js";
import Rental from "../models/rentalModel.js";
import Equipment from "../models/equipmentModel.js";
import { createNotificationService } from "./notificationService.js";


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

    // sending the notification to the owner
    await createNotificationService({
        receiver: rental.owner,
        type: "rental_request",
        message: "You received a new rental request.",
        rental: rental._id
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


    /* Rental must still be pending so that 
        approved → approved ❌
        approved → rejected ❌

        rejected → approved ❌
        rejected → rejected ❌ */
    if (rental.status !== "pending") {
        throw new ApiError(
            400,
            `Rental cannot be updated because it is already ${rental.status}`
        );
    }


    if(status === "approved"){
        const equipment = await Equipment.findById(rental.equipment);

        if(!equipment)
            throw new ApiError(404, "Equipment doesn't exist");

        // Check available quantity
        if (equipment.quantity < rental.quantity) {
            throw new ApiError(
                400,
                "Not enough equipment available"
            );
        }

        equipment.quantity -= rental.quantity;

        await equipment.save();

    }

    rental.status = status;

    await rental.save();

     // Create notification for renter
    if (status === "approved") {

        await createNotificationService({
            receiver: rental.renter,
            type: "rental_approved",
            message: "Your rental request has been approved.",
            rental: rental._id
        });

    } else {

        await createNotificationService({
            receiver: rental.renter,
            type: "rental_rejected",
            message: "Your rental request has been rejected.",
            rental: rental._id
        });
    }

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

    // Notify equipment owner
    await createNotificationService({
        receiver: rental.owner,
        type: "rental_cancelled",
        message: "The rental request has been cancelled by the renter.",
        rental: rental._id
    });

    return rental;
};


const completeExpiredRentalsService = async () => {

    const expiredRentals = await Rental.find({
        status: "approved",
        rentalEndDate: { $lte: new Date() }
    });

    for (const rental of expiredRentals) {

        const equipment = await Equipment.findById(
            rental.equipment
        );

        if (equipment) {
            equipment.quantity += rental.quantity;

            await equipment.save();
        }

        await Rental.findByIdAndUpdate(
            rental._id,
            {
                $set: {
                    status: "completed"
                }
            }
        );

        // Notify the renter that the rental is completed
        await createNotificationService({
            receiver: rental.renter,
            type: "rental_completed",
            message: "Your rental has been completed.",
            rental: rental._id
        });
    }

    return expiredRentals.length;
};

// Get Rental Requests
const getRentalRequestsService = async (userId) => {

    const rentals = await Rental.find({
        owner: userId
    })
        .populate("equipment", "name")
        .populate("renter", "username")
        .select(
            "equipment renter quantity rentalStartDate rentalEndDate totalPrice status createdAt"
        )
        .sort({ createdAt: -1 });

    return rentals;
};


export {
    createRentalService,
    getMyRentalsService,
    getRentalRequestsService,
    getRentalByIdService,
    updateRentalByIdService,
    cancleRentalService,
    completeExpiredRentalsService,
};