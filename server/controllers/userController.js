import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    registerUserService,
    loginUserService
} from "../services/userService.js";

// Register
const userRegister = asyncHandler(async (req, res) => {

    const user = await registerUserService(req.body);

    // Sending the response to client
    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            "User registered successfully"
        )
    );
});


// Login
const userLogin = asyncHandler(async (req, res) => {

    const result = await loginUserService(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "User logged in successfully",
        )
    );
});


const getProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Authenticated user profile fetched successfully"
        )
    );
});


export {
    userRegister,
    userLogin,
    getProfile
};