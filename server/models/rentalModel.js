import mongoose from "mongoose";
import equipment from "./equipment";

const rentalSchema = new mongoose.Schema(
    {
        renter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        rentalStartDate: {
            type: Date,
            required: true,
        },
        rentalEndDate: {
            type: Date,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        deliveryStatus: {
            type: String,
            enum: ["pending", "shipped", "delivered"],
            default: "pending",
        },
    }
)

export default mongoose.model("Rental", rentalSchema);