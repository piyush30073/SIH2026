import { useEffect, useState } from "react";
import { Activity, CheckCircle2, Flame, Timer, Dumbbell } from "lucide-react";
import type { FormEvent } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import api from "../services/api";

interface Workout {
  _id: string;
  exercise: string;
  duration: number;
  intensity: "low" | "moderate" | "high";
  calories: number;
  completed: boolean;
  date: string;
}

const Performance = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState<"low" | "moderate" | "high">(
    "moderate",
  );
  const [calories, setCalories] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET WORKOUTS
  // ==========================================

  const fetchWorkouts = async () => {
    try {
      setFetching(true);
      setError("");

      const response = await api.get("/workouts");

      console.log("GET WORKOUTS RESPONSE:", response.data);

      setWorkouts(response.data.workouts || []);
    } catch (error: any) {
      console.error("GET WORKOUTS ERROR:", error);

      console.log("GET STATUS:", error.response?.status);

      console.log("GET RESPONSE:", error.response?.data);

      setError(error.response?.data?.message || "Unable to load workouts.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ==========================================
  // LOG WORKOUT
  // ==========================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!exercise.trim()) {
      setError("Please enter an exercise.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      setError("Please enter a valid duration.");
      return;
    }

    if (Number(calories) < 0) {
      setError("Calories cannot be negative.");
      return;
    }

    try {
      setLoading(true);

      const workoutData = {
        exercise: exercise.trim(),
        duration: Number(duration),
        intensity,
        calories: calories ? Number(calories) : 0,
        completed: true,
      };

      console.log("SENDING WORKOUT:", workoutData);

      const response = await api.post("/workouts", workoutData);

      console.log("CREATE WORKOUT RESPONSE:", response.data);

      if (!response.data?.workout) {
        throw new Error("Backend did not return the created workout.");
      }

      setWorkouts((previous) => [response.data.workout, ...previous]);

      // Clear form
      setExercise("");
      setDuration("");
      setIntensity("moderate");
      setCalories("");
    } catch (error: any) {
      console.error("CREATE WORKOUT ERROR:", error);

      console.log("STATUS:", error.response?.status);

      console.log("RESPONSE:", error.response?.data);

      console.log("MESSAGE:", error.message);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to log workout.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PERFORMANCE CALCULATIONS
  // ==========================================

  const totalWorkouts = workouts.length;

  const totalMinutes = workouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );

  const totalCalories = workouts.reduce(
    (total, workout) => total + Number(workout.calories || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}

        <Sidebar />

        <div className="min-w-0 flex-1">
          {/* TOPBAR */}

          <Topbar />

          <main className="px-6 py-8 lg:px-8">
            {/* HEADER */}

            <section>
              <p className="text-sm font-medium text-blue-400">Performance</p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Training Performance
              </h1>

              <p className="mt-2 max-w-2xl text-slate-400">
                Track your workouts, training volume and fitness progress.
              </p>
            </section>

            {/* STATS */}

            <section className="mt-8 grid gap-4 sm:grid-cols-3">
              {/* WORKOUTS */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Workouts</p>

                    <p className="mt-2 text-3xl font-bold">{totalWorkouts}</p>

                    <p className="mt-1 text-xs text-slate-500">Total logged</p>
                  </div>

                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Dumbbell size={22} />
                  </div>
                </div>
              </div>

              {/* TRAINING TIME */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Training Time</p>

                    <p className="mt-2 text-3xl font-bold">{totalMinutes}</p>

                    <p className="mt-1 text-xs text-slate-500">Minutes</p>
                  </div>

                  <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                    <Timer size={22} />
                  </div>
                </div>
              </div>

              {/* CALORIES */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Calories</p>

                    <p className="mt-2 text-3xl font-bold">{totalCalories}</p>

                    <p className="mt-1 text-xs text-slate-500">Total burned</p>
                  </div>

                  <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                    <Flame size={22} />
                  </div>
                </div>
              </div>
            </section>

            {/* MAIN CONTENT */}

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              {/* LOG WORKOUT */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Activity size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold">Log Workout</h2>

                    <p className="text-sm text-slate-500">
                      Record today's training
                    </p>
                  </div>
                </div>

                {/* ERROR */}

                {error && (
                  <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* FORM */}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* EXERCISE */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Exercise
                    </label>

                    <input
                      type="text"
                      value={exercise}
                      onChange={(event) => setExercise(event.target.value)}
                      placeholder="Running"
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                  </div>

                  {/* DURATION */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Duration (minutes)
                    </label>

                    <input
                      type="number"
                      value={duration}
                      onChange={(event) => setDuration(event.target.value)}
                      placeholder="30"
                      min="1"
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                  </div>

                  {/* INTENSITY */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Intensity
                    </label>

                    <select
                      value={intensity}
                      onChange={(event) =>
                        setIntensity(
                          event.target.value as "low" | "moderate" | "high",
                        )
                      }
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                    >
                      <option value="low">Low</option>

                      <option value="moderate">Moderate</option>

                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* CALORIES */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Calories
                    </label>

                    <input
                      type="number"
                      value={calories}
                      onChange={(event) => setCalories(event.target.value)}
                      placeholder="250"
                      min="0"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Logging Workout..." : "Log Workout"}
                  </button>
                </form>
              </div>

              {/* WORKOUT HISTORY */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Workout History</h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Your recent training sessions
                    </p>
                  </div>

                  <Dumbbell size={21} className="text-blue-400" />
                </div>

                <div className="mt-6">
                  {/* LOADING */}

                  {fetching && (
                    <div className="py-12 text-center text-sm text-slate-500">
                      Loading workouts...
                    </div>
                  )}

                  {/* EMPTY */}

                  {!fetching && workouts.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-700 py-12 text-center">
                      <Dumbbell size={32} className="mx-auto text-slate-600" />

                      <p className="mt-4 font-medium text-slate-400">
                        No workouts yet
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Log your first workout to start tracking performance.
                      </p>
                    </div>
                  )}

                  {/* WORKOUTS */}

                  {!fetching && workouts.length > 0 && (
                    <div className="space-y-3">
                      {workouts.map((workout) => (
                        <div
                          key={workout._id}
                          className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400">
                              <Activity size={20} />
                            </div>

                            <div>
                              <h3 className="font-medium">
                                {workout.exercise}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                {new Date(workout.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-5 text-sm">
                            <div>
                              <p className="text-xs text-slate-600">Duration</p>

                              <p className="mt-1 text-slate-300">
                                {workout.duration} min
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-600">
                                Intensity
                              </p>

                              <p className="mt-1 capitalize text-slate-300">
                                {workout.intensity}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-600">Calories</p>

                              <p className="mt-1 text-slate-300">
                                {workout.calories}
                              </p>
                            </div>

                            {workout.completed && (
                              <CheckCircle2
                                size={20}
                                className="text-emerald-400"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Performance;
