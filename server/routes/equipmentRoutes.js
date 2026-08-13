import { Router } from "express";
import { addEquipment, 
        getAllEqipments, 
        getEquimentById, 
        updateEquipment,
        deleteEquipment } from "../controllers/equipmentController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/add").post(authMiddleware, addEquipment);
router.route("/:id").get(getEquimentById);
router.route("/").get(getAllEqipments);
router.route("/:id").put(authMiddleware, updateEquipment);
router.route("/:id").delete(authMiddleware, deleteEquipment);



export default router;