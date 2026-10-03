import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/auth/login.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AddEquipment from "./pages/Equipment/addEquipment.jsx";
import Equipments from "./pages/Equipment/Equipment.jsx";
import EquipmentDetails from "./pages/Equipment/EquipmentDetails.jsx";
import RentEquipment from "./pages/Rentals/RentEquipment.jsx";
import MyRentals from "./pages/Rentals/MyRentals.jsx";
import RentalRequests from "./pages/Rentals/RentalRequest.jsx";
import Payments from "./pages/payment/payments.jsx";
import MyEquipment from "./pages/Equipment/MyEquipment.jsx";
import EditEquipment from "./pages/Equipment/EditEquipment.jsx";
import Payment from "./pages/payment/payment.jsx";
import PaymentSuccess from "./pages/payment/PaymentSuccess.jsx";
import PaymentFailed from "./pages/payment/paymentFailed.jsx";
import AgentDashboard from "./pages/agent/agentDashboard.jsx";
import DeliveryDetails from "./pages/agent/deliveryDetails.jsx";
import DeliveryHistory from "./pages/agent/deliveryHistory.jsx";
import AdminDashboard from "./pages/admin/adminDashboard.jsx";
import AdminUsers from "./pages/admin/adminUsers.jsx";
import AdminRentals from "./pages/admin/adminRentals.jsx";
import AdminDeliveries from "./pages/admin/adminDeliveries.jsx";
import AdminEquipment from "./pages/admin/adminEquipment.jsx";
import Notifications from "./pages/notifications/Notifications.jsx";
import AdminCategories from "./pages/admin/adminCategories.jsx";
import About from "./pages/About.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Contact from "./pages/Contact.jsx";



function App() {
    return (
        <BrowserRouter>
            <Routes>


                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/contact" element={<Contact />} />


                {/* Normal User Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={["user"]} />}>


                    <Route path="/add-equipment" element={<AddEquipment />} />


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




                {/* Notification Routes */}
                <Route element={<ProtectedRoute allowedRoles={["user", "delivery_agent"]} />}>


                    <Route path="/notifications" element={<Notifications />} />
                   
                </Route>




                {/* admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>


                    <Route path="/admin/dashboard" element={<AdminDashboard/>} />


                    <Route path="/admin/users" element={<AdminUsers/>} />


                    <Route path="/admin/rentals" element={<AdminRentals/>} />  


                    <Route path="/admin/deliveries" element={<AdminDeliveries/>} />


                    <Route path="/admin/equipment" element={<AdminEquipment/>} />


                    <Route path="/admin/categories" element={<AdminCategories/>} />
                </Route>


            </Routes>
        </BrowserRouter>
    );
}


export default App;

