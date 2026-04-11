import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import Modal from "../../components/ui/Modal";
import { motion } from "framer-motion";

export default function Templates() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //////////////////////////////////////////////////////
  // 🔥 FETCH
  //////////////////////////////////////////////////////
  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/templates");
      setData(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load templates");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  //////////////////////////////////////////////////////
  // 🔥 DELETE
  //////////////////////////////////////////////////////
  const deleteTemplate = async (id) => {
    if (!window.confirm("Delete this template?")) return;

    try {
      setLoadingId(id);
      await api.delete(`/templates/${id}`);
      setData((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete template");
    } finally {
      setLoadingId(null);
    }
  };

  //////////////////////////////////////////////////////
  // 🔥 PREVIEW
  //////////////////////////////////////////////////////
  const openPreview = async (template) => {
    try {
      setSelected(template);

      const res = await api.post(`/templates/preview/${template._id}`, {
        name: "John Doe",
        course: "React Mastery",
        date: "2026"
      });

      setPreviewHtml(res.data || "");
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-[#0b0f19] min-h-screen text-white">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Templates 🎨
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage and preview your certificate templates
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/templates/create")}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            + Create Template
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <SkeletonGrid />
        ) : data.length === 0 ? (
          <EmptyState text="No templates created yet" />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {data.map((t, index) => (
              <motion.div
                key={t._id}
                whileHover={{ scale: 1.04 }}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl hover:bg-white/10 transition"
              >

                {/* 🔥 PREVIEW */}
                <div className="bg-white text-black h-40 overflow-hidden">
                  {t.html ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: t.html?.slice(0, 500) || ""
                      }}
                      className="scale-[0.3] origin-top-left"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Preview
                    </div>
                  )}
                </div>

                {/* 🔥 INFO */}
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-3">
                    {t.name || `Template ${index + 1}`}
                  </h2>

                  {/* 🔥 ACTION BUTTONS */}
                  <div className="flex justify-between text-xs">

                    <button
                      onClick={() => openPreview(t)}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20"
                    >
                      Preview
                    </button>

                    <button
                      onClick={() => navigate(`/dashboard/templates/edit/${t._id}`)}
                      className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded hover:bg-yellow-500/20"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTemplate(t._id)}
                      className="px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
                    >
                      {loadingId === t._id ? "..." : "Delete"}
                    </button>

                  </div>
                </div>

              </motion.div>
            ))}

          </div>
        )}

        {/* 🔥 MODAL */}
        <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
          <h2 className="mb-4 text-xl font-bold">
            {selected?.name || "Preview"}
          </h2>

          <div className="bg-white text-black p-6 rounded-lg max-h-[600px] overflow-auto shadow-xl">
            {previewHtml ? (
              <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
            ) : (
              <div>Loading preview...</div>
            )}
          </div>
        </Modal>

      </div>
    </DashboardLayout>
  );
}

//////////////////////////////////////////////////////
// 🔥 EXTRA COMPONENTS
//////////////////////////////////////////////////////

function EmptyState({ text }) {
  return (
    <div className="p-10 text-center text-gray-400 border border-dashed border-white/10 rounded-xl">
      {text}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-40 bg-white/5 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}