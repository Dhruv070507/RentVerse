import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js"
import ApiResponse from "../utils/ApiResponse.js";

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
    const user = User.create(
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
    const createdUser = await User.findById(user._id);

    // Sending the response to client
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );

});

export default userRegister