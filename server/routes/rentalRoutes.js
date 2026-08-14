import { Router } from "express";
import { createRental,
         getMyRentals,
         getRenatalById,
         updateRentalById,
         cancleRental } from "../controllers/rentalController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();


router.route("/rent").post(authMiddleware, createRental);
router.route("/myRenatls").get(authMiddleware, getMyRentals);
router.route("/:id").get(authMiddleware, getRenatalById);
router.route("/:id").put(authMiddleware, updateRentalById);
router.route("/:id/cancel").put(authMiddleware, cancleRental);

export default router;