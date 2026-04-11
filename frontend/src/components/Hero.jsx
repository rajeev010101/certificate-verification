import { motion } from "framer-motion";
import VerifyBox from "./VerifyBox";

export default function Hero() {
  return (
    <section className="relative text-center py-28 px-6 overflow-hidden bg-[#0b0f19] text-white">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] bottom-[-150px] right-[-150px]" />

      {/* 🔥 GRID OVERLAY */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* 🔥 HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
        >
          Verify Certificates <br />

          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Instantly & Securely 🔐
          </span>
        </motion.h1>

        {/* 🔥 SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-6 text-lg"
        >
          Instantly validate certificates with secure, tamper-proof verification.
        </motion.p>

        {/* 🔥 VERIFY BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
        >
          <VerifyBox />
        </motion.div>

      </div>
    </section>
  );
}