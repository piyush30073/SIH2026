import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold">SIH2026</h1>
            <p className="text-sm text-slate-400">
              Athlete Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl font-bold">
          Welcome, {user.name || "Athlete"} 👋
        </h2>

        <p className="mt-2 text-slate-400">
          Your athlete ecosystem will appear here.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Injury Prevention</h3>
            <p className="mt-2 text-sm text-slate-400">
              AI posture analysis
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Recovery</h3>
            <p className="mt-2 text-sm text-slate-400">
              Track rehabilitation progress
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="font-semibold">Nutrition</h3>
            <p className="mt-2 text-sm text-slate-400">
              Personalized diet planning
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;