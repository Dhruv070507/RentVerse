import { Router } from "express";
import {
    getMyNotification,
    markNotificationAsRead
} from "../controllers/notificationController.js"
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";


const router = Router();

router.route("/").get(authenticationMiddleware, getMyNotification);
router.route("/:id/read").patch(authenticationMiddleware, markNotificationAsRead);

export default router;