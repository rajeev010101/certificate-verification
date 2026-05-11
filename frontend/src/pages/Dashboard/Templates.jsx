import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  motion,
} from "framer-motion";

import {
  FileText,
  Trash2,
  Eye,
  Sparkles,
  RefreshCcw,
} from "lucide-react";

export default function Templates() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////
  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////
  const fetchTemplates =
    async () => {

      try {

        setLoading(true);

        setError("");

        const res =
          await api.get(
            "/templates"
          );

        //////////////////////////////////////////////////////
        // SAFE RESPONSE
        //////////////////////////////////////////////////////
        const templates =
          Array.isArray(
            res.data
          )
            ? res.data
            : res.data.templates ||
              res.data.data ||
              [];

        //////////////////////////////////////////////////////
        // ALWAYS ARRAY
        //////////////////////////////////////////////////////
        setData(
          Array.isArray(
            templates
          )
            ? templates
            : []
        );

      } catch (err) {

        console.error(
          "TEMPLATE FETCH ERROR:",
          err
        );

        setError(
          "Failed to load templates"
        );

        //////////////////////////////////////////////////////
        // PREVENT .map CRASH
        //////////////////////////////////////////////////////
        setData([]);

      } finally {

        setLoading(false);
      }
    };

  //////////////////////////////////////////////////////
  // LOAD
  //////////////////////////////////////////////////////
  useEffect(() => {
    fetchTemplates();
  }, []);

  //////////////////////////////////////////////////////
  // DELETE
  //////////////////////////////////////////////////////
  const deleteTemplate =
    async (id) => {

      try {

        const confirmDelete =
          window.confirm(
            "Delete template?"
          );

        if (!confirmDelete)
          return;

        await api.delete(
          `/templates/${id}`
        );

        //////////////////////////////////////////////////////
        // REMOVE FROM UI
        //////////////////////////////////////////////////////
        setData((prev) =>
          prev.filter(
            (item) =>
              item._id !== id
          )
        );

      } catch (err) {

        console.error(
          "DELETE ERROR:",
          err
        );

        alert(
          "Failed to delete template"
        );
      }
    };

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////
  if (loading) {
    return (
      <DashboardLayout>

        <div className="min-h-screen bg-[#020617] p-8 text-white">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {[...Array(6)].map(
              (_, i) => (

                <div
                  key={i}
                  className="h-[320px] rounded-3xl bg-white/5 animate-pulse"
                />
              )
            )}

          </div>

        </div>

      </DashboardLayout>
    );
  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <DashboardLayout>

      <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

        {/* BACKGROUND */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="relative z-10 p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_20px_50px_rgba(124,58,237,0.4)]">

                <Sparkles size={30} />

              </div>

              <div>

                <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">

                  Templates

                </h1>

                <p className="text-gray-400 mt-2">
                  Manage certificate templates
                </p>

              </div>

            </div>

            <button
              onClick={
                fetchTemplates
              }
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >

              <RefreshCcw size={18} />

              Refresh

            </button>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          {/* EMPTY */}
          {Array.isArray(data) &&
          data.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-20 text-center text-gray-400">

              No templates found

            </div>

          ) : (

            //////////////////////////////////////////////////////
            // GRID
            //////////////////////////////////////////////////////
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {Array.isArray(data) &&
                data.map(
                  (
                    template,
                    index
                  ) => (

                    <motion.div
                      key={
                        template._id ||
                        index
                      }
                      whileHover={{
                        y: -5,
                      }}
                      className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                    >

                      {/* TOP */}
                      <div className="p-5 border-b border-white/10 flex items-center justify-between">

                        <div>

                          <h2 className="text-xl font-bold">

                            {template?.name ||
                              "Untitled"}

                          </h2>

                          <p className="text-gray-400 text-sm mt-1">
                            Certificate Template
                          </p>

                        </div>

                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">

                          <FileText size={20} />

                        </div>

                      </div>

                      {/* PREVIEW */}
                      <div className="h-[260px] bg-white overflow-hidden">

                        {template?.html ? (

                          <iframe
                            title={
                              template?.name
                            }
                            srcDoc={
                              template?.html
                            }
                            className="w-full h-full scale-[0.25] origin-top-left pointer-events-none"
                            style={{
                              width:
                                "400%",
                              height:
                                "400%",
                              border:
                                "none",
                            }}
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            No Preview
                          </div>
                        )}

                      </div>

                      {/* ACTIONS */}
                      <div className="p-5 flex items-center justify-between border-t border-white/10">

                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition">

                          <Eye size={16} />

                          View

                        </button>

                        <button
                          onClick={() =>
                            deleteTemplate(
                              template._id
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                        >

                          <Trash2 size={16} />

                          Delete

                        </button>

                      </div>

                    </motion.div>
                  )
                )}

            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}