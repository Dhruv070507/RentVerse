import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    registerUserService,
    loginUserService,
    logoutUserService,
} from "../services/userService.js";


// Register
const userRegister = asyncHandler(async (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const user = await registerUserService({
        ...req.body,
        profileImage: req.file
    });

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


const logoutUser = asyncHandler(async (req, res) => {

    await logoutUserService(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "User logged out successfully"
        )
    );
});


export {
    userRegister,
    userLogin,
    getProfile,
    logoutUser,
};