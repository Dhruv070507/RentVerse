import { Router } from "express";
import {userLogin, userRegister, getProfile} from "../controllers/userController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/profile").get(authMiddleware, getProfile);

export default router;