import { Router } from "express";

import {
    addReview,
    getReviewByEquipment,
    getReviewById,
    updateReviewById,
    deleteReviewById
} from "../controllers/reviewController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";


const router = Router();

router.post("/add", authenticationMiddleware, addReview);
// Review of equipment can be seen without authentication
router.get("/equipment/:equipmentId", getReviewByEquipment);
router.get("/:id", authenticationMiddleware, getReviewById);
router.patch("/:id", authenticationMiddleware, updateReviewById);
router.delete("/:id", authenticationMiddleware, deleteReviewById);

export default router;