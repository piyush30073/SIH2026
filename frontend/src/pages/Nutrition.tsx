import { useEffect, useState } from "react";
import {
  Apple,
  Beef,
  Carrot,
  Coffee,
  Plus,
  Trash2,
  Utensils,
} from "lucide-react";
import type { FormEvent } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import api from "../services/api";

interface Meal {
  _id: string;
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

interface NutritionData {
  meals: Meal[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  mealCount: number;
}

const Nutrition = () => {
  const [nutrition, setNutrition] =
    useState<NutritionData | null>(null);

  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD TODAY'S NUTRITION
  // ==========================================

  const fetchNutrition = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/nutrition");

      setNutrition(response.data.nutrition);
    } catch (error: any) {
      console.error(
        "GET NUTRITION ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load nutrition data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);

  // ==========================================
  // ADD MEAL
  // ==========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!meal.trim()) {
      setError("Please enter a meal name.");
      return;
    }

    if (
      !calories ||
      !protein ||
      !carbs ||
      !fats
    ) {
      setError(
        "Please fill in all nutrition values."
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await api.post("/nutrition", {
        meal: meal.trim(),
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fats: Number(fats),
      });

      setMeal("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");

      await fetchNutrition();
    } catch (error: any) {
      console.error(
        "CREATE MEAL ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to add meal."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // DELETE MEAL
  // ==========================================

  const deleteMeal = async (id: string) => {
    try {
      setError("");

      await api.delete(`/nutrition/${id}`);

      await fetchNutrition();
    } catch (error: any) {
      console.error(
        "DELETE MEAL ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to delete meal."
      );
    }
  };

  const totals = nutrition?.totals || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };

  // ==========================================
  // UI
  // ==========================================

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
              <p className="text-sm font-medium text-emerald-400">
                Nutrition
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Nutrition Center
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Track your daily meals and monitor
                your nutrition intake.
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
                NUTRITION STATS
            ================================== */}

            <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Calories */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Calories
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : Math.round(
                            totals.calories
                          )}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      kcal today
                    </p>
                  </div>

                  <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                    <Apple size={22} />
                  </div>

                </div>
              </div>

              {/* Protein */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Protein
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : `${Math.round(
                            totals.protein
                          )}g`}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      today
                    </p>
                  </div>

                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Beef size={22} />
                  </div>

                </div>
              </div>

              {/* Carbs */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Carbs
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : `${Math.round(
                            totals.carbs
                          )}g`}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      today
                    </p>
                  </div>

                  <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-400">
                    <Carrot size={22} />
                  </div>

                </div>
              </div>

              {/* Fats */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Fats
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                      {loading
                        ? "--"
                        : `${Math.round(
                            totals.fats
                          )}g`}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      today
                    </p>
                  </div>

                  <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                    <Coffee size={22} />
                  </div>

                </div>
              </div>

            </section>

            {/* ==================================
                MAIN CONTENT
            ================================== */}

            <section className="mt-6 grid gap-6 lg:grid-cols-3">

              {/* ==================================
                  MEAL LIST
              ================================== */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 lg:col-span-2">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-lg font-semibold">
                      Today's Meals
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {nutrition?.mealCount || 0} meals
                      recorded today
                    </p>
                  </div>

                  <Utensils
                    size={21}
                    className="text-emerald-400"
                  />

                </div>

                <div className="mt-6 space-y-3">

                  {loading ? (

                    <div className="py-12 text-center text-sm text-slate-500">
                      Loading nutrition data...
                    </div>

                  ) : !nutrition ||
                    nutrition.meals.length === 0 ? (

                    <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">

                      <Apple
                        size={32}
                        className="mx-auto text-slate-600"
                      />

                      <p className="mt-4 font-medium text-slate-400">
                        No meals recorded today
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Add your first meal using the
                        form.
                      </p>

                    </div>

                  ) : (

                    nutrition.meals.map(
                      (item) => (

                        <div
                          key={item._id}
                          className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                        >

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-4">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                                <Utensils
                                  size={20}
                                />
                              </div>

                              <div>
                                <h3 className="font-medium">
                                  {item.meal}
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                  {item.calories} kcal
                                </p>
                              </div>

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                deleteMeal(
                                  item._id
                                )
                              }
                              aria-label={`Delete ${item.meal}`}
                              className="w-fit rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                            >
                              <Trash2
                                size={18}
                              />
                            </button>

                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-2">

                            <div className="rounded-lg bg-slate-900 p-3">
                              <p className="text-xs text-slate-500">
                                Protein
                              </p>

                              <p className="mt-1 text-sm font-semibold text-blue-400">
                                {item.protein}g
                              </p>
                            </div>

                            <div className="rounded-lg bg-slate-900 p-3">
                              <p className="text-xs text-slate-500">
                                Carbs
                              </p>

                              <p className="mt-1 text-sm font-semibold text-yellow-400">
                                {item.carbs}g
                              </p>
                            </div>

                            <div className="rounded-lg bg-slate-900 p-3">
                              <p className="text-xs text-slate-500">
                                Fats
                              </p>

                              <p className="mt-1 text-sm font-semibold text-purple-400">
                                {item.fats}g
                              </p>
                            </div>

                          </div>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

              {/* ==================================
                  ADD MEAL
              ================================== */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                    <Plus size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      Add Meal
                    </h2>

                    <p className="text-sm text-slate-500">
                      Record what you ate
                    </p>
                  </div>

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >

                  {/* Meal */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Meal
                    </label>

                    <input
                      type="text"
                      value={meal}
                      onChange={(event) =>
                        setMeal(
                          event.target.value
                        )
                      }
                      placeholder="Chicken & Rice"
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  {/* Calories */}

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Calories
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={calories}
                      onChange={(event) =>
                        setCalories(
                          event.target.value
                        )
                      }
                      placeholder="500"
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500"
                    />
                  </div>

                  {/* Macros */}

                  <div className="grid grid-cols-3 gap-2">

                    <div>
                      <label className="mb-2 block text-xs text-slate-400">
                        Protein
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={protein}
                        onChange={(event) =>
                          setProtein(
                            event.target.value
                          )
                        }
                        placeholder="30g"
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm outline-none transition focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-slate-400">
                        Carbs
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={carbs}
                        onChange={(event) =>
                          setCarbs(
                            event.target.value
                          )
                        }
                        placeholder="50g"
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm outline-none transition focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-slate-400">
                        Fats
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={fats}
                        onChange={(event) =>
                          setFats(
                            event.target.value
                          )
                        }
                        placeholder="15g"
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm outline-none transition focus:border-emerald-500"
                      />
                    </div>

                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-medium transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={18} />

                    {submitting
                      ? "Adding..."
                      : "Add Meal"}
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

export default Nutrition;