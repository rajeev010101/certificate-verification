import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organizationName: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", form);

      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">

      {/* 🔥 Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* 🔥 Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-[420px] p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 text-red-400 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Organization ID (optional) */}
          <input
            type="text"
            placeholder="Organization Name (optional)"
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-purple-500 transition"
            onChange={(e) =>
              setForm({ ...form, organizationName: e.target.value })
            }
          />

          {/* Submit Button */}
          <button
            onClick={submit}
            disabled={loading}
            className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition-transform duration-200 font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}