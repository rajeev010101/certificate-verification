import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import { motion } from "framer-motion";

export default function CreateCertificate() {
  const [form, setForm] = useState({
    name: "",
    course: "",
    email: "",
    templateId: ""
  });

  const [templates, setTemplates] = useState([]);
  const [previewHTML, setPreviewHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  //////////////////////////////////////////////////////
  // 🔥 FETCH TEMPLATES
  //////////////////////////////////////////////////////
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get("/templates");
        setTemplates(res.data || []);
      } catch (err) {
        console.error("Template fetch error:", err);
      }
    };
    fetchTemplates();
  }, []);

  //////////////////////////////////////////////////////
  // 🔥 PREVIEW (SAFE + DEBOUNCED)
  //////////////////////////////////////////////////////
  const loadPreview = useCallback(async () => {
    if (!form.templateId) return;

    try {
      setPreviewLoading(true);

      const res = await api.post(
        `/templates/preview/${form.templateId}`,
        {
          name: form.name || "John Doe",
          course: form.course || "Course Name",
          date: new Date().toLocaleDateString()
        }
      );

      setPreviewHTML(res.data);

    } catch (err) {
      console.error("Preview error:", err);
    } finally {
      setPreviewLoading(false);
    }
  }, [form.templateId, form.name, form.course]);

  useEffect(() => {
    const timer = setTimeout(loadPreview, 400);
    return () => clearTimeout(timer);
  }, [loadPreview]);

  //////////////////////////////////////////////////////
  // 🚀 CREATE CERTIFICATE (FINAL FIX)
  //////////////////////////////////////////////////////
  const submit = async () => {
    try {
      if (!form.name || !form.course || !form.templateId) {
        return alert("⚠️ Fill all required fields");
      }

      setLoading(true);

      const payload = {
        name: form.name,
        course: form.course,
        email: form.email,
        templateId: form.templateId
      };

      console.log("🚀 FINAL PAYLOAD:", payload);

      const res = await api.post("/certificates/create", payload);

      alert("🎉 Certificate Generated Successfully!");

      if (res.data?.pdfUrl) {
        window.open(res.data.pdfUrl, "_blank");
      }

    } catch (err) {
      console.error("❌ ERROR:", err.response?.data);

      alert(
        err?.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0b0f19] text-white p-8">

        <h1 className="text-3xl font-bold mb-6">
          🚀 Certificate Generator
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* FORM */}
          <motion.div className="p-6 bg-white/5 rounded-xl space-y-3">

            <input
              placeholder="Student Name"
              className="input"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Course"
              className="input"
              value={form.course}
              onChange={(e) =>
                setForm({ ...form, course: e.target.value })
              }
            />

            <input
              placeholder="Email (optional)"
              className="input"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <select
              className="input"
              value={form.templateId}
              onChange={(e) =>
                setForm({ ...form, templateId: e.target.value })
              }
            >
              <option value="">Select Template</option>
              {templates.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              onClick={submit}
              className="mt-4 bg-purple-600 px-4 py-2 rounded-lg hover:opacity-90"
            >
              {loading ? "Generating..." : "Generate 🚀"}
            </button>

          </motion.div>

          {/* PREVIEW */}
          <motion.div className="p-6 bg-white/5 rounded-xl">

            {previewLoading ? (
              <p className="text-gray-400">Rendering preview...</p>
            ) : (
              <div className="bg-white text-black rounded overflow-auto max-h-[600px]">
                <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
              </div>
            )}

          </motion.div>

        </div>

      </div>

      <style>
        {`
          .input {
            width:100%;
            padding:12px;
            border-radius:8px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.1);
            outline:none;
          }
        `}
      </style>

    </DashboardLayout>
  );
}