import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';



// Standard imports
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/user/Home";

// Lazy loaded components
const About = lazy(() => import("../pages/user/About"));
const Services = lazy(() => import("../pages/user/Service"));
const Category = lazy(() => import("../pages/user/Category"));
const VendorDetails =lazy(() => import("../pages/user/VendorDetails"))

//admin
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";

const Vendors = lazy(() => import("../pages/admin/Vendor"));

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
          </Route>

          {/* Admin Routes */}
       <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
            <Route path="vendors" element={<Vendors />} />
        </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;