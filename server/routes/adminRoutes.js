import { Router } from "express";

import {
    getAdminDashboard,
    getAllUsers
} from "../controllers/adminController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";


const router = Router();


router.get(
    "/dashboard",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    getAdminDashboard
);


router.get(
    "/users",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    getAllUsers
);


export default router;