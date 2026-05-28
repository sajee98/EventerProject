import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

const navLinkClass = ({ isActive }) =>
  isActive
    ? "bg-[#789667] text-white px-4 py-2 rounded-[8px] font-semibold transition"
    : "text-gray-700 hover:bg-gray-100 hover:text-[#789667] px-4 py-2 rounded-[8px] transition";

  return (
    <nav className="bg-white shadow-md font-[Poppins]">
      
      <div className="max-w-300 mx-auto px-4 py-4 flex items-center justify-between">

        {/* LEFT - LOGO */}
        <h1 className="text-2xl font-bold text-[#789667]" style={{fontFamily: "Playfair Display, serif"}}>
          Eventer
        </h1>

        {/* CENTER - DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-[15px]">

          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

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
            onClick={() => navigate("/user/dashboard")}
            className="text-gray-700 hover:text-[#789667] text-xl transition"
          >
            <FaUser />
          </button>

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
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-[15px]">

          <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/services" onClick={() => setMenuOpen(false)} className={navLinkClass}>Services</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={navLinkClass}>Contact</NavLink>

        </div>
      )}

    </nav>
  );
}

export default Navbar;