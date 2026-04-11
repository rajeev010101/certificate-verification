import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import { motion } from "framer-motion";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("/audit"); // backend route
      setLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getColor = (action) => {
    if (action.includes("CREATE")) return "text-green-400";
    if (action.includes("DELETE")) return "text-red-400";
    if (action.includes("VERIFY")) return "text-blue-400";
    if (action.includes("LOGIN")) return "text-yellow-400";
    return "text-gray-400";
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Audit Logs 📜</h1>
      </div>

      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
        {logs.length === 0 && (
          <p className="text-gray-400">No logs available</p>
        )}

        {logs.map((log, index) => (
          <motion.div
            key={log._id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-4 rounded-xl flex justify-between items-start"
          >
            {/* LEFT SIDE */}
            <div>
              <p className={`font-semibold ${getColor(log.action)}`}>
                {log.action}
              </p>

              <p className="text-gray-300 text-sm">
                {log.message || "No description"}
              </p>

              <p className="text-gray-500 text-xs mt-1">
                Entity: {log.entityType || "N/A"} | ID: {log.entityId || "-"}
              </p>

              <p className="text-gray-600 text-xs">
                User: {log.userId || "System"}
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="text-right text-xs text-gray-400">
              <p>{new Date(log.createdAt).toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}