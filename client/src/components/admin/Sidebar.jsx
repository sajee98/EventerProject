import { NavLink } from "react-router-dom";

function Sidebar() {
  const navClass = ({ isActive }) =>
    isActive
      ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
      : "text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg";

  return (
    <div className="w-64 min-h-screen bg-gray-900 p-5">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-white mb-10">
        Eventer Admin
      </h1>

      {/* Menu */}
      <div className="flex flex-col gap-3">

        <NavLink to="/admin/dashboard" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" className={navClass}>
          Users
        </NavLink>

        <NavLink to="/admin/vendors" className={navClass}>
          Vendors
        </NavLink>

        <NavLink to="/admin/events" className={navClass}>
          Events
        </NavLink>

        <NavLink to="/admin/bookings" className={navClass}>
          Bookings
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;