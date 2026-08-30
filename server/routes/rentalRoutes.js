import { Router } from "express";
import { createRental,
         getMyRentals,
         getRentalById,
         updateRentalById,
         cancelRental } from "../controllers/rentalController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router();


router.route("/rent").post(authenticationMiddleware, createRental);
router.route("/myRenatls").get(authenticationMiddleware, getMyRentals);
router.route("/:id").get(authenticationMiddleware, getRentalById);
router.route("/:id").put(authenticationMiddleware, updateRentalById);
router.route("/:id/cancel").put(authenticationMiddleware, cancelRental);

export default router;