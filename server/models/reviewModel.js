import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        rental: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rental",
            required: true,
        },

        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
        },

        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: true,
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index(
    { rental: 1, reviewer: 1 },
    { unique: true }
);

export default mongoose.model("Review", reviewSchema);