import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  Award,
  Upload,
  Search,
  Home,
  ClipboardList
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-white"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="w-64 min-h-screen bg-[#0b0f19] border-r border-white/10 p-5 flex flex-col">

      {/* 🔥 LOGO */}
      <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        CertifyX
      </h1>

      {/* 🔥 NAV */}
      <nav className="flex flex-col gap-2 text-sm">

        <Link to="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link to="/templates" className={linkClass("/templates")}>
          <FileText size={18} /> Templates
        </Link>

        <Link to="/templates/create" className={linkClass("/templates/create")}>
          <PlusSquare size={18} /> Create Template
        </Link>

        <Link to="/certificates/create" className={linkClass("/certificates/create")}>
          <Award size={18} /> Certificates
        </Link>

        <Link to="/dashboard/bulk" className={linkClass("/dashboard/bulk")}>
          <Upload size={18} /> Bulk Upload
        </Link>

        <Link to="/verify" className={linkClass("/verify")}>
          <Search size={18} /> Verify
        </Link>

        <Link to="/" className={linkClass("/")}>
          <Home size={18} /> Home
        </Link>

        <Link to="/audit" className={linkClass("/audit")}>
          <ClipboardList size={18} /> Audit Logs
        </Link>

      </nav>

      {/* 🔥 FOOTER */}
      <div className="mt-auto text-xs text-gray-500">
        © 2026 CertifyX
      </div>
    </div>
  );
}