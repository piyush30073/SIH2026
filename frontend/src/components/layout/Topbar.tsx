import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-6 text-white">
      {/* Page title */}
      <div>
        <p className="text-sm text-slate-500">Athlete Workspace</p>
        <h2 className="text-lg font-semibold">Overview</h2>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-slate-900 hover:text-white"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
            {user.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium">
              {user.name || "Athlete"}
            </p>

            <p className="text-xs text-slate-500">
              {user.fitnessGoal || "General Fitness"}
            </p>
          </div>

          <ChevronDown size={16} className="text-slate-500" />
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          className="rounded-xl p-2.5 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={19} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;