import { useState } from "react";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", form);

      // ✅ EXTRACT TOKENS
      const { accessToken, refreshToken } = res.data;

      // 🔥 IMPORTANT FIX (THIS WAS MISSING)
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // OPTIONAL (state management)
      setToken(accessToken);

      navigate("/dashboard");

    } catch (err) {
      setError(err?.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[380px] p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Welcome Back 👋
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 text-red-400 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            onClick={submit}
            disabled={loading}
            className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-transform duration-200 font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}