import {
  Activity,
  ArrowUpRight,
  HeartPulse,
  ShieldAlert,
  Utensils,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const Dashboard = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // ==========================================
  // TEMPORARY WORKOUT API TEST
  // ==========================================

  const testWorkout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No login token found. Please login first.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/workouts",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            exercise: "Running",
            duration: 30,
            intensity: "moderate",
            calories: 250,
            completed: true,
          }),
        }
      );

      const data = await response.json();

      console.log("Workout response:", data);

      if (!response.ok) {
        alert(
          data.message ||
            "Workout creation failed"
        );

        return;
      }

      alert("Workout created successfully!");

    } catch (error) {
      console.error(
        "Workout error:",
        error
      );

      alert(
        "Unable to connect to backend"
      );
    }
  };

  // ==========================================
  // DASHBOARD STATS
  // ==========================================

  const stats = [
    {
      title: "Injury Risk",
      value: "23%",
      label: "Low risk",
      icon: ShieldAlert,
    },
    {
      title: "Recovery",
      value: "78%",
      label: "On track",
      icon: HeartPulse,
    },
    {
      title: "Fitness Score",
      value: "82",
      label: "+6 this week",
      icon: Activity,
    },
    {
      title: "Energy",
      value: "91%",
      label: "Excellent",
      icon: Utensils,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="flex min-h-screen">

        {/* ======================================
            SIDEBAR
        ====================================== */}

        <Sidebar />

        <div className="min-w-0 flex-1">

          {/* ======================================
              TOPBAR
          ====================================== */}

          <Topbar />

          <main className="px-6 py-8 lg:px-8">

            {/* ======================================
                WELCOME
            ====================================== */}

            <section>

              <p className="text-sm font-medium text-blue-400">
                Athlete Overview
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Good morning,{" "}
                {user.name || "Athlete"} 👋
              </h1>

              <p className="mt-2 max-w-2xl text-slate-400">
                Here's a quick overview of your
                training, recovery and injury
                prevention status.
              </p>

            </section>

            {/* ======================================
                STATS
            ====================================== */}

            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-sm text-slate-500">
                          {stat.title}
                        </p>

                        <p className="mt-3 text-3xl font-bold">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-xs text-emerald-400">
                          {stat.label}
                        </p>

                      </div>

                      <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                        <Icon size={20} />
                      </div>

                    </div>

                  </div>
                );
              })}

            </section>

            {/* ======================================
                MAIN GRID
            ====================================== */}

            <section className="mt-6 grid gap-6 xl:grid-cols-3">

              {/* ==================================
                  PERFORMANCE
              ================================== */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-lg font-semibold">
                      Performance Overview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Your training performance
                      this week
                    </p>

                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                  >
                    View details
                    <ArrowUpRight size={16} />
                  </button>

                </div>

                {/* Temporary chart */}

                <div className="mt-8 flex h-64 items-end gap-3">

                  {[
                    42,
                    55,
                    48,
                    67,
                    61,
                    76,
                    84,
                  ].map(
                    (height, index) => (

                      <div
                        key={index}
                        className="flex flex-1 flex-col items-center gap-3"
                      >

                        <div
                          className="w-full max-w-12 rounded-t-lg bg-blue-500/60 transition hover:bg-blue-400"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                        <span className="text-xs text-slate-600">
                          {
                            [
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat",
                              "Sun",
                            ][index]
                          }
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* ==================================
                  INJURY RISK
              ================================== */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                    <ShieldAlert size={21} />
                  </div>

                  <div>

                    <h2 className="font-semibold">
                      Injury Prevention
                    </h2>

                    <p className="text-sm text-slate-500">
                      Latest assessment
                    </p>

                  </div>

                </div>

                <div className="mt-8 text-center">

                  <div className="text-5xl font-bold">
                    23%
                  </div>

                  <p className="mt-2 text-sm text-emerald-400">
                    Low injury risk
                  </p>

                </div>

                <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-800">

                  <div className="h-full w-[23%] rounded-full bg-emerald-500" />

                </div>

                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium transition hover:bg-blue-500"
                >
                  Start AI Posture Scan

                  <ArrowUpRight size={17} />
                </button>

              </div>

            </section>

            {/* ======================================
                QUICK ACTIONS
            ====================================== */}

            <section className="mt-6 grid gap-4 md:grid-cols-3">

              {/* Recovery */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <HeartPulse
                  className="text-rose-400"
                  size={22}
                />

                <h3 className="mt-4 font-semibold">
                  Today's Recovery
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  4 of 5 exercises completed
                </p>

                <div className="mt-4 h-2 rounded-full bg-slate-800">

                  <div className="h-full w-[80%] rounded-full bg-rose-400" />

                </div>

              </div>

              {/* Nutrition */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <Utensils
                  className="text-emerald-400"
                  size={22}
                />

                <h3 className="mt-4 font-semibold">
                  Nutrition
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  2,850 kcal planned today
                </p>

                <button
                  type="button"
                  className="mt-4 text-sm text-blue-400 hover:text-blue-300"
                >
                  View meal plan →
                </button>

              </div>

              {/* Training */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <Activity
                  className="text-blue-400"
                  size={22}
                />

                <h3 className="mt-4 font-semibold">
                  Training
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Next session: Upper Body
                </p>

                <button
                  type="button"
                  onClick={testWorkout}
                  className="mt-4 text-sm text-blue-400 hover:text-blue-300"
                >
                  Test Workout →
                </button>

              </div>

            </section>

          </main>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;