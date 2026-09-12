import { Router } from "express";

import {
    getMyNotification,
    markNotificationAsRead
} from "../controllers/notificationController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";


const router = Router();


router.get("/", authenticationMiddleware, getMyNotification);
router.patch("/:id/read", authenticationMiddleware, markNotificationAsRead);

export default router;