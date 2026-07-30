import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";


function App() {
  return (
    <>
      <Navbar />
    <Routes>

  <Route path="/" element={<Home />} />

  <Route path="/services" element={<Services />} />

  <Route path="/login" element={<Login />} />

  <Route path="/signup" element={<Signup />} />

  <Route
    path="/services/:id"
    element={<ServiceDetails />}
/>

     <Route
    path="/customer"
    element={
        <ProtectedRoute>
            <CustomerDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/provider-dashboard"
    element={
        <ProtectedRoute>
            <ProviderDashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin"
    element={
        <ProtectedRoute>
            <AdminDashboard />
        </ProtectedRoute>
    }
/>

<Route
    path="/booking/:id"
    element={<Booking />}
/>

<Route
  path="/my-bookings"
  element={<MyBookings />}
/>
    </Routes>
</>
    
  );
}

export default App;