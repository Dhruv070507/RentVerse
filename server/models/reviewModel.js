import mongoose from 'mongoose';
import equipment from './equipment';

const reviewSchema = new mongoose.Schema(
    {
        rental: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rental',
            required: true,
        },
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
            default: '',
        },
        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipment',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },   
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Review', reviewSchema);