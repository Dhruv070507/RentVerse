import ApiError from "../utils/ApiError.js";
import Payment from "../models/paymentModel.js";
import Rental from "../models/rentalModel.js";


const createPaymentService = async (
    rentalId,
    paymentMethod,
    userId
) => {

    if(!rentalId || !paymentMethod){
        throw new ApiError(400, "RentalId and paymnet method is required");
    }

    const rental = await Rental.findById(rentalId);

    if(!rental){
        throw new ApiError(404, "Rental doesnt exist");
    }

    // Checking if the user which made the request is actually the renter
    if(!rental.renter.equals(userId)){
        throw new ApiError(
            403,
            "You are not authorized to make payment for this rental"
        );
    }

    // checking if the status of the rental is approved without it the payment shouldnt be done
    if(rental.status !== "approved"){
        throw new ApiError(
            400,
            "Payment can only be made for an approved rental"
        );
    }

    const existingPayment = await Payment.findOne({
        rental : rental._id
    });

    // avoid duplicate payment espacially when user double clicks or refresh the page then this is required
    if (existingPayment) {
        throw new ApiError(
            400,
            "Payment already exists for this rental"
        );
    }

    const payment = await Payment.create({
        rental: rental._id,
        amount: rental.totalPrice,
        paymentMethod
    });

    return payment;
};


const getMyPaymentsService = async (userId) => {

    // getting all the rents of the requested user
    const rentals = await Rental.find({
        renter: userId
    }).select("_id");

    /* extracting rent ids from the rentals object
    rental                     rental._id
        ↓                           ↓
    { _id: "rental123" }     → "rental123"
    { _id: "rental456" }     → "rental456"
    { _id: "rental789" }     → "rental789"
     after map the rentalIds will contain the ids only
    */
    const rentalIds = rentals.map(rental => rental._id);

    // Fetch payments linked to the user's rentals, include required rental details, and sort by newest first
    const payments = await Payment.find({
        rental : {$in: rentalIds}
    })
    .populate(
        "rental",
        "equipment rentalStartDate rentalEndDate totalPrice status"
    )
    .sort({ createdAt: -1 });

    return payments;
};


const getPaymentByIdService = async (id, userId) => {

    const payment = await Payment.findById(id)
        .populate("rental");

    if(!payment)
        throw new ApiError(404, "payments doesn't exist");

    if(!payment.rental.renter.equals(userId))
        throw new ApiError(
            403,
            "You are not authorized to access this payment"
        );

    return payment;
};


const updatePaymentStatusService = async (
    id,
    status,
    userId
) => {

    const payment = await Payment.findById(id)
        .populate("rental");

    if(!payment)
        throw new ApiError(404, "payment doesn't exist");

    // check if the logged in user is the renter
    if(!payment.rental.renter.equals(userId))
        throw new ApiError(
            403,
            "You are not authorized to update the payment"
        );

    // Payment must be pending
    if(payment.paymentStatus !== "pending")
        throw new ApiError(400, "payment is not pending");

    // Only the completed and failed are valid next status
    if(status !== "completed" && status !== "failed")
        throw new ApiError(400, "Invalid payment status");

    payment.paymentStatus = status;

    await payment.save();

    return payment;
};


export {
    createPaymentService,
    getMyPaymentsService,
    getPaymentByIdService,
    updatePaymentStatusService
};