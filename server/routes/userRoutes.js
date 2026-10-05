import { Router } from "express";

import {
    userLogin,
    userRegister,
    getProfile,
    logoutUser,
    forgotPassword,
    resetPassword,
} from "../controllers/userController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.post("/register", upload.single("profileImage"), userRegister);
router.post("/login", userLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", authenticationMiddleware, getProfile);
router.post("/logout", authenticationMiddleware, logoutUser);

export default router;