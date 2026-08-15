import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  age: string;
  height: string;
  weight: string;
  fitnessGoal: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    fitnessGoal: "general-fitness",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        fitnessGoal: formData.fitnessGoal,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-white">
      <div className="flex h-full items-center justify-center px-4">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold">
              SIH2026
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Athlete Injury Prevention & Recovery
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

            <h2 className="text-xl font-semibold">
              Create your athlete profile
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              These details help us personalize your
              TrainSafe experience.
            </p>

            {/* Error */}
            {error && (
              <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-4 space-y-3"
            >

              {/* Name */}
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Piyush Singh"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Age */}
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="18"
                  min={1}
                  max={120}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
                />
              </div>

              {/* Height + Weight */}
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="mb-1 block text-sm text-slate-300">
                    Height (cm)
                  </label>

                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="180"
                    min={50}
                    max={250}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-300">
                    Weight (kg)
                  </label>

                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="75"
                    min={20}
                    max={300}
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
                  />
                </div>

              </div>

              {/* Fitness Goal */}
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Primary Fitness Goal
                </label>

                <select
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 outline-none transition focus:border-blue-500"
                >
                  <option value="general-fitness">
                    General Fitness
                  </option>

                  <option value="muscle-gain">
                    Muscle Gain
                  </option>

                  <option value="fat-loss">
                    Fat Loss
                  </option>

                  <option value="performance">
                    Performance
                  </option>

                  <option value="recovery">
                    Recovery
                  </option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Athlete Account"}
              </button>

            </form>

            {/* Login */}
            <p className="mt-4 text-center text-sm text-slate-400">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;