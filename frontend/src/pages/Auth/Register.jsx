import { useState } from "react";

import api from "../../services/api";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  User,
  Mail,
  Lock,
  Building2,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Register() {

  //////////////////////////////////////////////////////
  // NAVIGATION
  //////////////////////////////////////////////////////
  const navigate =
    useNavigate();

  //////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////
  const [form, setForm] =
    useState({
      name: "",

      email: "",

      password: "",

      organizationName: "",

      //////////////////////////////////////////////////////
      // NEW RBAC ROLE
      //////////////////////////////////////////////////////
      role: "admin",
    });

  //////////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////////
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  //////////////////////////////////////////////////////
  // HANDLE CHANGE
  //////////////////////////////////////////////////////
  const handleChange = (e) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  //////////////////////////////////////////////////////
  // VALIDATION
  //////////////////////////////////////////////////////
  const validateForm = () => {

    if (
      !form.name.trim()
    ) {
      return "Name is required";
    }

    if (
      !form.email.trim()
    ) {
      return "Email is required";
    }

    if (
      !form.password.trim()
    ) {
      return "Password is required";
    }

    if (
      form.password.length < 6
    ) {
      return "Password must be at least 6 characters";
    }

    if (
      !form.organizationName.trim()
    ) {
      return "Organization name is required";
    }

    return null;
  };

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////
  const submit = async () => {

    try {

      //////////////////////////////////////////////////////
      // RESET
      //////////////////////////////////////////////////////
      setError("");
      setSuccess("");

      //////////////////////////////////////////////////////
      // VALIDATE
      //////////////////////////////////////////////////////
      const validationError =
        validateForm();

      if (validationError) {

        setError(
          validationError
        );

        return;
      }

      setLoading(true);

      //////////////////////////////////////////////////////
      // API
      //////////////////////////////////////////////////////
      const res =
        await api.post(
          "/auth/register",
          form
        );

      console.log(
        "REGISTER RESPONSE:",
        res.data
      );

      //////////////////////////////////////////////////////
      // SAVE TOKENS
      //////////////////////////////////////////////////////
      if (
        res.data?.accessToken
      ) {

        localStorage.setItem(
          "token",
          res.data.accessToken
        );
      }

      if (
        res.data?.refreshToken
      ) {

        localStorage.setItem(
          "refreshToken",
          res.data.refreshToken
        );
      }

      //////////////////////////////////////////////////////
      // SAVE USER
      //////////////////////////////////////////////////////
      if (
        res.data?.user
      ) {

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        localStorage.setItem(
          "role",
          res.data.user.role
        );

        localStorage.setItem(
          "orgId",
          res.data.user.organizationId
        );
      }

      //////////////////////////////////////////////////////
      // SUCCESS
      //////////////////////////////////////////////////////
      setSuccess(
        "Account created successfully"
      );

      //////////////////////////////////////////////////////
      // REDIRECT
      //////////////////////////////////////////////////////
      setTimeout(() => {

        navigate(
          "/dashboard"
        );

      }, 1200);

    } catch (err) {

      console.error(
        "REGISTER ERROR:",
        err
      );

      setError(
        err?.response?.data
          ?.message ||
          "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] flex items-center justify-center p-6 text-white">

      {/* BACKGROUND */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="relative z-10 w-full max-w-[520px] rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.55)] overflow-hidden"
      >

        {/* TOP */}
        <div className="relative p-8 border-b border-white/10">

          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative z-10 flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_20px_60px_rgba(124,58,237,0.45)]">

              <Sparkles size={34} />

            </div>

            <div>

              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">

                Create Account

              </h1>

              <p className="text-gray-400 mt-2">
                RBAC Enterprise Authentication
              </p>

            </div>

          </div>
        </div>

        {/* BODY */}
        <div className="p-8">

          {/* ERROR */}
          {error && (

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400 text-sm"
            >

              {error}

            </motion.div>
          )}

          {/* SUCCESS */}
          {success && (

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mb-5 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-400 text-sm flex items-center gap-3"
            >

              <CheckCircle2
                size={18}
              />

              {success}

            </motion.div>
          )}

          {/* FORM */}
          <div className="space-y-5">

            {/* NAME */}
            <InputField
              icon={<User size={18} />}
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={
                handleChange
              }
            />

            {/* EMAIL */}
            <InputField
              icon={<Mail size={18} />}
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={
                handleChange
              }
            />

            {/* PASSWORD */}
            <div className="relative">

              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                <Lock size={18} />
              </div>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={
                  form.password
                }
                onChange={
                  handleChange
                }
                className="w-full h-[60px] rounded-2xl border border-white/10 bg-white/5 pl-14 pr-14 text-white outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {showPassword ? (
                  <EyeOff
                    size={18}
                  />
                ) : (
                  <Eye size={18} />
                )}

              </button>

            </div>

            {/* ORGANIZATION */}
            <InputField
              icon={
                <Building2 size={18} />
              }
              name="organizationName"
              placeholder="Organization Name"
              value={
                form.organizationName
              }
              onChange={
                handleChange
              }
            />

            {/* ROLE */}
            <div className="relative">

              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                <ShieldCheck
                  size={18}
                />
              </div>

              <select
                name="role"
                value={form.role}
                onChange={
                  handleChange
                }
                className="w-full h-[60px] rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 appearance-none"
              >

                <option
                  value="admin"
                  className="bg-[#020617]"
                >
                  Admin
                </option>

                <option
                  value="manager"
                  className="bg-[#020617]"
                >
                  Manager
                </option>

                <option
                  value="student"
                  className="bg-[#020617]"
                >
                  Student
                </option>

              </select>

            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={submit}
              disabled={loading}
              className="group mt-3 w-full h-[62px] rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold text-lg shadow-[0_20px_50px_rgba(124,58,237,0.4)] disabled:opacity-60 flex items-center justify-center gap-3"
            >

              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Register
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
                </>
              )}

            </motion.button>

          </div>

          {/* FOOTER */}
          <div className="mt-8 text-center text-gray-400 text-sm">

            Already have an account?{" "}

            <button
              onClick={() =>
                navigate("/login")
              }
              className="text-purple-400 hover:text-purple-300 transition font-semibold"
            >

              Login

            </button>

          </div>

        </div>

      </motion.div>
    </div>
  );
}

//////////////////////////////////////////////////////
// INPUT COMPONENT
//////////////////////////////////////////////////////
function InputField({
  icon,
  ...props
}) {
  return (
    <div className="relative">

      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
        {icon}
      </div>

      <input
        {...props}
        className="w-full h-[60px] rounded-2xl border border-white/10 bg-white/5 pl-14 pr-5 text-white outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 placeholder:text-gray-500"
      />

    </div>
  );
}