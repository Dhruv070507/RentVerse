import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const authenticationMiddleware = asyncHandler(async(req, res, next) => {
    // Checking if the authorization header is present and starts with "Bearer "
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Access token is required",
            success: false,
        });
    }


    /**  Extracting the token from the authorization header
      authHeader is in the format "Bearer <token>",
      so we split it by space and take the second part which is the token
    **/
    const token = authHeader.split(" ")[1];

    // verify is a jwt method that verifies the token using the secret key and returns the decoded payload if the token is valid
    const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
    )

    if(!user){
        return res.status(401).json({
            message: "User not found",
            success: false,
        });
    }

    // Attaching the user object to the request object for use in subsequent middleware or route handlers
    req.user = user;

    // Continue to the next middleware or route handler
    next();
});


export default authenticationMiddleware;