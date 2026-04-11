import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="relative px-8 py-20 bg-[#0b0f19] text-white overflow-hidden">

      {/* 🔥 SUBTLE BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/10 blur-[100px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/10 blur-[100px] bottom-[-100px] right-[-100px]" />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-14">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          How It Works ⚙️
        </h2>
        <p className="text-gray-400 mt-3">
          Simple. Fast. Secure.
        </p>
      </div>

      {/* STEPS */}
      <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">

        <Step num="1" text="Enter Certificate ID" />
        <Step num="2" text="System Validates Data" />
        <Step num="3" text="Instant Verification Result" />

      </div>

    </section>
  );
}

//////////////////////////////////////////////////////
// 🔥 STEP COMPONENT (INSANE UPGRADE)
//////////////////////////////////////////////////////

function Step({ num, text }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-lg"
    >

      {/* 🔥 HOVER GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* 🔥 NUMBER CIRCLE */}
      <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xl font-bold shadow-lg">
        {num}
      </div>

      {/* 🔥 TITLE */}
      <p className="text-gray-300 font-medium group-hover:text-white transition">
        {text}
      </p>

      {/* 🔥 CONNECTOR LINE (desktop only) */}
      <div className="hidden md:block absolute top-1/2 right-[-40px] w-10 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 group-last:hidden" />

    </motion.div>
  );
}