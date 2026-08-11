import User from "../models/userModel.js";
import ApiError from "./ApiError.js";

const generateAccessAndRefreshTokens = async (userId) => {
    // Finding the user
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Generating access and refresh tokens from User model methods
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Saving refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Returning generated tokens
    return {
        accessToken,
        refreshToken,
    };
};

export default generateAccessAndRefreshTokens;