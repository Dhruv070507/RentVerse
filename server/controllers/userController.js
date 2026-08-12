import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js"
import ApiResponse from "../utils/ApiResponse.js";
import generateAccessAndRefreshTokens from "../utils/generateTokens.js";

// Register
const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password, profileImage, address } = req.body;

    // getting all user info according to Usermodel
    if (
        [username, email, password].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    
    // Checking if user is already exists
    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new ApiError(409, "User with this email already exists")
    }


    // Creating a user
    const user = await User.create(
        {
            username,
            email,
            password,
            profileImage,
            address
        }
    );


    // Checking if the user is created or not
    if(!user){
        throw new ApiError(500, "something went wrong while registering the user");
    }

    // Removing the password from the Response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // Sending the response to client
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );

});


// Login
const userLogin = asyncHandler(async (req, res) => {
    // Getting user data
    const {email, password} = req.body;

    // Checking for 1   
    if(!email)
        return new ApiError(400, "Email is required");
    if(!password)
        return new ApiError(400, "Password is required");


    const user = await User.findOne({email});

    // Checking if user exists or not
    if(!user)
        return new ApiError(401, "Invalid email or password")

    // checking password from the User model method
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect)
        return new ApiError(401, "Invalid email or password");

    // Generating access and refresh tokens from the utils/generateTokens.js file
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: loggedUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully",
        )
    )
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