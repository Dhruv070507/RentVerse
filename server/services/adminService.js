import User from "../models/userModel.js";
import Equipment from "../models/equipmentModel.js";
import Rental from "../models/rentalModel.js";
import Delivery from "../models/deliveryModel.js";


const getAdminDashboardService = async () => {

    const totalUsers = await User.countDocuments();

    const deliveryAgents = await User.countDocuments({
        role: "delivery_agent"
    });

    const totalEquipment = await Equipment.countDocuments();

    const availableEquipment = await Equipment.countDocuments({
        availability: true
    });

    const totalRentals = await Rental.countDocuments();

    const pendingRentals = await Rental.countDocuments({
        status: "pending"
    });

    const approvedRentals = await Rental.countDocuments({
        status: "approved"
    });

    const completedRentals = await Rental.countDocuments({
        status: "completed"
    });

    const totalDeliveries = await Delivery.countDocuments();

    const pendingDeliveries = await Delivery.countDocuments({
        deliveryStatus: "pending"
    });

    const outForDelivery = await Delivery.countDocuments({
        deliveryStatus: "out_for_delivery"
    });

    const delivered = await Delivery.countDocuments({
        deliveryStatus: "delivered"
    });

    const returnScheduled = await Delivery.countDocuments({
        deliveryStatus: "return_scheduled"
    });

    const outForReturn = await Delivery.countDocuments({
        deliveryStatus: "out_for_return"
    });

    const returned = await Delivery.countDocuments({
        deliveryStatus: "returned"
    });


    return {
        users: {
            total: totalUsers,
            deliveryAgents
        },

        equipment: {
            total: totalEquipment,
            available: availableEquipment
        },

        rentals: {
            total: totalRentals,
            pending: pendingRentals,
            approved: approvedRentals,
            completed: completedRentals
        },

        deliveries: {
            total: totalDeliveries,
            pending: pendingDeliveries,
            outForDelivery,
            delivered,
            returnScheduled,
            outForReturn,
            returned
        }
    };
};


const getAllUsersService = async () => {

    const users = await User.find()
        .select("-password -refreshToken")
        .sort({ createdAt: -1 });

    return users;
};


const getUnassignedDeliveriesService = async () => {

    const deliveries = await Delivery.find({
        deliveryAgent: null,
        deliveryStatus: "pending"
    })
        .populate({
            path: "rental",
            populate: [
                {
                    path: "renter",
                    select: "username email"
                },
                {
                    path: "equipment",
                    select: "name"
                }
            ]
        })
        .sort({ createdAt: -1 });

    return deliveries;
};


const getDeliveryAgentsService = async () => {

    const agents = await User.find({
        role: "delivery_agent"
    })
        .select("_id username email address")
        .sort({ username: 1 });

    return agents;
};


const unassignDeliveryAgentService = async (deliveryId) => {

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
        throw new ApiError(
            404,
            "Delivery doesn't exist"
        );
    }

    delivery.deliveryAgent = null;

    await delivery.save();

    return delivery;
};


const getAllRentalsService = async () => {
    const rentals = await Rental.find()
        .populate("equipment")
        .populate("renter")
        .sort({ createdAt: -1 });

    return rentals;
};


const getAllDeliveriesService = async () => {

    const deliveries = await Delivery.find()
        .populate({
            path: "rental",
            populate: {
                path: "renter",
                select: "name email"
            }
        })
        .populate({
            path: "deliveryAgent",
            select: "name email"
        })
        .populate({
            path: "returnAgent",
            select: "name email"
        })
        .sort({ createdAt: -1 });

    return deliveries;
};


const getAllEquipmentService = async () => {

    const equipment = await Equipment.find()
        .populate("owner", "name email")
        .sort({ createdAt: -1 });

    return equipment;
};


export {
    getAdminDashboardService,
    getAllUsersService,
    getUnassignedDeliveriesService,
    getDeliveryAgentsService,
    unassignDeliveryAgentService,
    getAllRentalsService,
    getAllDeliveriesService,
    getAllEquipmentService,
};