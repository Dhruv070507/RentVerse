import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    createNotificationService,
    getMyNotificationsService,
    markNotificationAsReadServices,
} from "../services/notificationService.js"


const getMyNotification = asyncHandler(async (req, res) =>{
    const notification = await getMyNotificationsService(
        req.user._id    
    );

    return res.status(200).json(
        new ApiResponse (
            200,
            notification,
            "Notification fetched successfully"
        )
    );
});


const markNotificationAsRead = asyncHandler(async (req, res) =>{
    const {id} = req.params;

    const notification = await markNotificationAsReadServices(
        id,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            notification,
            "Notification marked as read successfully"
        )
    )
})


export {
    markNotificationAsRead,
    getMyNotification,
}