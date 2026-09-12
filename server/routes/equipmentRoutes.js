import { Router } from "express";

import {
    addEquipment,
    getAllEqipments,
    getEquimentById,
    updateEquipment,
    deleteEquipment
} from "../controllers/equipmentController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";


const router = Router();


router.post("/add", authenticationMiddleware, upload.array("images", 5), addEquipment);
router.get("/:id", getEquimentById);
router.get("/", getAllEqipments);
router.put("/:id", authenticationMiddleware, updateEquipment);
router.delete("/:id", authenticationMiddleware, deleteEquipment);


export default router;