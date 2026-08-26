import ApiError from "../utils/ApiError.js";
import Notification from "../models/notificationModel.js"


const getMyNotificationsService = async (userId) => {

    const notifications = await Notification.find({
        recipient: userId
    })
    .populate("rental")
    .populate("payment")
    .populate("owner")
    .sort( {createdAt: -1} );

    return notifications;
};


const markNotificationAsReadServices = async (id, userId) => {

    const notification = await Notification.findById(id);

    if(!notification)
        throw new ApiError(404, "Notification doesn't exist");

    // Check if the logged-in user is the recipient
    if(!notification.recipient.equals(userId))
        throw new ApiError(403, "You are not authorized to update this notification");

    notification.isRead = true;
    await notification.save();
    return notification;
};


export {
    getMyNotificationsService,
    markNotificationAsReadServices,
}