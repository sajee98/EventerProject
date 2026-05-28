import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/sidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout() {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">

        <AdminNavbar />

        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminLayout;