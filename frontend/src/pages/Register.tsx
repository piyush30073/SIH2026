import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Ruler,
  Scale,
  Target,
  CalendarDays,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    fitnessGoal: "performance",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          age: Number(formData.age),
          height: Number(formData.height),
          weight: Number(formData.weight),
          fitnessGoal: formData.fitnessGoal,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left - Branding */}
        <div className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <Activity size={24} />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  TrainSafe
                </h1>

                <p className="text-xs text-slate-500">
                  Athlete Health AI
                </p>
              </div>
            </div>

            {/* Hero */}
            <div className="max-w-lg">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Start your journey
              </p>

              <h2 className="text-5xl font-bold leading-tight xl:text-6xl">
                Train smarter.
                <br />
                Stay safer.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
                Build your athlete profile and let TrainSafe
                personalize injury prevention, recovery,
                nutrition and performance insights.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <Activity className="text-blue-400" size={21} />
                  <p className="mt-3 font-medium">
                    Injury Prevention
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    AI-powered movement analysis
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <Target className="text-emerald-400" size={21} />
                  <p className="mt-3 font-medium">
                    Personalized
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Plans built around you
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              TrainSafe • Smart Athlete Health Ecosystem
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20">
          <div className="w-full max-w-xl">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Activity size={21} />
              </div>

              <div>
                <h1 className="font-bold">TrainSafe</h1>
                <p className="text-xs text-slate-500">
                  Athlete Health AI
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-blue-400">
                Athlete Registration
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Create your athlete profile
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                These details help us personalize your
                TrainSafe experience.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Physical Stats */}
              <div className="grid gap-4 sm:grid-cols-3">
                {/* Age */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Age
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="21"
                      min="10"
                      max="100"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Height (cm)
                  </label>

                  <div className="relative">
                    <Ruler
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="180"
                      min="50"
                      max="250"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Weight (kg)
                  </label>

                  <div className="relative">
                    <Scale
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="75"
                      min="20"
                      max="300"
                      required
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Primary Fitness Goal
                </label>

                <div className="relative">
                  <Target
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="performance">
                      Improve Performance
                    </option>
                    <option value="muscle_gain">
                      Muscle Gain
                    </option>
                    <option value="fat_loss">
                      Fat Loss
                    </option>
                    <option value="recovery">
                      Injury Recovery
                    </option>
                    <option value="general_fitness">
                      General Fitness
                    </option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create Athlete Account"}

                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-relaxed text-slate-600">
              By creating an account, you agree to use
              TrainSafe as a wellness and training support
              platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;