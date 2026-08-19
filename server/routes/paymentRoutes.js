import { Router } from "express";
import { createPayment,
         getMyPayments,   
         getPaymentById,
         updatePaymentStatus,
        } from "../controllers/paymentController.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.route("/create").post(authMiddleware, createPayment);
router.route("/my-payments").get(authMiddleware, getMyPayments);
router.route("/:id").get(authMiddleware, getPaymentById);
router.route("/:id").put(authMiddleware, updatePaymentStatus);


export default router;