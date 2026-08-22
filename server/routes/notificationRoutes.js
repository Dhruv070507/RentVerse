import { Router } from "express";
import {
    getMyNotification,
    markNotificationAsRead
} from "../controllers/notificationController.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const router = Router();

router.route("/").get(authMiddleware, getMyNotification);
router.route("/:id/read").patch(authMiddleware, markNotificationAsRead);

export default router;