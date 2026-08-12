import { Router } from "express";
import { addEquipment } from "../controllers/equipmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/add").post(authMiddleware, addEquipment);


export default router;