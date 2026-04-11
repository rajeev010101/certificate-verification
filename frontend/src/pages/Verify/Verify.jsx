import { useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";

export default function Verify() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!id.trim()) return;

    try {
      setLoading(true);
      const res = await api.get(`/verify/${id}`);
      setData(res.data);
    } catch {
      setData({ valid: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-black text-white p-6">

      {/* 🔥 HEADER */}
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        🔍 Verify Certificate
      </h1>

      {/* 🔥 INPUT BOX */}
      <div className="flex backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl">

        <input
          placeholder="Enter Certificate ID..."
          className="px-6 py-4 bg-transparent outline-none w-[300px]"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />

        <button
          onClick={search}
          className="px-6 bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition"
        >
          {loading ? "..." : "Verify 🚀"}
        </button>
      </div>

      {/* 🔥 RESULT */}
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 w-full max-w-md"
        >
          {data.valid ? (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl">

              {/* STATUS */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {data.data.name}
                </h2>

                <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                  ✔ VALID
                </span>
              </div>

              {/* DETAILS */}
              <p className="text-gray-300">{data.data.course}</p>
              <p className="text-gray-400 text-sm">{data.data.domain}</p>

              {/* DATE */}
              <p className="mt-3 text-sm text-gray-400">
                {data.data.startDate
                  ? new Date(data.data.startDate).toDateString()
                  : "-"}
                {" → "}
                {data.data.endDate
                  ? new Date(data.data.endDate).toDateString()
                  : "-"}
              </p>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-6">

                <a
                  href={data.data.pdfUrl}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  📄 Download
                </a>

                <button
                  onClick={() => navigator.clipboard.writeText(id)}
                  className="text-xs bg-white/10 px-3 py-1 rounded"
                >
                  Copy ID
                </button>

              </div>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl text-center text-red-400">
              ❌ Invalid Certificate
            </div>
          )}
        </motion.div>
      )}

    </div>
  );
}