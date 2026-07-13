import { NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-[#fff] font-medium bg-[#648855] px-2 py-1 rounded"
        : "text-gray-700 hover:text-[#789667]"
    }`;

  const handleUserIconClick = () => {
    if (user) {
      navigate("/user/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-1 left-1/2 -translate-x-1/2 w-[95%] h-[60px] max-w-[1200px] bg-white/90 backdrop-blur-sm shadow-md rounded-[8px] z-50 font-[Poppins]">
        <div className="h-full max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          {/* LEFT - LOGO */}
          <h1
            className="text-xl md:text-2xl font-bold text-[#789667] cursor-pointer"
            style={{ fontFamily: "Playfair Display, serif" }}
            onClick={() => navigate("/")}
          >
            Eventer
          </h1>

          {/* CENTER - DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-[15px]">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>

          {/* RIGHT - ICONS */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/wishlist")}
              className="text-gray-700 hover:text-red-500 text-xl transition"
            >
              <FaHeart />
            </button>

            <button
              onClick={handleUserIconClick}
              className="text-gray-700 hover:text-[#789667] text-xl transition"
              title={user ? "Admin panel" : "Log in"}
            >
              <FaUser />
            </button>

            {/* Only shown when logged in */}
            {user && (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500 text-xl transition"
                title="Log out"
              >
                <FaSignOutAlt />
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="absolute top-[65px] left-0 w-full md:hidden bg-white rounded-[8px] shadow-lg border border-gray-100 px-6 py-4 flex flex-col gap-4 text-[15px]">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Services
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Contact
            </NavLink>

            {user && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-left text-red-600 font-medium"
              >
                Log out
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-[70px]" />
    </>
  );
}