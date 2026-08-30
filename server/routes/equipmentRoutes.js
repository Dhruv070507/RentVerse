import { Router } from "express";
import { addEquipment, 
        getAllEqipments, 
        getEquimentById, 
        updateEquipment,
        deleteEquipment } from "../controllers/equipmentController.js";

import authenticationMiddleware from "../middlewares/authenticationMiddleware.js";

const router = Router();

router.route("/add").post(authenticationMiddleware, addEquipment);
router.route("/:id").get(getEquimentById);
router.route("/").get(getAllEqipments);
router.route("/:id").put(authenticationMiddleware, updateEquipment);
router.route("/:id").delete(authenticationMiddleware, deleteEquipment);



export default router;