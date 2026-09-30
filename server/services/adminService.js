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


export {
    getAdminDashboardService,
    getAllUsersService
};