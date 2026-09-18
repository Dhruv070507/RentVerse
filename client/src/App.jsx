import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import UserDashboard from "./pages/user/Dashboard.jsx";
import Equipment from "./pages/user/Equipment.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>

                    <Route path="/dashboard" element={<UserDashboard />} />

                    <Route path="/equipment" element={<Equipment />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;