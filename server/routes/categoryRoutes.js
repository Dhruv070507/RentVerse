import { Router } from "express";

import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router();


router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.post("/", authenticationMiddleware, createCategory);

router.patch("/:id", authenticationMiddleware, updateCategory);

router.delete("/:id", authenticationMiddleware, deleteCategory);


export default router;