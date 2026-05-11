import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import { motion } from "framer-motion";

import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  GraduationCap,
  Mail,
  FileText,
  Wand2,
} from "lucide-react";

export default function CreateCertificate() {
  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////
  const [form, setForm] = useState({
    name: "",
    course: "",
    email: "",
    templateId: "",
  });

  const [templates, setTemplates] = useState([]);
  const [previewHTML, setPreviewHTML] = useState("");

  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] =
    useState(false);

  const [zoom, setZoom] = useState(0.7);

  const iframeRef = useRef(null);

  //////////////////////////////////////////////////////
  // FETCH TEMPLATES
  //////////////////////////////////////////////////////
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get("/templates");

        const templateData = Array.isArray(res.data)
          ? res.data
          : res.data.templates || [];

        setTemplates(templateData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchTemplates();
  }, []);

  //////////////////////////////////////////////////////
  // LIVE PREVIEW
  //////////////////////////////////////////////////////
  const loadPreview = useCallback(async () => {
    try {
      if (!form.templateId) {
        setPreviewHTML("");
        return;
      }

      setPreviewLoading(true);

      const res = await api.post(
        `/templates/preview/${form.templateId}`,
        {
          name: form.name || "John Doe",
          course:
            form.course || "Full Stack Development",
          email:
            form.email || "john@example.com",
          date: new Date().toLocaleDateString(),
        }
      );

      let html = "";

      if (typeof res.data === "string") {
        html = res.data;
      } else if (res.data?.html) {
        html = res.data.html;
      }

      const fullHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />

          <style>
            *{
              margin:0;
              padding:0;
              box-sizing:border-box;
            }

            body{
              background:#111827;
              display:flex;
              justify-content:center;
              align-items:flex-start;
              padding:50px;
              overflow:auto;
              font-family:Arial;
            }

            .certificate-wrapper{
              width:1400px;
            }

            img{
              max-width:100%;
            }
          </style>
        </head>

        <body>
          <div class="certificate-wrapper">
            ${html}
          </div>
        </body>
        </html>
      `;

      setPreviewHTML(fullHTML);

    } catch (err) {
      console.error(err);

      setPreviewHTML(`
        <html>
          <body style="
            background:#0f172a;
            color:white;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Arial;
          ">
            Failed to load preview
          </body>
        </html>
      `);

    } finally {
      setPreviewLoading(false);
    }
  }, [
    form.templateId,
    form.name,
    form.course,
    form.email,
  ]);

  //////////////////////////////////////////////////////
  // LIVE UPDATE
  //////////////////////////////////////////////////////
  useEffect(() => {
    const timer = setTimeout(() => {
      loadPreview();
    }, 400);

    return () => clearTimeout(timer);
  }, [loadPreview]);

  //////////////////////////////////////////////////////
  // GENERATE
  //////////////////////////////////////////////////////
  const submit = async () => {
    try {
      if (
        !form.name ||
        !form.course ||
        !form.templateId
      ) {
        return alert(
          "Please fill all required fields"
        );
      }

      setLoading(true);

      const payload = {
        name: form.name,
        course: form.course,
        email: form.email,
        templateId: form.templateId,
      };

      const res = await api.post(
        "/certificates/create",
        payload
      );

      alert(
        "🎉 Certificate Generated Successfully!"
      );

      if (res.data?.pdfUrl) {
        window.open(
          res.data.pdfUrl,
          "_blank"
        );
      }

    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.message ||
          "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  // ZOOM
  //////////////////////////////////////////////////////
  const zoomIn = () => {
    setZoom((prev) =>
      Math.min(prev + 0.1, 2)
    );
  };

  const zoomOut = () => {
    setZoom((prev) =>
      Math.max(prev - 0.1, 0.3)
    );
  };

  const resetZoom = () => {
    setZoom(0.7);
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <DashboardLayout>
      <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

        {/* BACKGROUND EFFECTS */}
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />

        <div className="relative z-10 p-8">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >

            <div className="flex items-center gap-4 mb-4">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl">

                <Sparkles size={32} />

              </div>

              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">

                  Certificate Studio

                </h1>

                <p className="text-gray-400 mt-2 text-lg">
                  Generate stunning professional certificates
                </p>
              </div>

            </div>
          </motion.div>

          {/* MAIN GRID */}
          <div className="grid xl:grid-cols-[420px_1fr] gap-8">

            {/* LEFT PANEL */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-8">

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">

                    <Wand2 size={22} />

                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      Certificate Details
                    </h2>

                    <p className="text-sm text-gray-400">
                      Customize your certificate
                    </p>
                  </div>

                </div>

                <div className="space-y-5">

                  {/* NAME */}
                  <div>
                    <label className="label">
                      Student Name
                    </label>

                    <div className="input-wrapper">

                      <GraduationCap
                        size={18}
                        className="input-icon"
                      />

                      <input
                        type="text"
                        placeholder="Enter student name"
                        className="input"
                        value={form.name}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />

                    </div>
                  </div>

                  {/* COURSE */}
                  <div>
                    <label className="label">
                      Course Name
                    </label>

                    <div className="input-wrapper">

                      <FileText
                        size={18}
                        className="input-icon"
                      />

                      <input
                        type="text"
                        placeholder="Enter course name"
                        className="input"
                        value={form.course}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            course: e.target.value,
                          }))
                        }
                      />

                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="label">
                      Email
                    </label>

                    <div className="input-wrapper">

                      <Mail
                        size={18}
                        className="input-icon"
                      />

                      <input
                        type="email"
                        placeholder="Enter email"
                        className="input"
                        value={form.email}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />

                    </div>
                  </div>

                  {/* TEMPLATE */}
                  <div>
                    <label className="label">
                      Select Template
                    </label>

                    <select
                      className="input select-input"
                      value={form.templateId}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          templateId: e.target.value,
                        }))
                      }
                    >
                      <option value="">
                        Select Template
                      </option>

                      {templates.map((template) => (
                        <option
                          key={template._id}
                          value={template._id}
                        >
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="generate-btn"
                  >

                    <span className="relative z-10">
                      {loading
                        ? "Generating..."
                        : "Generate Certificate"}
                    </span>

                    <div className="btn-glow" />

                  </button>

                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            >

              {/* TOPBAR */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/20">

                <div>
                  <h2 className="text-2xl font-bold">
                    Live Preview
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    Interactive certificate viewer
                  </p>
                </div>

                {/* ZOOM CONTROLS */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={zoomOut}
                    className="zoom-btn"
                  >
                    <ZoomOut size={18} />
                  </button>

                  <div className="zoom-level">
                    {Math.round(zoom * 100)}%
                  </div>

                  <button
                    onClick={zoomIn}
                    className="zoom-btn"
                  >
                    <ZoomIn size={18} />
                  </button>

                  <button
                    onClick={resetZoom}
                    className="zoom-btn"
                  >
                    <RotateCcw size={18} />
                  </button>

                </div>
              </div>

              {/* PREVIEW */}
              <div className="preview-container">

                {previewLoading ? (
                  <div className="preview-loading">

                    <div className="loader" />

                    <p className="mt-5 text-gray-400">
                      Rendering certificate...
                    </p>

                  </div>
                ) : previewHTML ? (
                  <div
                    className="preview-inner"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "top center",
                    }}
                  >

                    <iframe
                      ref={iframeRef}
                      title="Certificate Preview"
                      srcDoc={previewHTML}
                      className="preview-iframe"
                    />

                  </div>
                ) : (
                  <div className="preview-empty">

                    <div className="empty-box">

                      <Sparkles
                        size={50}
                        className="text-purple-400"
                      />

                      <h3 className="text-2xl font-bold mt-6">
                        No Preview Available
                      </h3>

                      <p className="text-gray-400 mt-3">
                        Select a template to start previewing
                      </p>

                    </div>

                  </div>
                )}

              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>
        {`
          .label{
            display:block;
            margin-bottom:10px;
            color:#cbd5e1;
            font-size:14px;
            font-weight:600;
          }

          .input-wrapper{
            position:relative;
          }

          .input-icon{
            position:absolute;
            left:16px;
            top:50%;
            transform:translateY(-50%);
            color:#94a3b8;
            z-index:5;
          }

          .input{
            width:100%;
            height:58px;
            border-radius:18px;
            background:rgba(255,255,255,0.05);
            border:1px solid rgba(255,255,255,0.08);
            padding:0 18px 0 48px;
            color:white;
            outline:none;
            transition:0.3s;
            backdrop-filter:blur(10px);
          }

          .select-input{
            padding-left:18px;
          }

          .input:focus{
            border-color:#8b5cf6;
            box-shadow:
              0 0 0 4px rgba(139,92,246,0.15),
              0 10px 40px rgba(139,92,246,0.2);
          }

          .input::placeholder{
            color:#64748b;
          }

          .input option{
            background:#111827;
          }

          .generate-btn{
            width:100%;
            height:60px;
            border:none;
            border-radius:20px;
            margin-top:10px;
            background:linear-gradient(
              135deg,
              #7c3aed,
              #06b6d4
            );
            color:white;
            font-size:16px;
            font-weight:700;
            position:relative;
            overflow:hidden;
            cursor:pointer;
            transition:0.3s;
          }

          .generate-btn:hover{
            transform:translateY(-3px);
            box-shadow:
              0 20px 40px rgba(124,58,237,0.4);
          }

          .btn-glow{
            position:absolute;
            inset:0;
            background:linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.2),
              transparent
            );
            transform:translateX(-100%);
            animation:shine 3s infinite;
          }

          @keyframes shine{
            100%{
              transform:translateX(100%);
            }
          }

          .preview-container{
            height:calc(100vh - 220px);
            overflow:auto;
            background:
              radial-gradient(circle at top,
              rgba(139,92,246,0.1),
              transparent),
              #0f172a;
            display:flex;
            justify-content:flex-start;
            align-items:flex-start;
            padding:40px;
          }

          .preview-inner{
            transition:0.3s ease;
          }

          .preview-iframe{
            width:1400px;
            height:1000px;
            border:none;
            border-radius:24px;
            background:white;
            box-shadow:
              0 40px 100px rgba(0,0,0,0.6);
          }

          .preview-loading,
          .preview-empty{
            width:100%;
            height:100%;
            display:flex;
            justify-content:center;
            align-items:center;
          }

          .empty-box{
            text-align:center;
            max-width:400px;
          }

          .loader{
            width:70px;
            height:70px;
            border-radius:50%;
            border:5px solid rgba(255,255,255,0.1);
            border-top-color:#8b5cf6;
            animation:spin 1s linear infinite;
          }

          @keyframes spin{
            to{
              transform:rotate(360deg);
            }
          }

          .zoom-btn{
            width:42px;
            height:42px;
            border:none;
            border-radius:14px;
            background:rgba(255,255,255,0.06);
            backdrop-filter:blur(10px);
            color:white;
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
            transition:0.3s;
          }

          .zoom-btn:hover{
            background:rgba(255,255,255,0.12);
            transform:translateY(-2px);
          }

          .zoom-level{
            min-width:80px;
            text-align:center;
            font-size:14px;
            color:#cbd5e1;
            font-weight:700;
          }

          .preview-container::-webkit-scrollbar{
            width:12px;
            height:12px;
          }

          .preview-container::-webkit-scrollbar-thumb{
            background:rgba(255,255,255,0.12);
            border-radius:20px;
          }
        `}
      </style>
    </DashboardLayout>
  );
}