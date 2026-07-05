import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  X,
  Sparkles,
} from "lucide-react";

// Add / remove items here as your routes grow.
const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/bookings", label: "Bookings", icon: Ticket },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/vendors", label: "Vendors", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function Sidebar({ isOpen = false, onClose = () => {} }) {
  const linkClass = ({ isActive }) =>
    [
      "group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-[#262143] text-white"
        : "text-[#9490AC] hover:bg-[#1F1B36] hover:text-[#EDEBF7]",
    ].join(" ");

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={[
          "fixed z-40 flex h-screen w-72 flex-col bg-[#14121F] px-5 py-6",
          "border-r border-[#241F3B] transition-transform duration-300 ease-in-out",
          "md:sticky md:top-0 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5A623] to-[#E6417A]">
              <Sparkles size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="font-[600] text-xl tracking-tight text-white">
              Eventer
              <span className="ml-1 font-normal text-[#9490AC]">Admin</span>
            </h1>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#9490AC] hover:bg-[#1F1B36] hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Section label */}
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#5F5A78]">
          Main menu
        </p>

        {/* Menu */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass} onClick={onClose}>
              {({ isActive }) => (
                <>
                  {/* spotlight indicator */}
                  <span
                    className={[
                      "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#F5A623] transition-all duration-200",
                      isActive ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />
                  <Icon
                    size={18}
                    className={isActive ? "text-[#F5A623]" : "text-[#726D8C] group-hover:text-[#EDEBF7]"}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

           <div>
<Link
  to="/admin/vendor-register"
  className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 transition-all bg-amber-200 duration-200 hover:bg-violet-600/10 hover:text-white"
>
  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gray-900 transition-colors duration-200 group-hover:bg-violet-600 group-hover:text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-[18px] w-[18px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5V4H2v16h5m10 0v-4a3 3 0 00-3-3H10a3 3 0 00-3 3v4m10 0H7m10-10a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  </span>
  Register as Vendor
</Link>
</div>
        {/* Footer card */}
        <div className="mt-6 rounded-xl bg-[#1C1830] p-4">
          <p className="text-xs font-medium text-[#9490AC]">Need help?</p>
          <p className="mt-1 text-sm text-[#EDEBF7]">Check the docs or contact support.</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;