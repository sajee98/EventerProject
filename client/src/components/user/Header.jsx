import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Header({ onMenuClick = () => {} }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
      navigate("/", { replace: true });
    } finally {
      setLoggingOut(false);
      setProfileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#EDEBF7] bg-white/80 px-4 py-3.5 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#5F5A78] hover:bg-[#F4F2FA] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-[#1C1830] sm:text-xl">
            Dashboard
          </h2>
          <p className="hidden text-xs text-[#8A85A0] sm:block">
            Here's what's happening with your events today.
          </p>
        </div>
      </div>

      {/* Search - hidden on small screens */}
      <div className="relative hidden flex-1 max-w-sm md:block">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#B0ACC4]"
        />
        <input
          type="text"
          placeholder="Search bookings, events..."
          className="w-full rounded-lg border border-[#E9E6F2] bg-[#FAFAFC] py-2 pl-9 pr-3 text-sm text-[#1C1830] placeholder:text-[#B0ACC4] focus:border-[#7C6AEF] focus:outline-none focus:ring-2 focus:ring-[#7C6AEF]/20"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="relative rounded-lg p-2 text-[#5F5A78] hover:bg-[#F4F2FA]"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#F5A623] ring-2 ring-white" />
        </button>

        <div className="hidden h-6 w-px bg-[#E9E6F2] sm:block" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-[#F4F2FA]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7C6AEF] to-[#E6417A] text-sm font-semibold text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="hidden text-sm font-medium text-[#1C1830] sm:block">
              {user?.name || "Account"}
            </span>
            <ChevronDown size={15} className="hidden text-[#8A85A0] sm:block" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-[#EDEBF7] bg-white py-1.5 shadow-lg">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[#443F5C] hover:bg-[#F4F2FA]"
                >
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[#E5484D] hover:bg-[#FDF0F0] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut size={16} />
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;