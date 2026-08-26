import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Review from "../models/rentalModel.js"
import { addReviewService,
         getReviewByEquipmentService,
         getReviewByIdService,
         updateReviewByIdService,
         deleteReviewByIdService
 } from "../services/reviewService.js";


const addReview = asyncHandler(async(req, res) =>{
    const review = await addReviewService(req.body, req.user._id);

    return res.status(201).json(
        new ApiResponse(
            201,
            review,
            "Review added successfully"
        )
    )
})


const getReviewByEquipment = asyncHandler(async(req, res) =>{
    const {equipmentId} = req.params;

    const reviews = await getReviewByEquipmentService(
        equipmentId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            reviews,
            "Review of the equipment fetched successfully"
        )
    )
});


const getReviewById = asyncHandler(async(req, res) =>{
    const {reviewId} = req.params;

    const review = await getReviewByIdService(
        reviewId
    );

    return res.status(200).json(
        200,
        review,
        "Review fetched successfully"
    )
})


const updateReviewById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const updatedReview = await updateReviewByIdService(
        id,
        req.body,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedReview,
            "Review is updated successfully"
        )
    );
});


const deleteReviewById = asyncHandler(async(req, res) =>{
    const {reviewId} = req.params;

    await deleteReviewByIdService(
        reviewId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Review deleted successfully"
        )
    );
});


export {
    addReview,
    getReviewByEquipment,
    getReviewById,
    updateReviewById,
    deleteReviewById,
}