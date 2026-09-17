// ProtectedRoute is a route component that protects other 
// routes from being accessed without authentication

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    /* useSelector is a hook that allows us to access the state
    of the app from the store. It takes a function as an argument that returns the part of the state we want to access.
    In this case, we want to access the isAuthenticated property from the auth slice of the state.*/
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render whichever child route is being requested
    return <Outlet />;
};

export default ProtectedRoute;