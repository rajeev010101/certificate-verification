import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  const linkClass = (path) =>
    `transition ${
      location.pathname === path
        ? "text-white"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0f19]/80 border-b border-white/10">

      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">

        {/* 🔥 LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          CertifyPro
        </h1>

        {/* 🔥 LINKS */}
        <div className="flex gap-6 items-center">

          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/verify" className={linkClass("/verify")}>
            Verify
          </Link>

          {isAuth ? (
            <>
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:border-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition shadow-lg"
              >
                Get Started 🚀
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}