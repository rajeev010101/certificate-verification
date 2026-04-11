import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="relative px-8 py-20 bg-[#0b0f19] text-white overflow-hidden">

      {/* 🔥 SUBTLE BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/10 blur-[100px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/10 blur-[100px] bottom-[-100px] right-[-100px]" />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-14">
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Features ⚡
        </h2>
        <p className="text-gray-400 mt-3">
          Secure. Fast. Reliable.
        </p>
      </div>

      {/* GRID */}
      <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <Card
          title="Tamper Proof"
          desc="Advanced hashing ensures certificates remain secure and unaltered."
        />

        <Card
          title="QR Verify"
          desc="Scan and validate certificates instantly with built-in QR verification."
        />

        <Card
          title="Instant Results"
          desc="Real-time validation powered by optimized backend performance."
        />

      </div>

    </section>
  );
}

//////////////////////////////////////////////////////
// 🔥 CARD COMPONENT (INSANE UPGRADE)
//////////////////////////////////////////////////////

function Card({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden shadow-lg"
    >

      {/* 🔥 HOVER LIGHT EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* 🔥 TOP BORDER GLOW */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition" />

      {/* CONTENT */}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>

    </motion.div>
  );
}