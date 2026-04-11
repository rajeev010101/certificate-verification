import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function VerifyBox() {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!certId.trim()) return;

    setLoading(true);

    setTimeout(() => {
      navigate(`/verify/${certId}`);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0f19] text-white">

      {/* 🔥 BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-black"></div>

      {/* 🔥 GLOW ORBS */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px]" />

      {/* 🔥 GRID OVERLAY */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 🔥 CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl px-4"
      >

        {/* HEADER */}
        <h1 className="text-center text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Verify Certificate 🔍
        </h1>

        {/* CARD */}
        <div className="relative flex items-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

          {/* INPUT */}
          <input
            placeholder="Enter Certificate ID..."
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            className="flex-1 px-6 py-4 bg-transparent outline-none text-white"
          />

          {/* BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleVerify}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Verify 🚀"
            )}
          </motion.button>

        </div>

        {/* HINT */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Enter your certificate ID to verify authenticity
        </p>

      </motion.div>
    </div>
  );
}