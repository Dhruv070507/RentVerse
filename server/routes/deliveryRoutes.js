import { Router } from "express";
import {
    createDelivery,
    getDeliveryById,
    getMyDeliveries,
    assignDeliveryAgent,
    startDelivery,
    generateDeliveryOtp,
    completeDelivery,
    assignReturnAgent,
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

router.patch("/:id/assign-delivery", authenticationMiddleware, authorizationMiddleware("admin"), assignDeliveryAgent);


router.patch("/:id/start", authenticationMiddleware, authorizationMiddleware("delivery_agent"), startDelivery);


router.post("/:id/delivery-otp", authenticationMiddleware, authorizationMiddleware("delivery_agent"), generateDeliveryOtp);


router.patch("/:id/complete", authenticationMiddleware, authorizationMiddleware("delivery_agent"), completeDelivery);


router.patch("/:id/assign-return", authenticationMiddleware,
    authorizationMiddleware("admin"), assignReturnAgent);


router.patch("/:id/return/start", authenticationMiddleware, authorizationMiddleware("delivery_agent"), startReturn);


router.post("/:id/return-otp", authenticationMiddleware, authorizationMiddleware("delivery_agent"), generateReturnOtp);


router.patch("/:id/return/complete", authenticationMiddleware, authorizationMiddleware("delivery_agent"), completeReturn);


export default router;