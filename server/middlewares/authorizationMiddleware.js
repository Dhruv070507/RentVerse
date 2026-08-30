import ApiError from "../utils/ApiError.js";

const authorizationMiddleware = (...allowedRoles) => {

    return (req, res, next) => {

        if (!req.user) {
            throw new ApiError(
                401,
                "User is not authenticated"
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(
                403,
                "You are not authorized to perform this action"
            );
        }

        // Continue to the next middleware or route handler
        next();
    };
};

export default authorizationMiddleware;