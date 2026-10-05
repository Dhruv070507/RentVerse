import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    registerUserService,
    loginUserService,
    logoutUserService,
    forgotPasswordService,
    resetPasswordService,
} from "../services/userService.js";


// Register
const userRegister = asyncHandler(async (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const user = await registerUserService({
        ...req.body,
        profileImage: req.file
    });

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


// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const result = await forgotPasswordService(email);

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Password reset link sent successfully"
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


const resetPassword = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    const result = await resetPasswordService(
        token,
        password
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            "Password reset successfully"
        )
    );
});


export {
    userRegister,
    userLogin,
    forgotPassword,
    getProfile,
    logoutUser,
    resetPassword,
};