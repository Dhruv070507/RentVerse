import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/login.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import UserDashboard from "./pages/user/Dashboard.jsx";
import Equipments from "./pages/user/Equipment.jsx";
import EquipmentDetails from "./pages/user/EquipmentDetails.jsx";
import RentEquipment from "./pages/user/RentEquipment.jsx";
import MyRentals from "./pages/user/MyRentals.jsx";
import RentalRequests from "./pages/user/RentalRequest.jsx";
import Payments from "./pages/user/payments";
import MyEquipment from "./pages/user/MyEquipment.jsx";
import EditEquipment from "./pages/user/EditEquipment";
import Payment from "./pages/payment/payment.jsx";
import PaymentSuccess from "./pages/payment/PaymentSuccess.jsx";
import PaymentFailed from "./pages/payment/paymentFailed.jsx";
import AgentDashboard from "./pages/agent/agentDashboard.jsx";
import DeliveryDetails from "./pages/agent/deliveryDetails.jsx";
import DeliveryHistory from "./pages/agent/deliveryHistory.jsx"


function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Normal User Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["user"]} />}>

                    <Route path="/dashboard" element={<UserDashboard />} />

                    <Route path="/equipments" element={<Equipments />} />

                    <Route path="/equipment/:id" element={<EquipmentDetails />} />

                    <Route path="/equipment/:id/rent" element={<RentEquipment />} />
                    
                    <Route path="/my-rentals" element={<MyRentals />} />

                    <Route path="/rental-requests" element={<RentalRequests />} />

                    <Route path="/payments" element={<Payments />} />

                    <Route path="/my-equipments" element={<MyEquipment />} />

                    <Route path="/edit-equipment/:id" element={<EditEquipment />} />

                    <Route path="/payment/success" element={<PaymentSuccess />} />

                    <Route path="/payment/failure" element={<PaymentFailed />} />

                    <Route path="/payment/:rentalId" element={<Payment />} />

                </Route>

                {/* Delivery Agent Routes */}
                <Route element={<ProtectedRoute allowedRoles={["delivery_agent"]} />}>

                    <Route path="/agent/dashboard" element={<AgentDashboard />} />

                    <Route path="/agent/delivery/:id" element={<DeliveryDetails />} />

                    <Route path="/agent/delivery/history" element={<DeliveryHistory />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;