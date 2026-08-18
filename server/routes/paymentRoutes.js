import { Router } from "express";
import { createPayment,
         getMyPayments,   
        } from "../controllers/paymentController.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.route("/create").post(authMiddleware, createPayment);
router.route("/my-payments").get(authMiddleware, getMyPayments)


export default router;