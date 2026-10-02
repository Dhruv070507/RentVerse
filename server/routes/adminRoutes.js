import { Router } from "express";

import {
    getAdminDashboard,
    getAllUsers,
    getUnassignedDeliveries,
    getDeliveryAgents,
    unassignDeliveryAgent,
    getAllRentals,
    getAllDeliveries,
    getAllEquipment,
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


router.get(
    "/deliveries/unassigned",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    getUnassignedDeliveries
);


router.get(
    "/delivery-agents",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    getDeliveryAgents
);


router.patch(
    "/deliveries/:id/unassign",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    unassignDeliveryAgent
);


router.get(
    "/rentals",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    getAllRentals
);


router.get(
    "/deliveries",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    getAllDeliveries
);


router.get(
    "/equipment",
    authenticationMiddleware,
    authorizationMiddleware("admin"),
    getAllEquipment
);


export default router;