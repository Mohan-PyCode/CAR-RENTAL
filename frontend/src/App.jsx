import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import BookingCheckout from "./pages/BookingCheckout.jsx";
import BookingSuccess from "./pages/BookingSuccess.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import Register from "./pages/Register.jsx";
import VehicleDetail from "./pages/VehicleDetail.jsx";
import VehicleList from "./pages/VehicleList.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/vehicles" element={<VehicleList />} />
      <Route path="/vehicles/:id" element={<VehicleDetail />} />
      <Route path="/checkout" element={<BookingCheckout />} />
      <Route path="/booking/success" element={<BookingSuccess />} />
      <Route path="/dashboard/customer" element={<CustomerDashboard />} />
      <Route path="/dashboard/owner" element={<OwnerDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
