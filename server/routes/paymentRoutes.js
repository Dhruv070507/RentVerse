import { Router } from "express";

import {
    createPayment,
    getMyPayments,
    getPaymentById,
    updatePaymentStatus
} from "../controllers/paymentController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";


const router = Router();

router.post("/create", authenticationMiddleware, createPayment);
router.get("/my-payments", authenticationMiddleware, getMyPayments);
router.get("/:id", authenticationMiddleware, getPaymentById);
router.put("/:id", authenticationMiddleware, updatePaymentStatus);

export default router;