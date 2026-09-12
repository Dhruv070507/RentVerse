import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        maxlength: 500,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    images: {
        type: [String],
        default: [],
    },
    location: {
        type: String,
        default: '',
    },
    rentalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    availability:{
        type: Boolean,
        default: true,
    }

},
{
    timestamps: true,
}
);

export default mongoose.model("Equipment", equipmentSchema);