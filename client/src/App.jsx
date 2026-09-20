import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import UserDashboard from "./pages/user/Dashboard.jsx";
import Equipments from "./pages/user/Equipment.jsx";
import EquipmentDetails from "./pages/user/EquipmentDetails.jsx";
import RentEquipment from "./pages/user/RentEquipment.jsx";


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

                    <Route path="/equipments" element={<Equipments />} />

                    <Route path="/equipment/:id" element={<EquipmentDetails />} />

                    <Route path="/equipment/:id/rent" element={<RentEquipment />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;