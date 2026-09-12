import ApiError from "../utils/ApiError.js";
import User from "../models/userModel.js";
import generateAccessAndRefreshTokens from "../utils/generateTokens.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

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


export {
    registerUserService,
    loginUserService
};