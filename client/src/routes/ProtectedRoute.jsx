// ProtectedRoute is a route component that protects other 
// routes from being accessed without authentication or proper role

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
    /* useSelector is a hook that allows us to access the state
    of the app from the store. It takes a function as an argument that returns the part of the state we want to access.
    In this case, we want to access the isAuthenticated property
    and user information from the auth slice of the state.*/
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    /* Check if allowedRoles is provided.
    If it is provided, check whether the logged-in user's role
    exists inside the allowedRoles array. */
    if (allowedRoles && !allowedRoles.includes(user?.role)) {

        /* If the logged-in user is a delivery agent but is trying
        to access a route that is not allowed for them,
        redirect them to the agent dashboard. */
        if (user?.role === "delivery_agent") {
            return (
                <Navigate
                    to="/agent/dashboard"
                    state={{
                        accessDenied: true,
                        message: "You can't access this page."
                    }}
                    replace
                />
            );
        }

        /* If the user has another role and doesn't have permission
        to access the requested route, redirect them to the home page. */
        return (
            <Navigate
                to="/"
                state={{
                    accessDenied: true,
                    message: "You can't access this page."
                }}
                replace
            />
        );
    }

    // Render whichever child route is being requested
    return <Outlet />;
};

export default ProtectedRoute;