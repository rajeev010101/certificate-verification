import { useState, useEffect } from "react";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import { motion } from "framer-motion";

export default function CreateTemplate() {
  const [form, setForm] = useState({
    name: "John Doe",
    course: "Full Stack Development",
    description: "Successfully completed the program",
    skills: "React, Node.js, MongoDB",
    logo: "https://via.placeholder.com/150",
    issuerName: "Tech Corp",
    issuerRole: "CEO",
    signature1: "https://via.placeholder.com/100x50",
    signature2: "https://via.placeholder.com/100x50"
  });

  const [html, setHtml] = useState(`...YOUR HTML SAME AS BEFORE...`);

  const [loading, setLoading] = useState(false);

  // ✅ NEW STATES
  const [templateName, setTemplateName] = useState("");
  const [count, setCount] = useState(0);

  // ✅ FETCH TEMPLATE COUNT
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await api.get("/templates");
        setCount(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCount();
  }, []);

  // 🔥 LIVE PREVIEW
  const generatePreview = () => {
    let output = html;

    const previewData = {
      ...form,
      date: new Date().toLocaleDateString(),
      certificateId: "CERT-" + Math.floor(Math.random() * 999999),
      qr: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=preview"
    };

    Object.keys(previewData).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      output = output.replace(regex, previewData[key] || "");
    });

    return output;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SUBMIT
  const submit = async () => {
    try {
      setLoading(true);

      // ✅ AUTO NAME LOGIC
      const finalName =
        templateName.trim() || `Template ${count + 1}`;

      await api.post("/templates", {
        name: finalName,
        html,
        logo: form.logo,
        issuerName: form.issuerName,
        issuerRole: form.issuerRole,
        description: form.description,
        skills: form.skills,
        organizationId: localStorage.getItem("orgId"),

        signatures: [
          {
            name: form.issuerName,
            role: form.issuerRole,
            image: form.signature1
          },
          {
            name: form.issuerRole,
            role: "Director",
            image: form.signature2
          }
        ]
      });

      alert("🔥 Template Created Successfully");
      setTemplateName("");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to create template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] to-[#0f172a] text-white p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            🚀 Certificate Builder (Pro)
          </h1>

          <button
            onClick={submit}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg"
          >
            {loading ? "Saving..." : "Save Template 🚀"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* LEFT */}
          <motion.div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">

            <h2 className="text-lg font-semibold">⚙️ Template Settings</h2>

            {/* ✅ TEMPLATE NAME INPUT */}
            <input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template Name (optional)"
              className="input"
            />

            <input name="name" value={form.name} onChange={handleChange} className="input"/>
            <input name="course" value={form.course} onChange={handleChange} className="input"/>
            <input name="description" value={form.description} onChange={handleChange} className="input"/>
            <input name="skills" value={form.skills} onChange={handleChange} className="input"/>

            <input name="logo" value={form.logo} onChange={handleChange} className="input"/>

            <input name="issuerName" value={form.issuerName} onChange={handleChange} className="input"/>
            <input name="issuerRole" value={form.issuerRole} onChange={handleChange} className="input"/>

            <input name="signature1" value={form.signature1} onChange={handleChange} className="input"/>
            <input name="signature2" value={form.signature2} onChange={handleChange} className="input"/>

            <textarea
              className="w-full h-[250px] p-3 bg-black/40 rounded border"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
            />
          </motion.div>

          {/* RIGHT PREVIEW */}
          <motion.div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="mb-3 font-semibold">👀 Live Preview</h2>

            <div className="bg-white text-black rounded-lg p-4 min-h-[500px] overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: generatePreview() }} />
            </div>
          </motion.div>

        </div>
      </div>

      <style>
        {`
          .input {
            width:100%;
            padding:10px;
            border-radius:8px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.1);
          }
        `}
      </style>
    </DashboardLayout>
  );
}