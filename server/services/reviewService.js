import ApiError from "../utils/ApiError.js";
import Review from "../models/reviewModel.js";
import Rental from "../models/rentalModel.js";

const addReviewService = async (reviewData, userId) => {

    const { rentalId, rating, comment } = reviewData;

    if (!rentalId || rating === undefined || !comment) {
        throw new ApiError(
            400,
            "RentalId, rating and comment are required"
        );
    }

    if (rating < 1 || rating > 5) {
        throw new ApiError(
            400,
            "Rating must be between 1 and 5"
        );
    }

    const rental = await Rental.findById(rentalId);

    // checking if the rental exists
    if (!rental) {
        throw new ApiError(
            404,
            "Rental doesn't exist"
        );
    }

    // checking if the logged in user is the renter
    if (!rental.renter.equals(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to review this rental"
        );
    }

    if (rental.status !== "completed") {
        throw new ApiError(
            400,
            "You can only review a completed rental"
        );
    }

    // checking if the user has already reviewed this rental
    const existingReview = await Review.findOne({
        rental: rentalId,
        reviewer: userId
    });

    if (existingReview) {
        throw new ApiError(
            400,
            "You have already reviewed this rental"
        );
    }

    const review = await Review.create({
        ...reviewData,
        rental: rental._id,
        reviewer: userId,
        equipment: rental.equipment,
        receiver: rental.owner
    });

    return review;
};

const getReviewByEquipmentService = async(equipmentId) =>{

    const reviews = await Review.find({
        equipment: equipmentId  
    })
    .populate("reviewer", "username profileImage")
    .populate("receiver", "username profileImage")
    .sort({createdAt: -1});

    return reviews;
}


const getReviewByIdService = async(reviewId) =>{

    const review = await Review.findById(reviewId)
            .populate("reviewer", "username profileImage")
            .populate("receiver", "username profileImage")
            .populate("equipment", "name image")

    if(!review)
        throw new ApiError(404, "Review doesn't exist");

    return review;
}


const updateReviewByIdService = async(reviewId, reviewData, userId) =>{
    
    const review = await Review.findById(reviewId);

    if(!review)
        throw new ApiErrorI(404, "Review doesn't exist");

    if(!review.rental.equals(userId))
        throw new ApiError(403, "You are not authorized to update this review");

    
    if(reviewData.rating !== undefined && 
        (reviewData.rating < 0 || reviewData.rating > 5))
        throw new ApiError(400, "Rating must be between 0 and 5");


    const allowedFields = [
        "rating",
        "comment"
    ]


    const updateData = {};

    for(const field of allowedFields){
        if(reviewData[field] !== undefined)
            updateData[field] = reviewData[field];
    }

    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        {$set: updateData},
        {
            new: true,
            runValidators: true
        }
    );

    return updatedReview;
};


const deleteReviewByIdService = async(reviewId, userId) =>{
    
    const review = await Review.findById(reviewId);

    if(!review)
        throw new ApiError(404, "Review doesn't exist");

    if(!review.reviewer.equals(userId))
        throw new ApiError(403, "You are not authorized to delete this review");

    await Review.findByIdAndDelete(reviewId);

    return;
}


export {
    addReviewService,
    getReviewByEquipmentService,
    getReviewByIdService,
    updateReviewByIdService,
    deleteReviewByIdService,
};