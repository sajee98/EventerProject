import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Standard imports
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import UserProtectedRoute from "../components/user/UserProtectedRoute.jsx";

// Lazy loaded components
const About = lazy(() => import("../pages/user/About"));
const Services = lazy(() => import("../pages/user/Service"));
const Category = lazy(() => import("../pages/user/Category"));
const VendorDetails = lazy(() => import("../pages/user/VendorDetails"));
const Checkout = lazy(() => import("../pages/user/Checkout"));

//userProfile
import UserProfileLayout from "../Layouts/UserProfileLayout";
import Dashboard from "../pages/userProfile/Dashboard";
import VendorRegister from "../pages/userProfile/VendorRegister.jsx";

//admin

import AdminProtectedRoute from "../components/admin/AdminProtectedRoute.jsx";
import AdminLayout from "../Layouts/AdminLayout";
import AdminLogin from "../pages/admin/Login";

const Vendors = lazy(() => import("../pages/userProfile/Vendor"));

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Suspense is required around lazy-loaded components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="category" element={<Category />} />
            <Route path="vendor" element={<VendorDetails />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="admin/login" element={<AdminLogin />} />
          {/* user Profile Routes */}
          <Route element={<UserProtectedRoute />}>
            <Route path="/user" element={<UserProfileLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="vendor-register" element={<VendorRegister />} />
            </Route>
          </Route>

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="vendor-register" element={<VendorRegister />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
