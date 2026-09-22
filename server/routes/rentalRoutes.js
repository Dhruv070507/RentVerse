import { Router } from "express";

import {
    createRental,
    getMyRentals,
    getRentalById,
    updateRentalById,
    cancelRental,
    getRentalRequests
} from "../controllers/rentalController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";


const router = Router();

router.post("/rent", authenticationMiddleware, createRental);
router.get("/myRentals", authenticationMiddleware, getMyRentals);
router.get("/requests",authenticationMiddleware,getRentalRequests);
router.get("/:id", authenticationMiddleware, getRentalById);
router.put("/:id", authenticationMiddleware, updateRentalById);
router.put("/:id/cancel", authenticationMiddleware, cancelRental);


export default router;