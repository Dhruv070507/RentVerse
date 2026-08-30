import ApiError from "../utils/ApiError.js";
import Notification from "../models/notificationModel.js"


const createNotificationService = async (notificationData) => {

    const {
        receiver,
        type,
        message,
        rental,
        payment
    } = notificationData;

    const notification = await Notification.create({
        receiver,
        type,
        message,
        rental,
        payment
    });

    return notification;
};


const getMyNotificationsService = async (userId) => {

    const notifications = await Notification.find({
        receiver: userId
    })
    .populate("rental")
    .populate("payment")
    .sort( {createdAt: -1} );

    return notifications;
};


const markNotificationAsReadServices = async (id, userId) => {

    const notification = await Notification.findById(id);

    if(!notification)
        throw new ApiError(404, "Notification doesn't exist");

    // Check if the logged-in user is the receiver
    if(!notification.receiver.equals(userId))
        throw new ApiError(403, "You are not authorized to update this notification");

    notification.isRead = true;
    await notification.save();
    return notification;
};


export {
    createNotificationService,
    getMyNotificationsService,
    markNotificationAsReadServices,
}