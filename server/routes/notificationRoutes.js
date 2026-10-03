import { Router } from "express";

import {
    createNotification,
    getMyNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../controllers/notificationController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";


const router = Router();


router.post("/", authenticationMiddleware, createNotification);
router.patch("/read-all", authenticationMiddleware, markAllNotificationsAsRead);
router.get("/", authenticationMiddleware, getMyNotification);
router.patch("/:id/read", authenticationMiddleware, markNotificationAsRead);

export default router;