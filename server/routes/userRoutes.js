import { Router } from "express";

import {
    userLogin,
    userRegister,
    getProfile
} from "../controllers/userController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.post("/register", upload.single("profileImage"), userRegister);
router.post("/login", userLogin);
router.get("/profile", authenticationMiddleware, getProfile);

export default router;