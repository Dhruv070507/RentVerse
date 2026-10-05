import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";
import generateAccessAndRefreshTokens from "../utils/generateTokens.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// Register
const registerUserService = async ({
    username,
    email,
    password,
    profileImage,
    address,
}) => {

    // getting all user info according to Usermodel
    if ([username, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Checking if user is already exists
    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new ApiError(409, "User with this email already exists");
    }

    let profileImageUrl = "";

    // Uploading profile image to Cloudinary if provided
    if(profileImage){

        console.log("PROFILE IMAGE:", profileImage);
        console.log("PROFILE IMAGE PATH:", profileImage.path);

        const result = await uploadToCloudinary(
            profileImage.path,
            "rentVerse/userProfileImages"
        );

        console.log("CLOUDINARY RESULT:", result);

        profileImageUrl = result.secure_url;

        console.log("PROFILE IMAGE URL:", profileImageUrl);
    }

    // Creating a user
    const user = await User.create(
        {
            username,
            email,
            password,
            profileImage: profileImageUrl,
            address
        }
    );

    // Checking if the user is created or not
    if(!user){
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }

    // Removing the password from the Response
    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return createdUser;
};

// Login
const loginUserService = async ({ email, password }) => {

    // Getting user data
    if(!email)
        throw new ApiError(400, "Email is required");

    if(!password)
        throw new ApiError(400, "Password is required");

    const user = await User.findOne({email});

    // Checking if user exists or not
    if(!user)
        throw new ApiError(401, "Invalid email or password")

    // checking password from the User model method
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect)
        throw new ApiError(401, "Invalid email or password");

    // Generating access and refresh tokens from the utils/generateTokens.js file
    const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    const loggedUser = await User.findById(user._id)
        .select("-password -refreshToken");

    return {
        user: loggedUser,
        accessToken,
        refreshToken
    };
};


const logoutUserService = async (userId) => {

    const user = await User.findById(userId);

    if(!user)
        throw new ApiError(404, "User doesn't exist");

    // clearing the refresh token so that use cant get new access
    // tokens after the logout
    user.refreshToken = "";

    // no validation is required bc only the refresh token is being cleard
    await user.save({ validateBeforeSave: false });

    return true;
};


const forgotPasswordService = async (email) => {
    const user = await User.findOne({
        email: email.toLowerCase().trim(),
    });

    if (!user) {
        throw new ApiError(
            404,
            "No account found with this email"
        );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
        to: user.email,
        subject: "Reset your RentVerse password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 30px; color: #0b1b34;">
                
                <h1 style="font-family: Georgia, serif;">
                    Reset your RentVerse password
                </h1>

                <p>
                    Hi ${user.username},
                </p>

                <p>
                    We received a request to reset your RentVerse password.
                </p>

                <p>
                    Click the button below to create a new password.
                </p>

                <div style="margin: 30px 0;">
                    <a
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            padding: 14px 24px;
                            background: #0b1b34;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: 600;
                        "
                    >
                        Reset Password
                    </a>
                </div>

                <p>
                    This link will expire in 15 minutes.
                </p>

                <p>
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

                <p style="color: #666; font-size: 13px;">
                    RentVerse — Equipment Rental Platform
                </p>

            </div>
        `,
    });

    return {
        message: "Password reset link sent to your email",
    };
};


const resetPasswordService = async (token, password) => {

    if (!password) {
        throw new ApiError(
            400,
            "New password is required"
        );
    }

    if (password.length < 6) {
        throw new ApiError(
            400,
            "Password must be at least 6 characters long"
        );
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    });

    if (!user) {
        throw new ApiError(
            400,
            "Password reset link is invalid or has expired"
        );
    }

    user.password = password;

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return {
        message: "Password reset successfully",
    };
};


export {
    registerUserService,
    loginUserService,
    logoutUserService,
    forgotPasswordService,
    resetPasswordService
};