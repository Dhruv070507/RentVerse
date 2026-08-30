import { Router } from "express";
import {
         addReview,
         getReviewByEquipment,
         getReviewById,
         updateReviewById,
         deleteReviewById
} from "../controllers/reviewController.js"
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.route("/add").post(authenticationMiddleware, addReview);
// review of equipment can be seen without authentication
router.route("/equipment/:equipmentId").get(getReviewByEquipment);
router.route("/:id").get(authenticationMiddleware, getReviewById);
router.route("/:id").patch(authenticationMiddleware, updateReviewById);
router.route("/:id").delete(authenticationMiddleware, deleteReviewById);


export default router






