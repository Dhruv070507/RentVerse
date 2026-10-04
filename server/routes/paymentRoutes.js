import { Router } from "express";

import {
    createPayment,
    verifyRazorpayPayment,
    getMyPayments,
    getPaymentById,
} from "../controllers/paymentController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.post("/create", authenticationMiddleware, createPayment);
router.post("/verify", authenticationMiddleware, verifyRazorpayPayment);
router.get("/my-payments", authenticationMiddleware, getMyPayments);
router.get("/:id", authenticationMiddleware, getPaymentById);

export default router;