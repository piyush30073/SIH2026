import {
  Activity,
  BarChart3,
  HeartPulse,
  LayoutDashboard,
  Salad,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Injury Prevention",
    path: "/injury-prevention",
    icon: Activity,
  },
  {
    name: "Recovery",
    path: "/recovery",
    icon: HeartPulse,
  },
  {
    name: "Nutrition",
    path: "/nutrition",
    icon: Salad,
  },
  {
    name: "Performance",
    path: "/performance",
    icon: BarChart3,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: UserRound,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-800 bg-slate-950 text-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <Activity size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold">TrainSafe</h1>
            <p className="text-xs text-slate-500">
              Athlete Health AI
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div className="border-t border-slate-800 p-4">
        <div className="rounded-xl bg-slate-900 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-slate-300">
              System Online
            </span>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            AI health monitoring is ready.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;