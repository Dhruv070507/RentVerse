import { Router } from "express";
import {userLogin, userRegister, getProfile} from "../controllers/userController.js"
import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/profile").get(authenticationMiddleware, getProfile);

export default router;