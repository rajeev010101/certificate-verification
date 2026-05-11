import { useState, useEffect } from "react";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Sparkles,
  Save,
  Eye,
  Code2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  LayoutTemplate,
  User,
  GraduationCap,
  ShieldCheck,
  Building2,
  PenTool,
  Image as ImageIcon,
  FileCode2,
  Palette,
  Wand2,
  CheckCircle2,
} from "lucide-react";

export default function CreateTemplate() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////
  const [form, setForm] = useState({
    name: "John Doe",

    course: "Full Stack Development",

    description:
      "Successfully completed the program",

    skills:
      "React, Node.js, MongoDB",

    //////////////////////////////////////////////////////
    // FIXED IMAGE URLS
    //////////////////////////////////////////////////////
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",

    issuerName: "Tech Corp",

    issuerRole: "CEO",

    signature1:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Signature_of_Barack_Obama.svg",

    signature2:
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Signature_of_Barack_Obama.svg",
  });

  //////////////////////////////////////////////////////
  // INSANE CERTIFICATE TEMPLATE
  //////////////////////////////////////////////////////
  const [html, setHtml] = useState(`
<div
  style="
    width:1400px;
    min-height:1000px;
    background:
      linear-gradient(
        135deg,
        #ffffff 0%,
        #f8fafc 35%,
        #eef2ff 100%
      );

    border-radius:40px;
    overflow:hidden;
    position:relative;

    border:18px solid #0f172a;

    font-family:
      Inter,
      Arial,
      sans-serif;

    box-shadow:
      0 40px 100px rgba(0,0,0,0.25);
  "
>

  <div
    style="
      position:absolute;
      top:-250px;
      right:-250px;

      width:500px;
      height:500px;

      border-radius:50%;

      background:
        radial-gradient(
          circle,
          rgba(124,58,237,0.25),
          transparent
        );
    "
  ></div>

  <div
    style="
      position:absolute;
      bottom:-250px;
      left:-250px;

      width:500px;
      height:500px;

      border-radius:50%;

      background:
        radial-gradient(
          circle,
          rgba(6,182,212,0.2),
          transparent
        );
    "
  ></div>

  <div
    style="
      position:relative;
      z-index:2;
      padding:80px;
    "
  >

    <div
      style="
        display:flex;
        justify-content:space-between;
        align-items:center;
      "
    >

      <div
        style="
          display:flex;
          align-items:center;
          gap:24px;
        "
      >

        <div
          style="
            width:120px;
            height:120px;

            border-radius:30px;

            background:
              linear-gradient(
                135deg,
                #7c3aed,
                #06b6d4
              );

            display:flex;
            align-items:center;
            justify-content:center;
          "
        >

          <img
            src="{{logo}}"
            style="
              width:80px;
              height:80px;
              object-fit:contain;
            "
          />

        </div>

        <div>

          <div
            style="
              font-size:20px;
              color:#64748b;
              letter-spacing:4px;
            "
          >
            OFFICIAL CERTIFICATE
          </div>

          <div
            style="
              margin-top:10px;
              font-size:38px;
              font-weight:900;

              background:
                linear-gradient(
                  to right,
                  #7c3aed,
                  #06b6d4
                );

              -webkit-background-clip:text;
              -webkit-text-fill-color:transparent;
            "
          >
            AI CERTIFICATION
          </div>

        </div>

      </div>

      <div
        style="
          padding:20px 28px;

          border-radius:24px;

          background:
            rgba(15,23,42,0.04);
        "
      >

        <div
          style="
            font-size:16px;
            color:#64748b;
          "
        >
          Certificate ID
        </div>

        <div
          style="
            margin-top:8px;
            font-size:28px;
            font-weight:900;
            color:#0f172a;
          "
        >
          {{certificateId}}
        </div>

      </div>

    </div>

    <div
      style="
        margin-top:90px;
        text-align:center;
      "
    >

      <div
        style="
          font-size:90px;
          font-weight:900;
          color:#0f172a;
        "
      >
        CERTIFICATE
      </div>

      <div
        style="
          margin-top:10px;
          font-size:42px;
          color:#64748b;
          letter-spacing:10px;
        "
      >
        OF EXCELLENCE
      </div>

      <div
        style="
          margin-top:70px;
          font-size:28px;
          color:#64748b;
        "
      >
        Proudly Presented To
      </div>

      <div
        style="
          margin-top:30px;

          font-size:82px;
          font-weight:900;

          background:
            linear-gradient(
              to right,
              #7c3aed,
              #06b6d4
            );

          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        "
      >
        {{name}}
      </div>

      <div
        style="
          margin-top:40px;

          max-width:1000px;

          margin-left:auto;
          margin-right:auto;

          font-size:28px;

          line-height:1.8;

          color:#475569;
        "
      >
        {{description}}
      </div>

      <div
        style="
          margin-top:50px;

          display:inline-block;

          padding:22px 40px;

          border-radius:28px;

          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #06b6d4
            );

          color:white;

          font-size:36px;
          font-weight:800;
        "
      >
        {{course}}
      </div>

      <div
        style="
          margin-top:30px;

          font-size:22px;

          color:#64748b;
        "
      >
        Skills:
        <span
          style="
            color:#0f172a;
            font-weight:700;
          "
        >
          {{skills}}
        </span>
      </div>

    </div>

    <div
      style="
        margin-top:120px;

        display:flex;
        justify-content:space-between;
        align-items:flex-end;
      "
    >

      <div style="text-align:center;">

        <img
          src="{{signature1}}"
          style="
            width:220px;
            height:100px;
            object-fit:contain;
          "
        />

        <div
          style="
            width:280px;
            border-top:3px solid #0f172a;
            padding-top:16px;
          "
        >

          <div
            style="
              font-size:28px;
              font-weight:800;
            "
          >
            {{issuerName}}
          </div>

          <div
            style="
              margin-top:10px;
              color:#64748b;
            "
          >
            {{issuerRole}}
          </div>

        </div>

      </div>

      <div style="text-align:center;">

        <img
          src="{{qr}}"
          style="
            width:130px;
            height:130px;
          "
        />

        <div
          style="
            margin-top:12px;
            color:#64748b;
          "
        >
          Verify Certificate
        </div>

      </div>

      <div style="text-align:center;">

        <img
          src="{{signature2}}"
          style="
            width:220px;
            height:100px;
            object-fit:contain;
          "
        />

        <div
          style="
            width:280px;
            border-top:3px solid #0f172a;
            padding-top:16px;
          "
        >

          <div
            style="
              font-size:28px;
              font-weight:800;
            "
          >
            Certification Board
          </div>

          <div
            style="
              margin-top:10px;
              color:#64748b;
            "
          >
            Director
          </div>

        </div>

      </div>

    </div>

  </div>
</div>
`);

  const [loading, setLoading] =
    useState(false);

  const [templateName, setTemplateName] =
    useState("");

  const [count, setCount] = useState(0);

  const [zoom, setZoom] = useState(0.6);

  const [activeTab, setActiveTab] =
    useState("editor");

  //////////////////////////////////////////////////////
  // FETCH COUNT
  //////////////////////////////////////////////////////
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await api.get("/templates");

        const templates = Array.isArray(
          res.data
        )
          ? res.data
          : res.data.templates || [];

        setCount(templates.length);

      } catch (err) {
        console.error(err);
      }
    };

    fetchCount();
  }, []);

  //////////////////////////////////////////////////////
  // PREVIEW
  //////////////////////////////////////////////////////
  const generatePreview = () => {
    let output = html;

    const previewData = {
      ...form,

      date: new Date().toLocaleDateString(),

      certificateId:
        "CERT-" +
        Math.floor(Math.random() * 999999),

      qr:
        "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=preview",
    };

    Object.keys(previewData).forEach(
      (key) => {
        const regex = new RegExp(
          `{{${key}}}`,
          "g"
        );

        output = output.replace(
          regex,
          previewData[key] || ""
        );
      }
    );

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body{
            margin:0;
            padding:40px;
            background:#020617;
            display:flex;
            justify-content:center;
          }

          *{
            box-sizing:border-box;
          }

          img{
            max-width:100%;
          }
        </style>
      </head>

      <body>
        ${output}
      </body>
      </html>
    `;
  };

  //////////////////////////////////////////////////////
  // CHANGE
  //////////////////////////////////////////////////////
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //////////////////////////////////////////////////////
  // SUBMIT FIXED
  //////////////////////////////////////////////////////
  const submit = async () => {

  try {

    setLoading(true);

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////
    const token =
      localStorage.getItem("token");

    if (!token) {

      alert(
        "Please login first"
      );

      return;
    }

    //////////////////////////////////////////////////////
    // TEMPLATE NAME
    //////////////////////////////////////////////////////
    const finalName =
      templateName.trim() ||
      `Template ${count + 1}`;

    //////////////////////////////////////////////////////
    // PAYLOAD
    //////////////////////////////////////////////////////
    const payload = {

      name: finalName,

      html,

      logo: form.logo,

      issuerName:
        form.issuerName,

      issuerRole:
        form.issuerRole,

      description:
        form.description,

      skills:
        form.skills,

      organizationId:
        localStorage.getItem(
          "orgId"
        ),

      signatures: [
        {
          name:
            form.issuerName,

          role:
            form.issuerRole,

          image:
            form.signature1,
        },

        {
          name:
            "Director",

          role:
            "Certification Board",

          image:
            form.signature2,
        },
      ],
    };

    console.log(
      "🚀 PAYLOAD:",
      payload
    );

    //////////////////////////////////////////////////////
    // REQUEST
    //////////////////////////////////////////////////////
    const res =
      await api.post(
        "/templates",
        payload,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      "✅ RESPONSE:",
      res.data
    );

    alert(
      "🔥 Template Created Successfully"
    );

    setTemplateName("");

  } catch (err) {

    console.error(
      "❌ ERROR:",
      err.response?.data || err
    );

    alert(
      err?.response?.data?.message ||
      "Template creation failed"
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
      Math.max(prev - 0.1, 0.2)
    );
  };

  const resetZoom = () => {
    setZoom(0.6);
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////
  return (
    <DashboardLayout>

      <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

        {/* BACKGROUND */}
        <div className="bg1" />
        <div className="bg2" />
        <div className="grid-overlay" />

        <div className="relative z-10 p-7">

          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="header"
          >

            <div className="header-left">

              <div className="logo-box">
                <Sparkles size={34} />
              </div>

              <div>
                <h1 className="main-title">
                  Certificate Studio
                </h1>

                <p className="subtitle">
                  Design cinematic-level certificate templates
                </p>
              </div>

            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="save-btn"
            >

              <Save size={18} />

              {loading
                ? "Saving..."
                : "Save Template"}

            </button>

          </motion.div>

          {/* MAIN GRID */}
          <div className="main-grid">

            {/* LEFT PANEL */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="glass-card left-panel"
            >

              <div className="panel-top">

                <div className="panel-icon">
                  <LayoutTemplate size={24} />
                </div>

                <div>
                  <h2 className="panel-title">
                    Template Builder
                  </h2>

                  <p className="panel-subtitle">
                    Build advanced certificate systems
                  </p>
                </div>

              </div>

              {/* INPUTS */}
              <div className="fields">

                <InputField
                  icon={<FileCode2 size={18} />}
                  placeholder="Template Name"
                  value={templateName}
                  onChange={(e) =>
                    setTemplateName(
                      e.target.value
                    )
                  }
                />

                <InputField
                  icon={<User size={18} />}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Student Name"
                />

                <InputField
                  icon={
                    <GraduationCap size={18} />
                  }
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Course"
                />

                <InputField
                  icon={
                    <ShieldCheck size={18} />
                  }
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                />

                <InputField
                  icon={<Palette size={18} />}
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="Skills"
                />

                <InputField
                  icon={
                    <ImageIcon size={18} />
                  }
                  name="logo"
                  value={form.logo}
                  onChange={handleChange}
                  placeholder="Logo URL"
                />

                <InputField
                  icon={
                    <Building2 size={18} />
                  }
                  name="issuerName"
                  value={form.issuerName}
                  onChange={handleChange}
                  placeholder="Issuer Name"
                />

                <InputField
                  icon={<PenTool size={18} />}
                  name="issuerRole"
                  value={form.issuerRole}
                  onChange={handleChange}
                  placeholder="Issuer Role"
                />

                <InputField
                  icon={<Wand2 size={18} />}
                  name="signature1"
                  value={form.signature1}
                  onChange={handleChange}
                  placeholder="Signature 1 URL"
                />

                <InputField
                  icon={<Wand2 size={18} />}
                  name="signature2"
                  value={form.signature2}
                  onChange={handleChange}
                  placeholder="Signature 2 URL"
                />

              </div>

              {/* TABS */}
              <div className="tabs">

                <button
                  className={
                    activeTab === "editor"
                      ? "tab active-tab"
                      : "tab"
                  }
                  onClick={() =>
                    setActiveTab(
                      "editor"
                    )
                  }
                >

                  <Code2 size={16} />
                  HTML Editor

                </button>

                <button
                  className={
                    activeTab === "preview"
                      ? "tab active-tab"
                      : "tab"
                  }
                  onClick={() =>
                    setActiveTab(
                      "preview"
                    )
                  }
                >

                  <Eye size={16} />
                  Quick Preview

                </button>

              </div>

              {/* CONTENT */}
              <AnimatePresence mode="wait">

                {activeTab ===
                  "editor" && (
                  <motion.div
                    key="editor"
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                  >

                    <textarea
                      className="editor"
                      value={html}
                      onChange={(e) =>
                        setHtml(
                          e.target.value
                        )
                      }
                    />

                  </motion.div>
                )}

                {activeTab ===
                  "preview" && (
                  <motion.div
                    key="preview"
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="mini-preview"
                  >

                    <iframe
                      title="Mini Preview"
                      srcDoc={generatePreview()}
                      className="mini-frame"
                    />

                  </motion.div>
                )}

              </AnimatePresence>

            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="glass-card preview-panel"
            >

              {/* PREVIEW TOPBAR */}
              <div className="preview-topbar">

                <div>

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      size={24}
                      className="text-green-400"
                    />

                    <h2 className="preview-title">
                      Ultra Live Preview
                    </h2>

                  </div>

                  <p className="preview-subtitle">
                    Real-time HD rendering engine
                  </p>

                </div>

                {/* CONTROLS */}
                <div className="controls">

                  <button
                    className="icon-btn"
                    onClick={zoomOut}
                  >
                    <ZoomOut size={18} />
                  </button>

                  <div className="zoom-badge">
                    {Math.round(
                      zoom * 100
                    )}
                    %
                  </div>

                  <button
                    className="icon-btn"
                    onClick={zoomIn}
                  >
                    <ZoomIn size={18} />
                  </button>

                  <button
                    className="icon-btn"
                    onClick={resetZoom}
                  >
                    <RotateCcw size={18} />
                  </button>

                </div>

              </div>

              {/* PREVIEW */}
              <div className="preview-area">

                <motion.div
                  animate={{
                    scale: zoom,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="preview-wrapper"
                >

                  <iframe
                    title="Certificate Preview"
                    srcDoc={generatePreview()}
                    className="preview-frame"
                  />

                </motion.div>

              </div>

            </motion.div>

          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>
        {`
          .bg1{
            position:absolute;
            top:-200px;
            left:-200px;
            width:500px;
            height:500px;
            border-radius:50%;
            background:
              rgba(124,58,237,0.25);
            filter:blur(120px);
          }

          .bg2{
            position:absolute;
            bottom:-200px;
            right:-200px;
            width:500px;
            height:500px;
            border-radius:50%;
            background:
              rgba(6,182,212,0.2);
            filter:blur(120px);
          }

          .grid-overlay{
            position:absolute;
            inset:0;
            background-image:
              linear-gradient(
                rgba(255,255,255,0.03) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.03) 1px,
                transparent 1px
              );

            background-size:40px 40px;
          }

          .header{
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-bottom:28px;
          }

          .header-left{
            display:flex;
            align-items:center;
            gap:20px;
          }

          .logo-box{
            width:80px;
            height:80px;
            border-radius:28px;

            background:
              linear-gradient(
                135deg,
                #7c3aed,
                #06b6d4
              );

            display:flex;
            align-items:center;
            justify-content:center;

            box-shadow:
              0 20px 60px rgba(124,58,237,0.4);
          }

          .main-title{
            font-size:52px;
            font-weight:900;

            background:
              linear-gradient(
                to right,
                white,
                #c4b5fd,
                #67e8f9
              );

            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
          }

          .subtitle{
            color:#94a3b8;
            margin-top:8px;
            font-size:17px;
          }

          .main-grid{
            display:grid;
            grid-template-columns:450px 1fr;
            gap:28px;
          }

          .glass-card{
            background:
              rgba(255,255,255,0.04);

            border:
              1px solid rgba(255,255,255,0.08);

            backdrop-filter:
              blur(18px);

            border-radius:30px;

            box-shadow:
              0 20px 80px rgba(0,0,0,0.5);
          }

          .left-panel{
            padding:26px;
          }

          .panel-top{
            display:flex;
            align-items:center;
            gap:16px;
            margin-bottom:28px;
          }

          .panel-icon{
            width:58px;
            height:58px;
            border-radius:18px;

            background:
              linear-gradient(
                135deg,
                #7c3aed,
                #06b6d4
              );

            display:flex;
            align-items:center;
            justify-content:center;
          }

          .panel-title{
            font-size:28px;
            font-weight:800;
          }

          .panel-subtitle{
            color:#94a3b8;
            margin-top:5px;
          }

          .fields{
            display:flex;
            flex-direction:column;
            gap:14px;
          }

          .field{
            position:relative;
          }

          .field-icon{
            position:absolute;
            left:18px;
            top:50%;
            transform:translateY(-50%);
            color:#94a3b8;
            z-index:5;
          }

          .input{
            width:100%;
            height:58px;

            border-radius:18px;

            border:
              1px solid rgba(255,255,255,0.08);

            background:
              rgba(255,255,255,0.04);

            padding:0 18px 0 52px;

            color:white;

            outline:none;

            transition:0.3s;
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

          .tabs{
            display:flex;
            gap:12px;
            margin-top:22px;
            margin-bottom:20px;
          }

          .tab{
            flex:1;
            height:52px;

            border:none;

            border-radius:16px;

            background:
              rgba(255,255,255,0.04);

            color:#cbd5e1;

            display:flex;
            align-items:center;
            justify-content:center;
            gap:10px;

            cursor:pointer;

            transition:0.3s;
          }

          .active-tab{
            background:
              linear-gradient(
                135deg,
                #7c3aed,
                #06b6d4
              );

            color:white;
            font-weight:700;
          }

          .editor{
            width:100%;
            height:520px;

            border:none;

            border-radius:24px;

            background:#020617;

            color:#e2e8f0;

            padding:22px;

            font-family:monospace;

            line-height:1.7;

            resize:none;

            outline:none;

            border:
              1px solid rgba(255,255,255,0.08);
          }

          .mini-preview{
            height:520px;
            overflow:hidden;
            border-radius:24px;
          }

          .mini-frame{
            width:100%;
            height:100%;
            border:none;
            background:#020617;
          }

          .preview-panel{
            overflow:hidden;
          }

          .preview-topbar{
            display:flex;
            align-items:center;
            justify-content:space-between;

            padding:24px;

            border-bottom:
              1px solid rgba(255,255,255,0.08);
          }

          .preview-title{
            font-size:28px;
            font-weight:800;
          }

          .preview-subtitle{
            color:#94a3b8;
            margin-top:6px;
          }

          .controls{
            display:flex;
            align-items:center;
            gap:12px;
          }

          .icon-btn{
            width:46px;
            height:46px;

            border:none;

            border-radius:16px;

            background:
              rgba(255,255,255,0.05);

            color:white;

            display:flex;
            align-items:center;
            justify-content:center;

            cursor:pointer;

            transition:0.3s;
          }

          .icon-btn:hover{
            transform:translateY(-2px);

            background:
              rgba(255,255,255,0.1);
          }

          .zoom-badge{
            min-width:80px;
            text-align:center;

            color:#cbd5e1;
            font-weight:700;
          }

          .preview-area{
            height:calc(100vh - 180px);

            overflow:auto;

            display:flex;
            justify-content:center;
            align-items:flex-start;

            padding:50px;

            background:
              radial-gradient(
                circle at top,
                rgba(124,58,237,0.08),
                transparent
              ),
              #020617;
          }

          .preview-wrapper{
            transform-origin:top center;
          }

          .preview-frame{
            width:1500px;
            height:1100px;

            border:none;

            border-radius:28px;

            background:white;

            box-shadow:
              0 40px 100px rgba(0,0,0,0.65);
          }

          .save-btn{
            height:58px;

            padding:0 28px;

            border:none;

            border-radius:18px;

            background:
              linear-gradient(
                135deg,
                #7c3aed,
                #06b6d4
              );

            color:white;

            display:flex;
            align-items:center;
            gap:12px;

            font-weight:700;

            cursor:pointer;

            transition:0.3s;
          }

          .save-btn:hover{
            transform:translateY(-3px);

            box-shadow:
              0 20px 40px rgba(124,58,237,0.35);
          }

          .preview-area::-webkit-scrollbar{
            width:12px;
            height:12px;
          }

          .preview-area::-webkit-scrollbar-thumb{
            background:
              rgba(255,255,255,0.1);

            border-radius:20px;
          }
        `}
      </style>
    </DashboardLayout>
  );
}

//////////////////////////////////////////////////////
// INPUT COMPONENT
//////////////////////////////////////////////////////
function InputField({
  icon,
  ...props
}) {
  return (
    <div className="field">

      <div className="field-icon">
        {icon}
      </div>

      <input
        {...props}
        className="input"
      />

    </div>
  );
}