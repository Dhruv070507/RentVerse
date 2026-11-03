
import mongoose from "mongoose";

// Separate model because a category request is not an approved category.
// Users can submit requests, but those requests must be reviewed by an admin.
// Keeping requests separate prevents unapproved categories from appearing
// in equipment listings and allows us to maintain pending/rejected request history.
const categoryRequestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        reviewedAt: {
            type: Date,
            default: null,
        },
        adminNote: {
            type: String,
            trim: true,
            default: "",
        },
        approvedCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("CategoryRequest", categoryRequestSchema);
