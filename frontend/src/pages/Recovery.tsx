import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  HeartPulse,
  Plus,
  RotateCcw,
} from "lucide-react";
import type { FormEvent } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import api from "../services/api";

interface RecoveryExercise {
  _id: string;
  exercise: string;
  duration: number;
  completed: boolean;
  date: string;
}

interface RecoveryData {
  totalExercises: number;
  completedExercises: number;
  totalMinutes: number;
  completedMinutes: number;
  recoveryScore: number;
  exercises: RecoveryExercise[];
}

const Recovery = () => {
  const [recovery, setRecovery] =
    useState<RecoveryData | null>(null);

  const [exercise, setExercise] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD RECOVERY
  // ==========================================

  const fetchRecovery = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/recovery");

      console.log(
        "RECOVERY RESPONSE:",
        response.data
      );

      setRecovery(
        response.data.recovery
      );
    } catch (error: any) {
      console.error(
        "GET RECOVERY ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load recovery data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecovery();
  }, []);

  // ==========================================
  // ADD RECOVERY EXERCISE
  // ==========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!exercise.trim()) {
      setError(
        "Please enter a recovery exercise."
      );
      return;
    }

    if (
      !duration ||
      Number(duration) <= 0
    ) {
      setError(
        "Please enter a valid duration."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await api.post("/recovery", {
        exercise: exercise.trim(),
        duration: Number(duration),
      });

      setExercise("");
      setDuration("");

      await fetchRecovery();
    } catch (error: any) {
      console.error(
        "CREATE RECOVERY ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to add recovery exercise."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // TOGGLE COMPLETION
  // ==========================================

  const toggleExercise = async (
    id: string
  ) => {
    try {
      setError("");

      await api.patch(
        `/recovery/${id}/complete`
      );

      await fetchRecovery();
    } catch (error: any) {
      console.error(
        "UPDATE RECOVERY ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to update exercise."
      );
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

      <div className="flex min-h-screen">

        <Sidebar />

        <div className="min-w-0 flex-1">

          <Topbar />

          <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

            {/* ==================================
                HEADER
            ================================== */}

            <section>

              <p className="text-sm font-medium text-blue-400">
                Recovery
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Recovery Center
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Stay consistent with your recovery
                routine and track your progress.
              </p>

            </section>

            {/* ==================================
                ERROR
            ================================== */}

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* ==================================
                STATS
            ================================== */}

            <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Recovery Score */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Recovery Score
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : `${recovery?.recoveryScore ?? 0}%`}
                    </p>

                  </div>

                  <div className="rounded-xl bg-rose-500/10 p-3 text-rose-400">
                    <HeartPulse size={22} />
                  </div>

                </div>

                <p className="mt-2 text-xs text-emerald-400">
                  Based on completed exercises
                </p>

              </div>

              {/* Exercises */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Exercises
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : recovery?.totalExercises ?? 0}
                    </p>

                  </div>

                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <RotateCcw size={22} />
                  </div>

                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {recovery?.completedExercises ?? 0} completed
                </p>

              </div>

              {/* Completed */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Completed
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : recovery?.completedExercises ?? 0}
                    </p>

                  </div>

                  <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                    <CheckCircle2 size={22} />
                  </div>

                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Recovery exercises
                </p>

              </div>

              {/* Minutes */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">
                      Recovery Time
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : recovery?.completedMinutes ?? 0}
                    </p>

                  </div>

                  <div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">
                    <Clock3 size={22} />
                  </div>

                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Completed minutes
                </p>

              </div>

            </section>

            {/* ==================================
                MAIN GRID
            ================================== */}

            <section className="mt-6 grid gap-6 lg:grid-cols-3">

              {/* ==================================
                  EXERCISE LIST
              ================================== */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 lg:col-span-2">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-lg font-semibold">
                      Recovery Routine
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Complete your recovery exercises
                    </p>

                  </div>

                  <HeartPulse
                    size={21}
                    className="text-rose-400"
                  />

                </div>

                <div className="mt-6 space-y-3">

                  {loading ? (

                    <div className="py-12 text-center text-sm text-slate-500">
                      Loading recovery routine...
                    </div>

                  ) : !recovery ||
                    recovery.exercises.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">

                      <HeartPulse
                        size={32}
                        className="mx-auto text-slate-600"
                      />

                      <p className="mt-4 font-medium text-slate-400">
                        No recovery exercises yet
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Add your first recovery exercise
                        using the form.
                      </p>

                    </div>

                  ) : (

                    recovery.exercises.map(
                      (item) => (

                        <div
                          key={item._id}
                          className={`flex flex-col gap-4 rounded-xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                            item.completed
                              ? "border-emerald-500/20 bg-emerald-500/5"
                              : "border-slate-800 bg-slate-950"
                          }`}
                        >

                          <div className="flex items-center gap-4">

                            <button
                              type="button"
                              onClick={() =>
                                toggleExercise(
                                  item._id
                                )
                              }
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
                                item.completed
                                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                                  : "border-slate-700 text-slate-600 hover:border-blue-500 hover:text-blue-400"
                              }`}
                              aria-label={
                                item.completed
                                  ? "Mark incomplete"
                                  : "Mark complete"
                              }
                            >
                              <CheckCircle2
                                size={20}
                              />
                            </button>

                            <div>

                              <h3
                                className={`font-medium ${
                                  item.completed
                                    ? "text-slate-400 line-through"
                                    : "text-white"
                                }`}
                              >
                                {item.exercise}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                {item.duration} minutes
                              </p>

                            </div>

                          </div>

                          <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                              item.completed
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-blue-500/10 text-blue-400"
                            }`}
                          >
                            {item.completed
                              ? "Completed"
                              : "Pending"}
                          </span>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

              {/* ==================================
                  ADD EXERCISE
              ================================== */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Plus size={21} />
                  </div>

                  <div>

                    <h2 className="font-semibold">
                      Add Recovery Exercise
                    </h2>

                    <p className="text-sm text-slate-500">
                      Build your routine
                    </p>

                  </div>

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >

                  <div>

                    <label className="mb-2 block text-sm text-slate-300">
                      Exercise
                    </label>

                    <input
                      type="text"
                      value={exercise}
                      onChange={(event) =>
                        setExercise(
                          event.target.value
                        )
                      }
                      placeholder="Shoulder stretch"
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm text-slate-300">
                      Duration (minutes)
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(event) =>
                        setDuration(
                          event.target.value
                        )
                      }
                      placeholder="10"
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
                    />

                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={18} />

                    {submitting
                      ? "Adding..."
                      : "Add Exercise"}
                  </button>

                </form>

              </div>

            </section>

          </main>

        </div>

      </div>

    </div>
  );
};

export default Recovery;