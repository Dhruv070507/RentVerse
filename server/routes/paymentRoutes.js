import { Router } from "express";
import { createPayment,
         getMyPayments,   
         getPaymentById,
         updatePaymentStatus,
        } from "../controllers/paymentController.js"
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";


const router = Router();

router.route("/create").post(authenticationMiddleware, createPayment);
router.route("/my-payments").get(authenticationMiddleware, getMyPayments);
router.route("/:id").get(authenticationMiddleware, getPaymentById);
router.route("/:id").put(authenticationMiddleware, updatePaymentStatus);


export default router;