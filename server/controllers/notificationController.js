import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
    createNotificationService,
    getMyNotificationsService,
    markNotificationAsReadServices,
    markAllNotificationsAsReadService,
} from "../services/notificationService.js"


const createNotification = asyncHandler(async (req, res) => {
    const notification = await createNotificationService(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            notification,
            "Notification created successfully"
        )
    );
})


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


const markAllNotificationsAsRead = asyncHandler(async (req, res) => {

    await markAllNotificationsAsReadService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "All notifications marked as read successfully"
        )
    );
});


export {
    createNotification,
    markNotificationAsRead,
    getMyNotification,
    markAllNotificationsAsRead,
}