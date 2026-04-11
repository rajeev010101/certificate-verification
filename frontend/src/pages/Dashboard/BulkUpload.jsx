import { useState } from "react";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function BulkUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await api.post("/certificates/bulk", formData);

      alert("🚀 Bulk upload started!");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 text-white min-h-screen bg-[#0b0f19]">

        <h1 className="text-3xl font-bold mb-6">
          📤 Bulk Certificate Upload
        </h1>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />

          <button
            onClick={upload}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded"
          >
            {loading ? "Uploading..." : "Upload CSV 🚀"}
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}