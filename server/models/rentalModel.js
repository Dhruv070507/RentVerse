import mongoose from "mongoose";

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

        address: {
            type: String,
            trim: true,
            required: true
        },

        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "cancelled", "completed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Rental", rentalSchema);