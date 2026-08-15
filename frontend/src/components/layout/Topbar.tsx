import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const openMobileSidebar = () => {
    window.dispatchEvent(
      new Event("open-mobile-sidebar")
    );
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Overview";

      case "/injury-prevention":
        return "Injury Prevention";

      case "/recovery":
        return "Recovery";

      case "/nutrition":
        return "Nutrition";

      case "/performance":
        return "Performance";

      case "/profile":
        return "Profile";

      default:
        return "Overview";
    }
  };

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 text-white sm:px-6">

      {/* Left section */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile menu */}
        <button
          type="button"
          onClick={openMobileSidebar}
          aria-label="Open navigation"
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-900 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Page title */}
        <div className="min-w-0">
          <p className="hidden text-sm text-slate-500 sm:block">
            Athlete Workspace
          </p>

          <h2 className="truncate text-base font-semibold sm:text-lg">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-900 hover:text-white"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-2 sm:gap-3 sm:pl-4">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
            {user.name?.charAt(0)?.toUpperCase() ||
              "A"}
          </div>

          <div className="hidden text-left sm:block">
            <p className="max-w-32 truncate text-sm font-medium">
              {user.name || "Athlete"}
            </p>

            <p className="max-w-32 truncate text-xs text-slate-500">
              {user.fitnessGoal ||
                "General Fitness"}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-500 sm:block"
          />
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          aria-label="Logout"
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={19} />
        </button>

      </div>
    </header>
  );
};

export default Topbar;