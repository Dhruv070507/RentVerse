import { Router } from "express";

import {
    createCategoryRequest,
    getMyCategoryRequests,
    getAllCategoryRequests,
    approveCategoryRequest,
    rejectCategoryRequest
} from "../controllers/categoryRequestController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";

const router = Router();

// User routes
router.post("/", authenticationMiddleware, createCategoryRequest);
router.get("/my-requests", authenticationMiddleware, getMyCategoryRequests);

// Admin routes
router.get("/admin", authenticationMiddleware, authorizationMiddleware("admin"), getAllCategoryRequests);
router.patch("/admin/:id/approve", authenticationMiddleware, authorizationMiddleware("admin"), approveCategoryRequest);
router.patch("/admin/:id/reject", authenticationMiddleware, authorizationMiddleware("admin"), rejectCategoryRequest);

export default router;