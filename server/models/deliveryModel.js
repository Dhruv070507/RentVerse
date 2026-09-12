import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
    {
        rental: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rental",
            required: true,
        },

        deliveryAgent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        returnAgent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        deliveryAddress: {
            type: String,
            trim: true,
            default: "",
        },

        deliveryStatus: {
            type: String,
            enum: [
                "pending",
                "out_for_delivery",
                "delivered",
                "return_scheduled",
                "out_for_return",
                "returned",
                "cancelled",
            ],
            default: "pending",
        },

        deliveryOtp: {
            type: String,
            default: "",
        },

        returnOtp: {
            type: String,
            default: "",
        },

        deliveryDate: {
            type: Date,
        },

        deliveredAt: {
            type: Date,
        },

        returnStartDate: {
            type: Date,
        },

        returnDeadline: {
            type: Date,
        },

        returnedAt: {
            type: Date,
        },

        deliveryCharges: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Delivery", deliverySchema);