import { Router } from "express";
import {
         addReview,
         getReviewByEquipment,
         getReviewById,
         updateReviewById,
         deleteReviewById
} from "../controllers/reviewController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/add").post(authMiddleware, addReview);
// review of equipment can be seen without authentication
router.route("/equipment/:equipmentId").get(getReviewByEquipment);
router.route("/:id").get(authMiddleware, getReviewById);
router.route("/:id").patch(authMiddleware, updateReviewById);
router.route("/:id").delete(authMiddleware, deleteReviewById);


export default router






