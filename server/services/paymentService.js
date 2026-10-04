import Razorpay from "razorpay";
import crypto from "crypto";
import ApiError from "../utils/ApiError.js";
import Payment from "../models/paymentModel.js";
import Rental from "../models/rentalModel.js";
import { createNotificationService } from "./notificationService.js";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


const createPaymentService = async (rentalId, userId) => {

    if (!rentalId) {
        throw new ApiError(400, "RentalId is required");
    }

    const rental = await Rental.findById(rentalId);

    if (!rental) {
        throw new ApiError(404, "Rental doesn't exist");
    }

    if (!rental.renter.equals(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to make payment for this rental"
        );
    }

    if (rental.status !== "approved") {
        throw new ApiError(
            400,
            "Payment can only be made for an approved rental"
        );
    }

    // Check whether a payment already exists for this rental
    const existingPayment = await Payment.findOne({
        rental: rental._id
    });

    // If payment is already completed, don't allow another payment
    if (existingPayment && existingPayment.paymentStatus === "completed") {
        throw new ApiError(
            400,
            "Payment has already been completed for this rental"
        );
    }

    // Razorpay requires amount in the smallest currency unit
    const amountInPaise = Math.round(
        rental.totalPrice * 100
    );

    // Create a new Razorpay order
    const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `rental_${rental._id}`,
        notes: {
            rentalId: rental._id.toString(),
            userId: userId.toString()
        }
    });

    let payment;

    // If a pending payment already exists,
    // reuse the same Payment document and update its Razorpay order
    if (existingPayment) {

        existingPayment.amount = rental.totalPrice;
        existingPayment.paymentStatus = "pending";
        existingPayment.razorpayOrderId = razorpayOrder.id;
        existingPayment.razorpayPaymentId = "";
        existingPayment.razorpaySignature = "";

        payment = await existingPayment.save();

    } else {

        // First payment attempt
        payment = await Payment.create({
            rental: rental._id,
            amount: rental.totalPrice,
            paymentStatus: "pending",
            razorpayOrderId: razorpayOrder.id
        });
    }

    return {
        payment,
        order: razorpayOrder,
        keyId: process.env.RAZORPAY_KEY_ID
    };
};


/* verify the payment made by the user using razorpay signature
 the payment details sent by the frontend can be manipulated so
we have to verify it */
const verifyRazorpayPaymentService = async (
    paymentId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    userId
) => {

    if(
        !paymentId ||
        !razorpayPaymentId ||
        !razorpayOrderId ||
        !razorpaySignature
    ){
        throw new ApiError(
            400,
            "Payment verification details are required"
        );
    }

    const payment = await Payment.findById(paymentId)
        .populate("rental");

    if(!payment){
        throw new ApiError(404, "Payment doesn't exist");
    }

    if(!payment.rental.renter.equals(userId)){
        throw new ApiError(
            403,
            "You are not authorized to verify this payment"
        );
    }

    if(payment.paymentStatus !== "pending"){
        throw new ApiError(
            400,
            "Payment is not pending"
        );
    }

    if(payment.razorpayOrderId !== razorpayOrderId){
        throw new ApiError(
            400,
            "Invalid Razorpay order"
        );
    }

    // generate the signature using the orderId and paymentId
    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        // the data to be hashed
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        // the generated result is in binary so we convert it to hex
        .digest("hex");

    if(generatedSignature !== razorpaySignature){
        throw new ApiError(
            400,
            "Invalid Razorpay payment signature"
        );
    }

    payment.paymentStatus = "completed";
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;

    await payment.save();

    await createNotificationService({
        receiver: payment.rental.renter,
        type: "payment_completed",
        message: "Your payment has been completed successfully.",
        rental: payment.rental._id,
        payment: payment._id
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


export {
    createPaymentService,
    verifyRazorpayPaymentService,
    getMyPaymentsService,
    getPaymentByIdService,
};