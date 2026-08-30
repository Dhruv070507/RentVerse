import { Router } from "express";
import {
    createDelivery,
    getDeliveryById,
    getMyDeliveries,
    assignDeliveryAgent,
    startDelivery,
    generateDeliveryOtp,
    completeDelivery,
    startReturn,
    generateReturnOtp,
    completeReturn
} from "../controllers/deliveryController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";


const router = Router();


router.get("/", authenticationMiddleware, getMyDeliveries);

router.get("/:id", authenticationMiddleware, getDeliveryById);

router.post("/", authenticationMiddleware, createDelivery);

router.patch("/:id/assign", authenticationMiddleware, authorizationMiddleware("owner"), assignDeliveryAgent);


router.patch("/:deliveryId/start", authenticationMiddleware, authorizationMiddleware("delivery_agent"), startDelivery);


router.post("/:deliveryId/delivery-otp", authenticationMiddleware, authorizationMiddleware("delivery_agent"), generateDeliveryOtp);


router.patch("/:deliveryId/complete", authenticationMiddleware, authorizationMiddleware("delivery_agent"), completeDelivery);


router.patch("/:deliveryId/return/start", authenticationMiddleware, authorizationMiddleware("delivery_agent"), startReturn);


router.post("/:deliveryId/return-otp", authenticationMiddleware, authorizationMiddleware("delivery_agent"), generateReturnOtp);


router.patch("/:deliveryId/return/complete", authenticationMiddleware, authorizationMiddleware("delivery_agent"), completeReturn);


export default router;